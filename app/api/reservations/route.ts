import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUsers";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        
    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        listingId,
        startDate,
        endDate,
        amountPayable, 
        totalPrice,
        paymentDetails,
        guestDetails
    } = body;

    if (!listingId || !startDate || !endDate || !amountPayable) {
        return NextResponse.error();
    }
    
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                    paymentDetails,
                    numberOfRooms:guestDetails.rooms,
                    numberOfGuests: guestDetails.guests,
                    
                }
            }
        }
    });
    
    return NextResponse.json(listingAndReservation);
    
} catch (error) {
 console.log("server error occured:-  ", error)   
}
}