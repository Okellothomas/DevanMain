'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import Heading from "../container/Heading";
import Image from "next/image";
import HeartButton from "../container/HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue?: string;
    imageSrc?: string;
    id?: string;
    currentUser?: SafeUser | null;
}

const ListingValue: React.FC<ListingHeadProps> = ({
    locationValue,
    title,
    id, // Include the id in the props
}) => {
    const router = useRouter();

    // const { getByValue } = useCountries();
    // const location = getByValue(locationValue);

    const handleClick = () => {
        // Navigate to the specific tour page when the title is clicked
        if (id) {
            router.push(`/tours/${id}`);
        }
    };

    return (
        <>
            {/* {location?.region} */}
            <div className="text-neutral-800 hover:underline hover:cursor-pointer" onClick={handleClick}>
                {title}
            </div>
        </>
    );
};

export default ListingValue;
