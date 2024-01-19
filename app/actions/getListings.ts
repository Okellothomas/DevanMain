import prisma from '@/app/libs/prismadb';

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createAt: 'desc'
            }
        });

        const safeListing = listings.map((listings) => ({
            ...listings,
            createAt: listings.createAt.toISOString(),
        }));

        return safeListing; 
        
    } catch (error: any) {
        throw new Error(error);
    }
}