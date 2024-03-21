import React, { ReactNode, useEffect, useState } from 'react';
import "./editdialog.css"
import { SafeUser, safeListing, safeReservation, safeTour } from '../types';
import getUsers, { IUsersParams } from '../actions/getUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
interface DialogBoxProps {
    searchParams?: IUsersParams;
    data: safeListing;
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


  const EditDialogBoxListing: React.FC<DialogBoxProps> = ({ isOpen, onClose, data }) => {
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
     
              axios.put(`/api/listings/${data?.id}`, {
                  from_flag:'update',
                 ...formData
              })
                  .then(async () => {
                      toast.success('Hotel/House update successful!');
                      
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

      // console.log("Data to edi>>>>>>>t", data)


  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleChildClick}>X</button>

        <div className="editFormContainer">
    <form className="edit-tour-form" onSubmit={handleSubmit}>
      <h2>Edit Hotel/House Listing</h2>
      <div className="form-groups-container">

      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" 
        value={formData.title}
        onChange={handleChange}
        name="title"/>
        {/** Add error message container here if needed */}
      </div>
     
      <div className="form-group">
        <label htmlFor="house">House:</label>
        <input type="text" id="house" 
        onChange={handleChange}
        value={formData.house || ''}
        name="house" />
        {/** Add error message container here if needed */}
       </div>
              
    <div className="form-group">
        <label htmlFor="hotel">Hotel:</label>
        <input type="text" 
        id="hotel" 
        value={formData?.hotel || ''}
        name="hotel"
        onChange={handleChange} />
        {/** Add error message container here if needed */}
      </div>

              
     <div className="form-group">
        <label htmlFor="onebed">Number of 1 Bedrooms:</label>
        <input type="text" id="onebed" 
        onChange={handleChange}
        value={formData.oneBedroom || ''}
        name="onebed" />
        {/** Add error message container here if needed */}
      </div>

      <div className="form-group">
        <label htmlFor="twobed">Number of 2 Bedrooms:</label>
        <input type="text" id="twobed" 
        onChange={handleChange}
        value={formData.twoBedroom || ''}
        name="twobed" />
        {/** Add error message container here if needed */}
      </div>

      <div className="form-group">
        <label htmlFor="threebed">Number of 3 Bedrooms:</label>
        <input type="text" id="threebed" 
        onChange={handleChange}
        value={formData.threebedRoom || ''}
        name="threebed" />
        {/** Add error message container here if needed */}
      </div>

      <div className="form-group">
        <label htmlFor="commonp">Number of CommonPlaces:</label>
        <input type="text" id="common" 
        onChange={handleChange}
        value={formData.commonPlace || ''}
        name="common" />
        {/** Add error message container here if needed */}
      </div>
     
      <div className="form-group">
        <label htmlFor="hotelLink">YouTube Link:</label>
        <input type="text" id="hotelLink" value={formData.hotelLink || ''} onChange={handleChange} name="hotelLink" />

        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="price">Price Per Night ($):</label>
        <input type="number" id="price" value={formData.price || 0} onChange={handleChange} name="price" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="save">Save Per Night ($):</label>
        <input type="number" id="save" value={formData.save || 0} onChange={handleChange} name="save" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="room">Rooms Count:</label>
        <input type="number" id="room" 
        onChange={handleChange}
        value={formData.roomCount || 0}  name="room" min="0" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="guest">Guests Count:</label>
        <input type="number" id="guest" 
        onChange={handleChange}
        value={formData.guestCount || 0}  name="guest" min="0" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="hostname">Host Name:</label>
        <input type="text" id="hostname" 
        onChange={handleChange}
        value={formData.hostName || ''} name="hostname" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="cohost">Cohost Name:</label>
        <input type="text" id="cohost" 
        onChange={handleChange}
        value={formData.cohostName || ''} name="cohost"/>
        {/** Add error message container here if needed */}
              </div>
      <div className="form-group">
        <label htmlFor="hostcontact">Host Contact:</label>
        <input type="text" id="hostcontact" 
        onChange={handleChange}
        value={formData.hostContact || ''} name="hostcontact" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group">
        <label htmlFor="overview">Overview:</label>
        <input type="text" id="overview" 
        onChange={handleChange}
        value={formData.overView  || ''} name="overview" />
        {/** Add error message container here if needed */}
      </div>
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

export default EditDialogBoxListing