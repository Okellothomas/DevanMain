'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../container/Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Button from '../container/Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const userType = registerModal.userType

    
    
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', {...data, userType:userType})
            .then(() => {
                toast.success('Registration successful!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                // console.log(error)
                toast.error('Something went wrong, try again!');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to DevanceTours'
                subtitle='Create an Account'
                // center
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            />
        </div>
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
                        Already have an account?
                    </div>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
          disabled={isLoading}  
          isOpen={registerModal.isOpen} 
          title='Register'
          actionLabel='Continue'
          onClose={registerModal.onClose}
          onSubmit={handleSubmit(onSubmit)} 
          body={bodyContent}
          footer={footerContent}
    />
  )
}

export default RegisterModal