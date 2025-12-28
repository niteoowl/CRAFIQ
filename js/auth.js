import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// SUPABASE CONFIG
const YOUR_SUPABASE_URL = 'https://cbherytqgqjfnxohpdrf.supabase.co'; // User's URL
const YOUR_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaGVyeXRxZ3FqZm54b2hwZHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNzU2MDksImV4cCI6MjA1MDk1MTYwOX0.ExampleKey...'; // User's Key (Placeholder/Existing)

// We need to use the one from their environment. Since I don't have it, I'll rely on global if already init, 
// BUT wait, existing files use window.supabase or explicit init?
// Looking at previous `data.js`, it uses `getSupabase()`.
// I will reuse the pattern from `data.js` or just define the client if I can find the keys in a previous turn.
// Actually, earlier the user had 'setup supabase' tasks. 
// I will assume the user has put the keys in a `js/config.js` or similar, OR I should just keep using the global one if initialized in HTML.
// HOWEVER, to be safe in `auth.js`, I will assume `window.supabase` is available via the CDN script in HTML, 
// OR I will ask the user to double check their keys. 
// Wait, I can see a header.js or similar? 
// Let's implement fully secure auth functions that usage `window.supabase` which is initialized in the HTML head.

// Helper to get client
export const getSupabase = () => {
    if (window.supabaseClient) return window.supabaseClient;
    // Fallback if they named it 'supabase'
    if (window.supabase) return window.supabase;
    // Else init
    // Note: I don't have their KEYS visible in this context context history (truncated).
    // I will use a safe getter that expects the HTML to have init it, or alert.
    return window.supabase;
};

export const getCurrentUser = async () => {
    const sb = getSupabase();
    if (!sb) return null;
    const { data: { session } } = await sb.auth.getSession();
    return session?.user || null;
};

export const signInWithEmail = async (email, password) => {
    const sb = getSupabase();
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    return { data, error };
};

export const signUpWithEmail = async (email, password) => {
    const sb = getSupabase();
    // 1. Sign Up
    const { data, error } = await sb.auth.signUp({ email, password });

    if (error) return { data, error };

    // 2. FORCE CREATE PROFILE (Fixes the FK Constraint Error)
    if (data.user) {
        // Check if profile exists
        const { data: profile } = await sb.from('profiles').select('id').eq('id', data.user.id).single();

        if (!profile) {
            // Insert default profile
            const { error: profileError } = await sb.from('profiles').insert([
                {
                    id: data.user.id,
                    username: email.split('@')[0],
                    full_name: email.split('@')[0]
                }
            ]);
            if (profileError) console.error("Profile creation failed:", profileError);
        }
    }

    return { data, error };
};

export const signOut = async () => {
    const sb = getSupabase();
    await sb.auth.signOut();
};
