import { getSupabase, getCurrentUser } from './auth.js';

// --- NOVELS ---

export const createNovel = async (title, type) => {
    const user = await getCurrentUser();
    if (!user) return { error: { message: "로그인이 필요합니다." } };

    const { data, error } = await getSupabase()
        .from('novels')
        .insert([
            {
                creator_id: user.id,
                title: title,
                is_visual_novel: type === 'visual'
            }
        ])
        .select()
        .single();

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
        .select('*')
        .eq('id', novelId)
        .single();
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
    // Initial empty scene data
    const initialData = { bg: "", actors: [], bgm: "", script: [] };

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
