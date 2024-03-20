import React, { ReactNode, useEffect, useState } from 'react';
import "./editdialog.css"
import { SafeUser, safeReservation, safeTour } from '../types';
import getUsers, { IUsersParams } from '../actions/getUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
interface DialogBoxProps {
    searchParams?: IUsersParams;
    data: safeTour;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    users?:any;
    
    currentUser?: SafeUser | null;
    isOpen: boolean;
    onClose: () => void;

    
  }


  const EditDialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, data }) => {
    const [formData, setFormData] = useState(data);

    const [isLoading, setIsLoading] = useState(false);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent the default form submission behavior
      console.log("UPDATE FORM DATA--->", formData);
      makeUpdate()
      // Add your logic to handle form submission (e.g., send data to backend, update state, etc.)
    };
  

    const makeUpdate = () => {
     
              axios.put(`/api/tours/${data?.id}`, {
                  from_flag:'update',
                 ...formData
              })
                  .then(async () => {
                      toast.success('Tour update successful!');
                      
                     // setDateRange(initialDateRange);
                      // redirect to /trips
                     
                      //router.push('/trips');
                  }).catch(() => {
                      toast.error('Something went wrong')
                  }).finally(() => {
                      setIsLoading(false);
                      onClose()
                  })
          
       } 
        


    const handleChildClick = () => {
      onClose();
    };

      console.log("Data to edi>>>>>>>t", data)


     


  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleChildClick}>X</button>

        <div className="editFormContainer">
    <form className="edit-tour-form" onSubmit={handleSubmit}>
      <h2>Edit Tour</h2>
      <div className="form-groups-container">

      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" 
        value={formData.title}
        onChange={handleChange}
        name="title" required />
        {/** Add error message container here if needed */}
      </div>
     
      <div className="form-group">
        <label htmlFor="depStart">Departure Start Date:</label>
        <input type="text" id="depStart" 
        onChange={handleChange}
        value={formData.depStart || ''}
        name="depStart" required />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="depEnd">Departure End Date:</label>
        <input type="text" 
        id="depEnd" 
        value={formData?.depEnd || ''}
        name="depEnd" required
        onChange={handleChange} />
        {/** Add error message container here if needed */}
      </div>

     
      <div className="form-group">
        <label htmlFor="tripStyle">Trip Style:</label>
        <input type="text" id="tripStyle" value={formData.tripStyle || ''} onChange={handleChange} name="tripStyle" />

        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="save">Save:</label>
        <input type="number" id="save" value={formData.save || 0} onChange={handleChange} name="save" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="room">Rooms:</label>
        <input type="number" id="room" 
        onChange={handleChange}
        value={formData.room || 0}  name="room" min="0" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="ourLink">Our Link:</label>
        <input type="url" id="ourLink" 
        onChange={handleChange}
        value={formData.ourLink || ''} name="ourLink" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="guestCount">Guest Count:</label>
        <input type="number" id="guestCount" 
        onChange={handleChange}
        value={formData.guestCount}
        name="guestCount" min="0" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="price">Price ($):</label>
        <input type="number" id="price" 
        onChange={handleChange}
        value={formData.price} name="price" min="0" required />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" 
        onChange={handleChange}
        value={formData.country || ''} name="country" required />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="continent">Continent:</label>
        <input type="text" id="continent" 
        onChange={handleChange}
        value={formData.continent  || ''} name="continent" required />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="locations">Locations (comma-separated):</label>
        <input type='text' id="locations" 
        onChange={handleChange}
        value={formData.locations || ''}name="locations"/>
        {/** Add error message container here if needed */}
      </div>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description"
        onChange={handleChange}
        value={formData.description}required></textarea>
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
          <button type="submit">Save Changes</button>
      </div>
    </form>
        </div>
    </div>
    </div>
    
  )
}

export default EditDialogBox