import prisma from '@/app/libs/prismadb';

export interface IToursParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getTours(
    params: IToursParams
) {
    try {

        const {
            userId,
            roomCount,
            guestCount,
            // bathRoomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params || {}; 
        
        let query: any = {};

        if (userId) {
            query.userId = userId;
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

        const safeTour = tours.map((tours) => ({
            ...tours,
            createAt: tours.createAt.toISOString(),
        }));

        return safeTour; 
        
    } catch (error: any) {
        throw new Error(error);
    }
}



//************************ */
// import prisma from '@/app/libs/prismadb';

// export default async function getListings() {
//     try {
//         const listings = await prisma.listing.findMany({
//             orderBy: {
//                 createAt: 'desc'
//             }
//         });

//         const safeListing = listings.map((listings) => ({
//             ...listings,
//             createAt: listings.createAt.toISOString(),
//         }));

//         return safeListing; 
        
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }
