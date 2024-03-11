import React, { ReactNode } from 'react';
import "./Dialog.css"
import { SafeUser, safeReservation, safeTour } from '../types';
import getUsers, { IUsersParams } from '../actions/getUsers';

interface DialogBoxProps {

  data: safeTour;
  onAction?: (id: string) => void;
  currentUser?: SafeUser | null;
  isOpen: boolean;
  onClose: () => void;
 
}

const DialogBox: React.FC<DialogBoxProps> = async ({ isOpen, onClose,
    data,
  
}) => {
  
  const users = (await getUsers({}));


  const filteredUsers = users.filter(user => data.tourists.includes(user.id));

  const handleChildClick =  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleChildClick}>X</button>
        <div>
          {/* Mapping through the users array to display names and emails */}
          {filteredUsers.map(user => (
            <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
