// AUTH UTILITIES
import { supabase } from './init-supabase.js';

export const getSupabase = () => {
    if (supabase) return supabase;
    if (window.supabase) return window.supabase;
    console.error("Critical: Supabase client is missing in auth.js");
    return null;
};

export const getCurrentUser = async () => {
    const sb = getSupabase();
    if (!sb) return null;
    const { data: { session } } = await sb.auth.getSession();
    return session ? session.user : null;
};

export const signInWithEmail = async (email, password) => {
    const sb = getSupabase();
    if (!sb) return { error: { message: "System Error: DB Not Connected" } };
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    return { data, error };
};

export const signUpWithEmail = async (email, password) => {
    const sb = getSupabase();
    if (!sb) return { error: { message: "System Error: DB Not Connected" } };
    // 1. Sign Up
    const { data, error } = await sb.auth.signUp({ email, password });

    if (error) return { data, error };

    // 2. FORCE CREATE PROFILE
    if (data.user) {
        const { data: profile } = await sb.from('profiles').select('id').eq('id', data.user.id).single();
        if (!profile) {
            await sb.from('profiles').insert([
                {
                    id: data.user.id,
                    username: email.split('@')[0]
                }
            ]);
        }
    }
    return { data, error };
};

export const signOut = async () => {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
};

export const ensureUserHasProfile = async (user) => {
    if (!user) return { error: "No user" };
    const sb = getSupabase();

    // Check if profile exists (Ignore unique error if it exists, just check presence)
    // Using maybeSingle() is safer than single() for non-existent checks
    const { data: profile } = await sb.from('profiles').select('id').eq('id', user.id).maybeSingle();

    if (!profile) {
        console.log("⚠️ Profile missing, attempting to create...");
        const { error: insertError } = await sb.from('profiles').insert([
            {
                id: user.id,
                username: user.email.split('@')[0]
            }
        ]);

        if (insertError) {
            console.error("❌ Failed to create profile:", insertError);
            return { error: insertError };
        } else {
            console.log("✅ Profile created successfully.");
            return { success: true };
        }
    }
    return { success: true, existing: true };
};
