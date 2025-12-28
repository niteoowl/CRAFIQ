import { supabase } from './init-supabase.js';
import { getCurrentUser, ensureUserHasProfile } from './auth.js';

const getSupabase = () => supabase;

// --- NOVELS ---

export const createNovel = async (title, type) => {
    const user = await getCurrentUser();
    if (!user) return { error: { message: "로그인이 필요합니다." } };

    const insertNovel = async () => {
        return await getSupabase()
            .from('novels')
            .insert([
                {
                    creator_id: user.id,
                    title: title,
                    is_visual_novel: type === 'visual',
                    cover_url: type === 'visual'
                        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
                        : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'
                }
            ])
            .select()
            .single();
    };

    let { data, error } = await insertNovel();

    // ERROR HANDLER
    if (error) {
        // 1. Missing Profile (FK Violation 23503)
        if (error.code === '23503') {
            console.log("⚠️ Detected missing profile (23503). Attempting repair...");
            const { error: profileError } = await ensureUserHasProfile(user);

            if (profileError) {
                // If we couldn't create the profile, we can't retry.
                // Return a clearer error message.
                return { error: { message: `프로필 생성 실패 (DB 권한을 확인해주세요): ${profileError.message || profileError.details}` } };
            }

            // Retry once if profile creation succeeded
            const retry = await insertNovel();
            data = retry.data;
            error = retry.error;
        }
        // 2. Duplicate Title (Unique Violation 23505) -> Pass to UI
    }

    return { data, error };
};

export const updateNovel = async (novelId, updates) => {
    // updates: { title, description, cover_url }
    const { data, error } = await getSupabase()
        .from('novels')
        .update(updates)
        .eq('id', novelId)
        .select();
    return { data, error };
};

export const getUserNovels = async () => {
    const user = await getCurrentUser();
    if (!user) return { data: [] };

    const { data, error } = await getSupabase()
        .from('novels')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });

    return { data, error };
};

export const getNovelById = async (novelId) => {
    const { data, error } = await getSupabase()
        .from('novels')
        .select(`
            *,
            profiles (username)
        `)
        .eq('id', novelId)
        .single();
    return { data, error };
};

// --- PUBLIC FETCHING (HOME PAGE) ---

export const getRecentPublishedNovels = async () => {
    const { data, error } = await getSupabase()
        .from('novels')
        .select(`
            *,
            profiles (username)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

    return { data, error };
};

export const getNovelsByCategory = async (category) => {
    const { data, error } = await getSupabase()
        .from('novels')
        .select(`*, profiles(username)`)
        .eq('genre', category)
        .order('created_at', { ascending: false })
        .limit(10);
    return { data, error };
};


// --- CHAPTERS (Web Novel) ---

export const getChapters = async (novelId) => {
    const { data, error } = await getSupabase()
        .from('chapters')
        .select('*')
        .eq('novel_id', novelId)
        .order('order_index', { ascending: true });
    return { data, error };
};

export const createChapter = async (novelId, title, orderIndex) => {
    const { data, error } = await getSupabase()
        .from('chapters')
        .insert([
            { novel_id: novelId, title: title, order_index: orderIndex, content: "" }
        ])
        .select()
        .single();
    return { data, error };
};

export const saveChapterContent = async (chapterId, content) => {
    const { data, error } = await getSupabase()
        .from('chapters')
        .update({ content: content })
        .eq('id', chapterId)
        .select();
    return { data, error };
};


// --- SCENES (Visual Novel) ---

export const getScenes = async (novelId) => {
    const { data, error } = await getSupabase()
        .from('scenes')
        .select('*')
        .eq('novel_id', novelId)
        .order('order_index', { ascending: true });
    return { data, error };
};

export const createScene = async (novelId, title, orderIndex) => {
    const initialData = { bg: "https://images.unsplash.com/photo-1596727147705-54a7128052a9?w=1000", actors: [], bgm: "", script: [] };

    const { data, error } = await getSupabase()
        .from('scenes')
        .insert([
            {
                novel_id: novelId,
                title: title,
                order_index: orderIndex,
                data: initialData
            }
        ])
        .select()
        .single();
    return { data, error };
};

export const saveSceneData = async (sceneId, sceneData) => {
    const { data, error } = await getSupabase()
        .from('scenes')
        .update({ data: sceneData })
        .eq('id', sceneId)
        .select();
    return { data, error };
};

// --- SEARCH & DISCOVER ---

export const getAllNovels = async () => {
    const { data, error } = await getSupabase()
        .from('novels')
        .select(`*, profiles(username)`)
        .order('created_at', { ascending: false });
    return { data, error };
};

export const searchNovels = async (query) => {
    const { data, error } = await getSupabase()
        .from('novels')
        .select(`*, profiles(username)`)
        .ilike('title', `%${query}%`)
        .order('created_at', { ascending: false });
    return { data, error };
};


// --- COMMENTS ---

export const getComments = async (novelId) => {
    const { data, error } = await getSupabase()
        .from('comments')
        .select(`*, profiles(username, avatar_url)`)
        .eq('novel_id', novelId)
        .order('created_at', { ascending: false });
    return { data, error };
};

export const addComment = async (novelId, content) => {
    const user = await getCurrentUser();
    if (!user) return { error: { message: "Login required" } };

    const { data, error } = await getSupabase()
        .from('comments')
        .insert([{ novel_id: novelId, user_id: user.id, content: content }])
        .select()
        .single();
    return { data, error };
};

export const deleteComment = async (commentId) => {
    const { data, error } = await getSupabase()
        .from('comments')
        .delete()
        .eq('id', commentId);
    return { data, error };
};


// --- BULK SCENE SAVE (FOR VISUAL STUDIO) ---
export const saveScenes = async (novelId, scenesPayload) => {
    // Strategy: Delete existing for this novel and re-insert (easiest for reordering)
    // OR upsert if ID exists. For now, upsert is safer if we want to keep IDs.
    const { data, error } = await getSupabase()
        .from('scenes')
        .upsert(scenesPayload)
        .select();
    return { data, error };
};
