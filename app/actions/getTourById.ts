import prisma from "@/app/libs/prismadb"

interface IParams {
    tourId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try {
        const { tourId } = params;

        const tour = await prisma.tour.findUnique({
            where: {
                id: tourId
            },
            include: {
                user: true
            }
        });

        if (!tour) {
            return null;
        }

        return {
            ...tour,
            createdAt: tour.createAt.toISOString(),
            user: {
                ...tour,
                createdAt: tour.user.createdAt.toISOString(),
                updatedAt: tour.user.updatedAt.toISOString(),
                emailVerified: tour.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (error: any) {
        throw new Error(error)
    }

}