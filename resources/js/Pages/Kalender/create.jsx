import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Fragment, useState, useRef, useEffect } from 'react';

export default function index({  }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        event_title: '',
        start: '',
        start_time: '',
        end: '',
        end_time: '',
        description: '',
    });
    
    const [showDeleteEdit, setShowDeleteEdit] = useState(false);

    // console.log(users.password)

    const dropdownRefs = useRef([]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                showDeleteEdit !== false &&
                dropdownRefs.current[showDeleteEdit] &&
                !dropdownRefs.current[showDeleteEdit].contains(e.target)
            ) {
                setShowDeleteEdit(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDeleteEdit]);

    const submit = (e) => {
        e.preventDefault();

        post(route('kalender.store'), {
            // onFinish: () => reset('event_title', 'start', 'start_time', 'end', 'end_time', 'description'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h1 className="text-6xl mt-8 font-semibold leading-tight text-[#1c1c1c] mb-2">
                        Add Your New Event 👋
                    </h1>
                    <p className='text-2xl'>
                        Another day to chase your goals! We’re here to make sure your stay is smooth, smart, and stress-free. You've got this 💪
                    </p>
                </>
            }
        >
            <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0 ">
                <div className="max-w-screen-2xl w-full flex mt-6 gap-5 justify-center">
                    <div className="w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-xl sm:rounded-lg ">
                    
                    
                        <Head title="Register" />
                        <div className='text-2xl font-bold'>
                            Add New User
                        </div>

                        <form onSubmit={submit}>
                            <div className='mt-4'>
                                <InputLabel htmlFor="event_title" value="Event Title" />

                                <TextInput
                                    id="event_title"
                                    name="text"
                                    value={data.event_title}
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700" 
                                    autoComplete="event_title"
                                    onChange={(e) => setData('event_title', e.target.value)}
                                    required
                                />

                                <InputError message={errors.event_title} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="start" value="Start" />

                                <TextInput
                                    id="start"
                                    type="date"
                                    name="start"
                                    value={data.start}
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700"
                                    autoComplete="username"
                                    onChange={(e) => setData('start', e.target.value)}
                                    required
                                />

                                <InputError message={errors.start} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="start_time" value="Start Time" />

                                <TextInput
                                    id="start_time"
                                    type="time"
                                    name="start_time"
                                    value={data.start_time}
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700"
                                    autoComplete="username"
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    required
                                />

                                <InputError message={errors.start_time} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="end" value="End" />

                                <TextInput
                                    id="end"
                                    type="date"
                                    name="end"
                                    value={data.end}
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700"
                                    autoComplete="end"
                                    onChange={(e) => setData('end', e.target.value)}
                                    required
                                />

                                <InputError message={errors.end} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="end_time" value="End Time" />

                                <TextInput
                                    id="end_time"
                                    type="time"
                                    name="end_time"
                                    value={data.end_time}
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700"
                                    autoComplete="end_time"
                                    onChange={(e) => setData('end_time', e.target.value)}
                                    required
                                />

                                <InputError message={errors.end_time} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />

                                <TextInput
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700"
                                    autoComplete="description"
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-end ">

                                <PrimaryButton className="ms-4" onSubmit={(e)=> submit(e)} disabled={processing}>
                                    New Account
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
