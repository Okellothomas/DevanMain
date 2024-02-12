import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing)
}

// import { NextResponse } from "next/server";
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     listingId?: string;
// }

// export async function DELETE(
//     request: Request,
//     { params }: { params: IParams }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { listingId } = params;

//     if (!listingId || typeof listingId !== 'string') {
//         throw new Error('Invalid ID');
//     }

//     const listing = await prisma.listing.deleteMany({
//         where: {
//             id: listingId,
//             userId: currentUser.id
//         }
//     });

//     return NextResponse.json(listing);
// }

// // Generate static paths for pre-rendering
// export async function generateStaticParams() {
//     try {
//         // Fetch all possible listing IDs from your data source
//         const listings = await prisma.listing.findMany();

//         const listingIds = listings.map((listing) => ({ params: { listingId: listing.id } }));

//         return listingIds;
//     } catch (error) {
//         console.error("Error generating static params:", error);
//         return [];
//     }
// }
