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
    <div className='flex flex-row justify-between items-center text-center w-full'>
    <div
      className="display-card text-center items-center"
      >
     <div className='text-neutral-500'>
        {IconComponent && <IconComponent size={25} />} {/* Display icon if provided */}
          </div>
     <div className='text-black font-semibold text-md'>
      {label}
     </div>
      </div>

      <div
      className="display-card text-center items-center"
      >
     <div className='text-neutral-500'>
        {IconComponent && <IconComponent size={25} />} {/* Display icon if provided */}
          </div>
     <div className='text-black font-semibold text-md'>
      {label}
     </div>
      </div>

      <div
      className="display-card text-center items-center"
      >
     <div className='text-neutral-500'>
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