import { NextResponse } from "next/server";

// Import the default export from the "next-auth/middleware" module
export { default } from "next-auth/middleware";

// Configuration object for the middleware
export const config = {
    // Specify an array of path patterns to match for the middleware
    matcher: [
        //Common
        "/trips",          // Matches paths starting with "/trips"
        "/reservations",   // Matches paths starting with "/reservations"
        "/properties",     // Matches paths starting with "/properties"
        "/favorites",      // Matches paths starting with "/favorites"

        // Operators 
        "/operator/profile",
        "/operator/mytours",
        "/operator/myhotels",
        "/operator/myhouses",
        "/operator/mybookedtours",
        "/operator/mybookedhotels",
        "/operator/mybookedhouses",
    

        // Admin
        "/admin/profile",
        "/admin/mytours",
        "/admin/myhotels",
        "/admin/myhouselistings",
        "/admin/allbookedtours",
        "/admin/mybookedtours",
        "/admin/mybookedhotels",
        "/admin/allbookedhotels",
        "/admin/allbookedhouses",
        "/admin/mybookedhouses",
        "/admin/hosts",
        "/admin/operators",
        "/admin/clients",
        "/admin/administrators",

        // Client
        "/client/profile",
        "/client/mybookedtours",
        "/client/mybookedhotels",
        "/client/mybookedhouses",


        // Host
        "/host/profile",
        "/host/myhotels",
        "/host/myhouses",
        "/host/mybookedhotels",
        "/host/mybookedhouses",
        "/host/mytours",
    ]
}

// Middleware function
export function middleware(request: { nextUrl: { pathname: string; }; url: string | URL | undefined; }) {
    if (request.nextUrl.pathname === '/api/listings/[listingId]') {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect elsewhere
    }
    return NextResponse.next(); // Pass through other requests
}
