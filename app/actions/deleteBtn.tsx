'use client'
import React from 'react';

interface DeleteButtonProps {
  onDelete?: () => void;
  children: React.ReactNode;
}

function DeleteButton({ onDelete, children }: DeleteButtonProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <button onClick={handleDelete}>
      {children}
    </button>
  );
}

export default DeleteButton;


// handleDelete();

// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import React from 'react'
// import toast from 'react-hot-toast';

// function deleteBtn() {

//     // const router = useRouter();

//       const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
//         e.stopPropagation();
//         console.log("button clicked");
//     try {
//         const response = await axios.delete(`/api/register/${id}`, {
//             method: 'DELETE',
//         });
//         console.log("try is working")
//         toast.success("User deleted successfully")
//         // router.push("/")
//     } catch (error) {
//         console.error(error);
//         console.log('Failed to delete tour. Please try again.');
//     }
//   };

//   return handleDelete
// }

// export default deleteBtn

// import React from 'react';

// interface DeleteButtonProps {
//   onDelete?: () => void;
//   children: React.ReactNode;
//   disabled?: boolean;
//   isLoading?: boolean;
// }

// function DeleteButton({ onDelete, children, disabled = false, isLoading = false }: DeleteButtonProps) {
//   const handleDelete = () => {
//     if (onDelete) {
//       onDelete();
//     }
//   };

//     return(
//     <button onClick={handleDelete}></button>
//   );
// }

// export default DeleteButton;
