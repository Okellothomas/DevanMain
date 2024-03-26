// import { NextApiRequest } from "next";
// import { getToken } from "next-auth/jwt";
// import { getSession } from "next-auth/react";
// import { NextResponse } from "next/server";


// // Import the default export from the "next-auth/middleware" module
// export { default } from "next-auth/middleware";

// // Configuration object for the middleware
// export const config = {
    
//     // Specify an array of path patterns to match for the middleware
//     matcher: [
//         //Common
//         "/trips",          // Matches paths starting with "/trips"
//         "/reservations",   // Matches paths starting with "/reservations"
//         "/properties",     // Matches paths starting with "/properties"
//         "/favorites",      // Matches paths starting with "/favorites"

//         // Operators 
//         "/operator/profile",
//         "/operator/mytours",
//         "/operator/myhotels",
//         "/operator/myhouses", 
//         "/operator/mybookedtours",
//         "/operator/mybookedhotels",
//         "/operator/mybookedhouses",
    

//         // Admin
//         "/admin/profile",
//         "/admin/mytours",
//         "/admin/myhotels",
//         "/admin/myhouselistings",
//         "/admin/allbookedtours",
//         "/admin/mybookedtours",
//         "/admin/mybookedhotels",
//         "/admin/allbookedhotels",
//         "/admin/allbookedhouses",
//         "/admin/mybookedhouses",
//         "/admin/hosts",
//         "/admin/operators",
//         "/admin/clients",
//         "/admin/administrators",

//         // Client
//         "/client/profile",
//         "/client/mybookedtours",
//         "/client/mybookedhotels",
//         "/client/mybookedhouses",


//         // Host
//         "/host/profile",
//         "/host/myhotels",
//         "/host/myhouses",
//         "/host/mybookedhotels",
//         "/host/mybookedhouses",
//         "/host/mytours",
//     ]
// }

// // Middleware function
// export async function middleware(request: NextApiRequest) {
//     const session = await getSession({ req: request });

//     const token = await getToken({ req: request });

//     console.log("Token stored ---",token)
    


  
//     if (!session?.user) {
//         // User is not signed in, redirect to login
//         return NextResponse.redirect(new URL('/login', request.url));
//       }
//    // const { user_type } = session.user; // Assuming 'role' is a property in the session object
//     const pathname = request.url;
  
//     // Define allowed routes for each role
//     const allowedRoutes = {
//       admin: [
//         "/admin/*", // Allow all admin routes starting with "/admin/"
//         // ... other specific admin routes
//       ],
//       client: [
//         "/client/profile",
//         "/client/mybookedtours",
//         // ... other specific client routes
//       ],
//       // Define allowed routes for operator and host roles (if applicable)
//     };
  
//     // Check if the requested route is allowed for the user's role
//     // if (!allowedRoutes[user_type]?.some((allowedPath: string) => pathname?.startsWith(allowedPath))) {
//     //   // User doesn't have access, redirect to a suitable page (e.g., dashboard)
//     //   return NextResponse.redirect(new URL('/unauthorized', request.url));
//     // }
//     return NextResponse.next(); // Pass through other requests
// }



import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "./pages/api/auth/[...nextauth]";

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
export async function middleware(request: NextRequest) {
       const token = await getToken({ req: request });
       

//    console.log("Token stored ---",token)
//    console.log("User gotten--->", token?.user)
    if (request.nextUrl.pathname === '/api/listings/[listingId]') {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect elsewhere
    }
    return NextResponse.next(); // Pass through other requests
}
