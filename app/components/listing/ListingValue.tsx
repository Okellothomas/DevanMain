'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../container/Heading";
import Image from "next/image";
import HeartButton from "../container/HeartButton";

interface ListingHeadProps {
    title?: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingValue: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

  return (
      <>
          <Heading
              subtitle={`${location?.region}`}
          />
      </>
  )
}

export default ListingValue