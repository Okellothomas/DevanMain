import { IconType } from 'react-icons/lib';

interface MenuItemProps {
  label: string;
  icon?: IconType; // New property for the React icon component
}

const BookingCard: React.FC<MenuItemProps> = ({
  label,
  icon: IconComponent, // Rename imageSrc to icon and use the imported icon component
}) => {
  return (
    <div className='booking-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 items-center text-center w-full rounded-xl'>

    <div className='col-span-1 cursor-pointer group flex flex-col gap-2 w-full'>
    <div
      className="text-center flex flex-col gap-3 items-center"
      >
     <div className='bg-white p-3 rounded-full text-neutral-500'>
        {IconComponent && <IconComponent size={25} />} {/* Display icon if provided */}
      </div>
     <div className='text-black rounded-full font-semibold text-md'>
      {label}
     </div>
      </div>
     </div>

      
      <div
      className="text-center flex flex-col gap-3 items-center"
      >
     <div className='bg-white p-3 rounded-full text-neutral-500'>
        {IconComponent && <IconComponent size={25} />} {/* Display icon if provided */}
          </div>
     <div className='text-black font-semibold text-md'>
      {label}
     </div>
      </div>

      <div
      className="text-center flex flex-col gap-3 items-center"
      >
     <div className='bg-white p-3 rounded-full text-neutral-500'>
        {IconComponent && <IconComponent size={25} />} {/* Display icon if provided */}
          </div>
     <div className='text-black font-semibold text-md'>
      {label}
     </div>
      </div>

    </div>
  );
};

export default BookingCard;