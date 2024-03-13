'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import { PayPalScriptProvider,PayPalButtons,usePayPalScriptReducer } from '@paypal/react-paypal-js';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../container/Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Button from '../container/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import './paymentModal.css'
import usePaymentModal from '@/app/hooks/usePaymentModal';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    setShowPayModal: React.Dispatch<React.SetStateAction<boolean>>;
    onPaymentComplete: (data: any) => void; // Define a callback prop
    totalPrice:string,
  }
const PaymentModal: React.FC<ModalProps> = ({ setShowPayModal, onPaymentComplete, totalPrice }) => {

    const [isScriptReady, scriptLoadPromise] = usePayPalScriptReducer();
    const closeModal = () => {
      setShowPayModal(false);
    }; 
    const router = useRouter()
    const registerModal = useRegisterModal();
    const paymentModal = usePaymentModal(); 
    const [isLoading, setIsLoading] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const paymentOptions = ['Paypal'];
  
    const bodyContent = (
        <div className='payment_modal_container'>
          <div className="payment_modal_main_body">
            
          <IoMdClose size={18} className="payment_modal_close_icon" onClick={()=>setShowPayModal(false)}/>
          <h2 style={{fontWeight:'600',fontSize:'16px'}}>Payment</h2>
          <hr style={{color:'gray'}}/>
            <div className="payment_modal_top">
            {paymentOptions.map((option) => (
          <div
            key={option}
            className={`payment_option ${paymentMethod === option ? 'active' : ''}`}
            onClick={() => setPaymentMethod(option)}
          >
            {option}
          </div>
        ))}
                {/* <div className="payment_option">Paypal</div>
                <div className="payment_option">Mpesa</div> */}
            </div>
            {paymentMethod==='Paypal'?
            <div className="paypal">
            {/* <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}> */}
            



      <div>
                {isScriptReady ? (
                 
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalPrice,
                            },
                          },
                        ],
                      });
                    }}

                   onApprove={async (data, actions) => {

             if (actions?.order) {

                const order = await actions.order.capture();

                onPaymentComplete(order);

              }

              return;

            }}
/>
          
        ) : (
          <span>Loading PayPal Script...</span>
        )}
      </div>
   
            </div>
            : paymentMethod ==='Mpesa'? <div className="mpesa">
             Pay via Mpesa...</div>: <div className="otherpayment">Payment not defined</div>
}
          </div>
           
        </div>
    
    )
  return (
  
    bodyContent
  
  )
}

export default PaymentModal