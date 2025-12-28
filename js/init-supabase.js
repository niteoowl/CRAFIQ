
// CENTRALIZED SUPABASE INITIALIZATION
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://cbherytqgqjfnxohpdrf.supabase.co';
// User provided key
// NOTE: This key format (sb_publishable_...) is unusual for Supabase JS Client (usually JWT 'ey...').
// However, applying as requested. 
const SUPABASE_KEY = 'sb_publishable_bLDLQj-ZcrmKK7yXo5eNeQ_76czOTpe';

if (!window.supabase) {
    try {
        window.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Supabase Initialized Global (v2)");
    } catch (e) {
        console.error("Failed to init Supabase:", e);
    }
}
