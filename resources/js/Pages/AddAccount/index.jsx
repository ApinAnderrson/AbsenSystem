import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Fragment, useState, useRef, useEffect } from 'react';

export default function index({ users, userName }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        role: '',
        email: '',
        password: '',
        password_confirmation: '',
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

        post(route('add_account.store'), {
            onFinish: () => reset('password', 'password_confirmation', 'name', 'email'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h1 className="text-6xl mt-8 font-semibold leading-tight text-[#1c1c1c] mb-2">
                        Hi, {userName}! 👋
                    </h1>
                    <p className='text-2xl'>
                        Another day to chase your goals! We’re here to make sure your stay is smooth, smart, and stress-free. You've got this 💪
                    </p>
                </>
            }
        >
            <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0 ">
                <div className="max-w-screen-2xl w-full flex mt-6 gap-5 justify-between">
                    <div className="w-full px-6 py-4 shadow-md sm:rounded-lg">
                        <div className='text-2xl font-bold pb-5 p-3'>
                            User List
                        </div>
                        <table className='w-full border-collapse text-[#1c1c1c]'>
                            <thead>
                                <tr className='text-left border-b-2 border-gray-500'>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user,index)=>(
                                    <Fragment key = {user.id}>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td className=''>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setShowDeleteEdit(index)} className={``} width="16" height="16" fill="currentColor" >
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                                    </svg>
                                                </button>
                                                <div ref={(el)=> (dropdownRefs.current[index] = el)} className= {`${showDeleteEdit === index ? '' : 'hidden'} ml-3 rounded-md absolute w-40 h-20 p-2 flex items-left flex-col justify-center`}>
                                                    <button id="delete" 
                                                        onClick={() => {
                                                            if (confirm("Are you sure?")) {
                                                                router.delete(route('add_account.destroy', { user: user.id }), {
                                                                    onSuccess: () => alert("Task deleted!"),
                                                                    onError: (errors) => console.error(errors),
                                                                });
                                                            }
                                                        }}
                                                        className='text-left ml-2 text-sm p-2 w-fit hover:text-red-600'>Delete
                                                    </button>
                                                    <div id="line-delete-edit" className='w-full h-[1px] bg-white border-b-[1px]'></div>
                                                    <Link id="edit" href={route('add_account.edit', { user: user.id })} className='text-left ml-2 text-sm p-2 w-fit hover:text-green-600'>Edit</Link>
                                                </div >
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-xl sm:rounded-lg ">
                    
                    
                        <Head title="Register" />
                        <div className='text-2xl font-bold'>
                            Add New User
                        </div>

                        <form onSubmit={submit}>
                            <div className='mt-4'>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700" 
                                    autoComplete="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className='mt-4'>
                                <InputLabel htmlFor="role" value="Role" />

                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    className="mt-1 block w-full rounded-md bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700"
                                    autoComplete="role"
                                    onChange={(e) => setData('role', e.target.value)}
                                    required
                                >
                                    <option value="" disabled hidden>Select</option>
                                    <option value="user" >User</option>
                                    <option value="intern">Intern</option>
                                    <option value="admin">Admin</option>
                                </select>

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700"
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
                                    className="mt-1 block w-full rounded-lg bg-transparent border-black focus:border-red-700 focus:ring-1 focus:ring-red-700"
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
