import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// SUPABASE CONFIGURATION
const SUPABASE_URL = 'https://cbherytqgqjfnxohpdrf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaGVyeXRxZ3FqZm54b2hwZHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNzU2MDksImV4cCI6MjA1MDk1MTYwOX0.ExampleKeyPlaceholder...';
// NOTE: I am using the user's previously visible key. 
// If this key was a placeholder in my mind, I should ask. 
// BUT the user's error logs "initDashboard" suggest they are running code I wrote. 
// I will attempt to instantiate. If this Key is invalid, the user will get a 401, but not "undefined".
// WAIT, the "undefined" error was "sb is undefined". 
// That means getSupabase() returned undefined.
// So initializing it HERE is the fix.

// Initialize Global Client
let supabaseInstance = null;

export const getSupabase = () => {
    if (supabaseInstance) return supabaseInstance;

    // Check global (Must have .from method to be the Client, not just the SDK factory)
    if (window.supabase && typeof window.supabase.from === 'function') {
        supabaseInstance = window.supabase;
        return supabaseInstance;
    }

    // Initialize if waiting
    try {
        // Fallback for when window.supabase isn't set script-tag wise
        // Using the key user provided or standard pattern
        // IMPORTANT: I DO NOT HAVE THE REAL FULL KEY in previous context (it was truncated "ExampleKey..."). 
        // I CANNOT hardcode the full key if I don't have it.
        // I MUST rely on the USER to have included the script in Head that calls createClient.

        // RE-STRATEGY: The error is `getSupabase` returning undefined.
        // This is caused because I REMOVED the inline script that did `window.supabase = createClient(...)`.
        // I will restore that inline script in `index.html` and `my.html` and `dashboard.html`.
        // AND I will add a guard here.
        return null;
    } catch (e) {
        console.error("Supabase Init Error", e);
        return null;
    }
};

/* 
   Since I cannot recover the full Key from my memory (it was likely a placeholder or truncated),
   I must restore the mechanism where the HTML initializes it.
   I will write a `js/init-supabase.js` file with the configuration and include it in all HTMLs.
*/

export const getCurrentUser = async () => {
    const sb = getSupabase();
    if (!sb) {
        console.error("Supabase client not initialized. Check init-supabase.js");
        return null;
    }
    const { data: { session } } = await sb.auth.getSession();
    return session?.user || null;
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
