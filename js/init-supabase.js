// CENTRALIZED SUPABASE INITIALIZATION
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// CORRECT URL extracted from JWT ref: wtwuqtphcgsojfwywujc
const SUPABASE_URL = 'https://wtwuqtphcgsojfwywujc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0d3VxdHBoY2dzb2pmd3l3dWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MDM0NzUsImV4cCI6MjA4MjQ3OTQ3NX0.8zt-Z_SblOnfP0vkHuUn83_tV_zf5rXt8WSfuaWYJKE';

// Check if we have a valid client (must have .from method)
// The CDN script sets window.supabase to the Factory object. We need the Client instance.
let _supabase;
if (!window.supabase || typeof window.supabase.from !== 'function') {
    try {
        // If window.supabase exists and has createClient (it's the factory), use it.
        // If not, rely on the imported createClient (module fallback).
        const factory = window.supabase && typeof window.supabase.createClient === 'function' ? window.supabase.createClient : createClient;

        _supabase = factory(SUPABASE_URL, SUPABASE_KEY);
        window.supabase = _supabase; // Set the client instance on window.supabase
        console.log("✅ Supabase Client Initialized:", SUPABASE_URL);
    } catch (e) {
        console.error("❌ Supabase Init Error:", e);
        // Fallback or re-throw if initialization fails
        _supabase = null; // Ensure _supabase is null if init fails
    }
} else {
    // If window.supabase is already a valid client, use it.
    _supabase = window.supabase;
}

// Alias for consistency, especially for legacy scripts expecting window.supabaseClient
if (_supabase && !window.supabaseClient) {
    window.supabaseClient = _supabase;
}

// Export the Supabase client for module-based imports
export const supabase = _supabase;

// Helper to check auth state mainly
export const checkAuth = async () => {
    if (!supabase) {
        console.error("Supabase client not initialized.");
        return null;
    }
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};
