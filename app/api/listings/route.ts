import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUsers";


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
        city,
        cohostName,
        hostContact,
        save,
        oneBedroom,
        twoBedroom,
        threebedRoom,
        commonPlace,
        hostName,
        house,
        hotel,
        hotelLink,
        startDate,
        endDate,
        distance,
        offers,
        overView,
        price
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            city,
            hostName,
            startDate,
            endDate,
            distance,
            cohostName,
            hostContact,
            oneBedroom,
            twoBedroom,
            threebedRoom,
            commonPlace,
            offers,
            save: parseInt(save, 10),
            house,
            hotel,
            hotelLink,
            overView,
            bathRoomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}