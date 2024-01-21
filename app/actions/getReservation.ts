import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

// export default async function getReservations(
//     params: IParams
// ) {
//     try {
//     const { listingId, userId, authorId } = params;

//     const query: any = {};

//     if (listingId) {
//         query.listingId = listingId;
//     }

//     if (userId) {
//         query.userId = userId;
//     }

//     if (authorId) {
//         query.listing = {userId, authorId}
//     }

//     const reservations = await prisma.reservation.findMany({
//         where: query,
//         include: {
//             Listing: true
//         },
//         orderBy: {
//             createdAt: 'desc'
//         }
//     });

//     const safeReservation = reservations.map((reservation) => ({
//         ...reservation,
//         createdAt: reservation.createdAt.toISOString(),
//         startDate: reservation.startDate.toISOString(),
//         endDate: reservation.endDate.toISOString(),
//         Listing: {
//             ...reservation.Listing,
//             createAt: reservation.Listing?.createAt.toISOString()
//         }
//     }));

//         return safeReservation; 
//     } catch (error: any) {
//         throw new Error(error)
//      }
// }

export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, authorId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.Listing = {
                userId: authorId,
            };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                Listing: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeReservation = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            Listing: {
                ...reservation.Listing,
                createAt: reservation.Listing?.createAt.toISOString(),
            },
        }));

        return safeReservation;
    } catch (error: any) {
        throw new Error(error);
    }
}