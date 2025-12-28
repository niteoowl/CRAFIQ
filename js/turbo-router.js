/*
    TURBO ROUTER v4 - DISABLED
    
    The SPA navigation was causing script execution issues.
    Until we have a more robust solution, we are DISABLING client-side routing.
    
    All navigation will now be full page reloads (MPA style).
    This guarantees scripts execute correctly on every page.
*/

// DISABLED: No click interception
// All <a> links will trigger normal browser navigation

console.log("Turbo Router: DISABLED (MPA Mode)");
