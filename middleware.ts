// Import the default export from the "next-auth/middleware" module
export { default } from "next-auth/middleware";

// Configuration object for the middleware
export const config = {
    // Specify an array of path patterns to match for the middleware
    matcher: [
        "/trips",          // Matches paths starting with "/trips"
        "/reservations",   // Matches paths starting with "/reservations"
        "/properties",     // Matches paths starting with "/properties"
        "/favorites",      // Matches paths starting with "/favorites"
    ]
}
