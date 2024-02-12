import { NextResponse } from "next/server";

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

// Import the default export from the "next-auth/middleware" module
// import nextAuthMiddleware from "next-auth/middleware";

// // Configuration object for the middleware
// export const config = {
//     // Specify an array of path patterns to match for the middleware
//     matcher: [
//         "/trips",          // Matches paths starting with "/trips"
//         "/reservations",   // Matches paths starting with "/reservations"
//         "/properties",     // Matches paths starting with "/properties"
//         "/favorites",      // Matches paths starting with "/favorites"
//     ]
// };

// // Import necessary modules
// import { NextResponse } from 'next/server';

// // Middleware function
export function middleware(request: { nextUrl: { pathname: string; }; url: string | URL | undefined; }) {
    if (request.nextUrl.pathname === '/api/listings/[listingId]') {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect elsewhere
    }
    return NextResponse.next(); // Pass through other requests
}
