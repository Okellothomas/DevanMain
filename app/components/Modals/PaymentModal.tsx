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
  }
const PaymentModal: React.FC<ModalProps> = ({ setShowPayModal }) => {

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged In');
                router.refresh();
                paymentModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(() => {
        paymentModal.onClose();
        registerModal.onOpen();
    }, [paymentModal, registerModal]);

    const paymentOptions = ['Paypal', 'Mpesa'];
  

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
              // Create order logic (can be server-side or client-side)
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: '10.00', // Total amount
                      currency_code: 'USD',
                    },
                  },
                ],
              });
            }}
            // onApprove={(data, actions) => {
            //   // Capture payment logic (can be server-side or client-side)
            //   return actions.order.capture();
            // }}
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
    //     <div className='flex flex-col gap-4'>
    //     <Heading
    //         title='Welcome back'
    //         subtitle='Login to your account'
    //         // center
    //     />
    //     <Input
    //         id='email'
    //         label='Email'
    //         disabled={isLoading}
    //         register={register}
    //         error={errors}
    //         required
    //     />
    //     <Input
    //         id='password'
    //         label='Password'
    //         type='password'
    //         disabled={isLoading}
    //         register={register}
    //         error={errors}
    //         required
    //     />
    // </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <div className='google-btn'>
            <Button
                outline
                label='Continue with Google'
                // icon={FcGoogle}
                onClick={() => signIn('google')}
                />
            </div>
            <div className='text-normal-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        First time using Devancetours?
                    </div>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 cursor-pointer hover:underline'>
                        Create an Account
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    // <Modal
    //       disabled={isLoading}  
    //       isOpen={paymentModal.isOpen} 
    //       title='Login'
    //       actionLabel='Continue'
    //       onClose={paymentModal.onClose}
    //       onSubmit={handleSubmit(onSubmit)} 
    //       body={bodyContent}
    //       footer={footerContent}
    // />
    bodyContent
  
  )
}

export default PaymentModal