
// CENTRALIZED SUPABASE INITIALIZATION
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://cbherytqgqjfnxohpdrf.supabase.co';
// User provided correct JWT Key
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0d3VxdHBoY2dzb2pmd3l3dWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MDM0NzUsImV4cCI6MjA4MjQ3OTQ3NX0.8zt-Z_SblOnfP0vkHuUn83_tV_zf5rXt8WSfuaWYJKE';

if (!window.supabase) {
    try {
        window.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Supabase Initialized (v3 - Correct Key)");
    } catch (e) {
        console.error("Failed to init Supabase:", e);
    }
}
