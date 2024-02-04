'use client'

import useTourModal from "@/app/hooks/useTourModel";
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../container/Heading"
import CategoryInput from "../Inputs/CategoryInput"
import { tours } from "../navbar/TourCategories";
import CountrySelect from "../Inputs/CountrySelect"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import Counter from "../Inputs/Counter"
import ImageUpload from "../Inputs/ImageUpload"
import Input from "../Inputs/Input"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    INFO1 = 3,
    IMAGES = 4, 
    DESCRIPTION = 5,
    DESCRIPTION1 = 6,
    DESCRIPTION2 = 7,
    DESCRIPTION3 = 8,
    PRICE = 9
}

const TourModal = () => {
    const tourModal = useTourModal();
    const router = useRouter()
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathRoomCount: 1,
            imageSrc: [],
            price: 1,
            title: '',
            ourLink: '',
            description: '', // not done
            depStart: '',
            depEnd: '',
            operator: '',
            days: 1,
            locs: 1,
            counts: 1,
            tripStyle: '',
            save: 1, // done
            deal: '',
            overView: '',
            countries: '',
            locations: '',
            locStart: '',
            locEnd: '',
            itinery: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathRoomCount = watch('bathRoomCount');
    const imageSrc = watch('imageSrc'); // done
    const title = watch('title'); //done
    const description = watch('description'); //done
    const depStart = watch('depStart');
    const depEnd = watch('depEnd');
    const operator = watch('operator');
    const days = watch('days');
    const counts = watch('counts');
    const ourLink = watch('ourLink');
    const locs = watch('locs');
    const tripStyle = watch('tripStyle'); // for for this
    const save = watch('save'); // done
    const deal = watch('deal');
    const overView = watch('overView');
    const locations = watch('locations'); // for for this
    const locStart = watch('locStart'); // for for this
    const locEnd = watch('locEnd'); // for for this
    const itinery = watch('itinery');
    const countries = watch('countries') // for for this

    const Map = useMemo(() => dynamic(() => import('../container/Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }

        return 'Next'
    }, [step]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true)
        
        axios.post('/api/tours', data)
            .then(() => {
                toast.success('Tours Created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                tourModal.onClose();
            }).catch(() => {
                toast.error('Something went wrong');
            }).finally(() => {
                setIsLoading(false);
        })
    }

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    // the body of the modal

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describe your Tour?"
                subtitle="Pick a category"
            />
            <div className="
            grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {tours.map((item) => (
                <div key={item.label} className="col-span-1">
                    <CategoryInput
                        onClick={(category) => setCustomValue(
                            'category', category
                        )}
                        selected={category === item.label}
                        label={item.label}
                        icon={item.icon}
                    />
               </div> 
            ))} 
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your tour located?"
                    subtitle="Help our client know in advance!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your tour"
                    subtitle="What amenities do you have?"
                />
                <Counter
                    title="Tourists"
                    subtitle="How many tourists do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathRoomCount}
                    onChange={(value) => setCustomValue('bathRoomCount', value)}
                />
                
            </div>
        )
    }

    if (step === STEPS.INFO1) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about the tour"
                    subtitle="Number of days, location and countries"
                />
                <Counter
                    title="Days"
                    subtitle="How many days will the tour last?"
                    value={days}
                    onChange={(value) => setCustomValue('days', value)}
                />
                <hr />
                <Counter
                    title="Locations"
                    subtitle="How many locations will be visited?"
                    value={locs}
                    onChange={(value) => setCustomValue('locs', value)}
                />
                <hr />
                <Counter
                    title="Countries"
                    subtitle="How many countries will be visited?"
                    value={counts}
                    onChange={(value) => setCustomValue('counts', value)}
                />
                
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add 4 photos of your place"
                    subtitle="Show guests what your place looks like!"
                />
                {/* <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                /> */}
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', [...imageSrc,value])}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="ourLink"
                    label="Youtube link"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION1) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Tour fundamentals?"
                    subtitle="provide more insight on the tour!"
                />
                <Input
                    id="tripStyle"
                    label="Trip Styles"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="locations"
                    label="Locations"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="locStart"
                    label="first location to be visited"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="locEnd"
                    label="last location to be visited"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="countries"
                    label="Countries to be visited"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION2) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Provide more tour details?"
                    subtitle="provide more insight on the tour!"
                />
                <Input
                    id="depStart"
                    label="Date of Departure (14th June)"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="depEnd"
                    label="Date of end of tour. (16th July)"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="operator"
                    label="Name of operator(s)"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
            </div>
        )
    }


    if (step === STEPS.DESCRIPTION3) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Provide more tour details?"
                    subtitle="provide more insight on the tour!"
                />
                <Input
                    id="deal"
                    label="premium, exclusive, popular, upcoming or trending"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="overView"
                    label="Provide tour's overview"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="itinery"
                    label="Provide the tour's itinery"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
            </div>
        )
    }


    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per person?"
                />
                <Input
                    id="price"
                    label="Price per person"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
                <hr />
                <Input
                    id="save"
                    label="Save per person"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    error={errors}
                    required
                />
            </div>
        )
    }



  return (
      <Modal
          title="Devanca Tours!"
          isOpen={tourModal.isOpen}
          onClose={tourModal.onClose}
          secondaryAction={step === STEPS.CATEGORY ? undefined: onBack}
          secondaryLabel={secondaryActionLabel}
          onSubmit={handleSubmit(onSubmit)}
          actionLabel={actionLabel}
          body={bodyContent}
      />
  )
}

export default TourModal