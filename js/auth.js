import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.js';

// Initialize Supabase Client (assuming CDN is loaded in HTML)
// We use a global variable 'supabase' if loaded via CDN, 
// but for modularity, we can use createClient if imported.
// In this project, we'll assume the HTML script tag loads the SDK.

let supabaseClient;

export const getSupabase = () => {
    if (!supabaseClient) {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
};

export const signInWithEmail = async (email, password) => {
    const { data, error } = await getSupabase().auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};

export const signUpWithEmail = async (email, password) => {
    const { data, error } = await getSupabase().auth.signUp({
        email,
        password,
    });
    return { data, error };
};

export const signOut = async () => {
    const { error } = await getSupabase().auth.signOut();
    return { error };
};

export const getCurrentUser = async () => {
    const { data: { user } } = await getSupabase().auth.getUser();
    return user;
};
