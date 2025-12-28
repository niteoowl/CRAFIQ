// CENTRALIZED SUPABASE INITIALIZATION
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// CORRECT URL extracted from JWT ref: wtwuqtphcgsojfwywujc
const SUPABASE_URL = 'https://wtwuqtphcgsojfwywujc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0d3VxdHBoY2dzb2pmd3l3dWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MDM0NzUsImV4cCI6MjA4MjQ3OTQ3NX0.8zt-Z_SblOnfP0vkHuUn83_tV_zf5rXt8WSfuaWYJKE';

// Check if we have a valid client (must have .from method)
// The CDN script sets window.supabase to the Factory object. We need the Client instance.
if (!window.supabase || typeof window.supabase.from !== 'function') {
    try {
        // If window.supabase exists but has createClient (it's the factory), use it.
        // If not, rely on the import (module fallback).
        const factory = window.supabase && window.supabase.createClient ? window.supabase.createClient : createClient;

        window.supabase = factory(SUPABASE_URL, SUPABASE_KEY);
        console.log("✅ Supabase Client Initialized:", SUPABASE_URL);
    } catch (e) {
        console.error("❌ Supabase Init Error:", e);
    }
}
