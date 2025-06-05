import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Fragment, useState } from 'react';

export default function edit ({ user }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user?.name||'',
        role: user?.role||'user',
        email: user?.email||'',
        password: '',
        password_confirmation: '',
    });

    // console.log(user.password)


    const submit = (e) => {
        e.preventDefault();

        put(route('add_account.update', user.id), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h1 className="text-6xl flex justify-center mt-8 font-semibold leading-tight text-[#1c1c1c] mb-2">
                        Anything Wrong with Our Account? 😥😱
                    </h1>
                    <p className='text-2xl flex justify-center'>
                        The more client we get the better, so add our client now!
                    </p>
                </>
            }
        >
            <div className="flex flex-col items-center w-7xl pt-6 sm:justify-center sm:pt-0 ">
                                        
                                        <div className="max-w-7xl w-full flex mt-6 gap-5 justify-center">
                                            <div className="w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-xl sm:rounded-lg">
                                                <Head title="New Client" />
                        
                                                <form onSubmit={submit}>
                                                    <div className='mb-6 mt-3'>
                                                        <InputLabel htmlFor="name" value="Account Name" />
                        
                                                        <TextInput
                                                            id="name"
                                                            name="name"
                                                            value={data.name}
                                                            className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400"
                                                            autoComplete="name"
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            required
                                                        />
                        
                                                        <InputError message={errors.account_name} className="mt-2" />
                                                    </div>
                        
                                                    <div className='mb-6 mt-3'>
                                                        <InputLabel htmlFor="role" value="Role" />
                                                            <select
                                                                id="role"
                                                                name="role"
                                                                value={data.role}
                                                                className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black"
                                                                autoComplete="role"
                                                                onChange={(e) => setData('role', e.target.value)}
                                                                required
                                                            >
                                                                <option value="" selected disabled hidden>Select</option>
                                                                <option value="user" >User</option>
                                                                <option value="intern">Intern</option>
                                                                <option value="admin">Admin</option>
                                                            </select>
                                                    
                                                            <InputError message={errors.name} className="mt-2" />
                                                        </div>
                        
                                                    <div className="mt-3 mb-6">
                                                        <InputLabel htmlFor="email" value="Email" />
                                                    
                                                        <TextInput
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            value={data.email}
                                                            className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400"
                                                            autoComplete="username"
                                                            onChange={(e) => setData('email', e.target.value)}
                                                            required
                                                        />
                                                    
                                                        <InputError message={errors.email} className="mt-2" />
                                                    </div>
                                                    
                                                    <div className="mt-3 mb-6">
                                                        <InputLabel htmlFor="password" value="Password" />
                                                    
                                                        <TextInput
                                                            id="password"
                                                            type="password"
                                                            name="password"
                                                            value={data.password}
                                                            className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400"
                                                            autoComplete="new-password"
                                                            onChange={(e) => setData('password', e.target.value)}
                                                            required
                                                        />
                                                    
                                                        <InputError message={errors.password} className="mt-2" />
                                                    </div>
                                                    <div className="mt-4">
                                                        <InputLabel
                                                            htmlFor="password_confirmation"
                                                            value="Confirm Password"
                                                        />
                                                                                
                                                        <TextInput
                                                            id="password_confirmation"
                                                            type="password"
                                                            name="password_confirmation"
                                                            value={data.password_confirmation}
                                                            className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400"
                                                            autoComplete="new-password"
                                                            onChange={(e) =>
                                                                setData('password_confirmation', e.target.value)
                                                            }
                                                            required
                                                        />
                                                                                
                                                        <InputError
                                                            message={errors.password_confirmation}
                                                            className="mt-2"
                                                        />
                                                    </div>
                        
                                                    <div className="mt-4 flex items-center justify-end">
                        
                                                        <PrimaryButton className="ms-4" onSubmit={(e)=> submit(e)} disabled={processing}>
                                                            Edit Account
                                                        </PrimaryButton>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
        </AuthenticatedLayout>
    );
}
