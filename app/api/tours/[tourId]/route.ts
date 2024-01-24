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