import prisma from '@/app/libs/prismadb';

export interface IMyToursParams {
    currentUserId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getMyTours(
    params: IMyToursParams
) {
    try {
        const {
            currentUserId,
            roomCount,
            guestCount,
            // bathRoomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params || {}; 
        
        let query: any = {};

        if (currentUserId) {
            query.userId = currentUserId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        // if (bathroomCount) {
        //     query.bathroomCount = {
        //         gte: +bathroomCount
        //     }
        // }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: {lte: startDate},
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: {gte: endDate}
                            }
                       ] 
                    }
                }
            }
        }

        const tours = await prisma.tour.findMany({
            where: query,
            orderBy: {
                createAt: 'desc'
            }
        });

        const safeTour = tours.map((tour) => ({
            ...tour,
            createAt: tour.createAt.toISOString(),
        }));

        return safeTour;
      
        
    } catch (error: any) {
        throw new Error(error);
    }
}