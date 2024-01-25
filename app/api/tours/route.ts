import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from '@/app/libs/prismadb'


export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathRoomCount,
        guestCount,
        location,
        price
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const tour = await prisma.tour.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathRoomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(tour);
}