import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    tourId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { tourId } = params;

    if (!tourId || typeof tourId !== 'string') {
        throw new Error('Invalid ID');
    }

    const tour = await prisma.tour.deleteMany({
        where: {
            id: tourId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(tour)
}

// import { NextResponse } from "next/server";
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     tourId?: string;
// }

// export async function DELETE(
//     request: Request,
//     {params} : {params : IParams}
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { tourId } = params;

//     if (!tourId || typeof tourId !== 'string') {
//         throw new Error('Invalid ID');
//     }

//     const tour = await prisma.tour.deleteMany({
//         where: {
//             id: tourId,
//             userId: currentUser.id
//         }
//     });

//     return NextResponse.json(tour)
// }

// // Exporting generateStaticParams function to fix the issue
// export function generateStaticParams() {
//     // You may return an array of possible values for dynamic route parameters here if needed.
//     // For example, if tourId is always a string, you can return an array of strings.
//     // This function is used by Next.js for static optimization.
//     return [];
// }