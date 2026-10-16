// Point this at your own webhook/endpoint to get a ping on every password
// attempt from any device (a Google Apps Script web app, a Discord webhook,
// a simple serverless function — anything that accepts a POST). Leave it
// empty to disable remote reporting; attempts are still logged locally
// either way (see tracker.js / Menu > Password Attempts).
export const TRACKER_WEBHOOK_URL = "";
