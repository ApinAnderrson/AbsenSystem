import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    // console.log(user.role) //show all role and user data

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    

    return (
        <div className="min-h-screen ">
            <div className={` mx-auto max-w-screen-2xl sm:p-5`}>
                <nav className={`py-5 sticky top-5 z-50`}>

                    {/* Navbar */}
                    <div className={`mx-auto max-w-screen-2xl sm:px-6 lg:px-8 bg-[#f4f4f4] drop-shadow-lg sticky z-50 sm:rounded-3xl py-3 px-4`}>
                        <div className="flex h-14 justify-between">
                            <div className="flex">
                                
                                <div className="flex shrink-0 items-center">
                                    <Link href="/">
                                        <img src="logo/Logo Pro Insight.png" className='h-16' alt="" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-16 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route('task.index')} //ini sama dengan NAME di route/web.php, disana namenya cuma task tapi karena kita ingin akses index makanya .index
                                        active={route().current('task.index')}
                                    >
                                        Task
                                    </NavLink>
                                    <NavLink
                                        href={route('absen.index')} //ini sama dengan NAME di route/web.php, disana namenya cuma task tapi karena kita ingin akses index makanya .index
                                        active={route().current('absen.index')}
                                    >
                                        Absensi
                                    </NavLink>
                                    <NavLink
                                        href={route('kalender.index')} //ini sama dengan NAME di route/web.php, disana namenya cuma task tapi karena kita ingin akses index makanya .index
                                        active={route().current('kalender.index')}
                                    >
                                        Kalender
                                    </NavLink> 
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                <div className="relative ms-3 flex flex-row gap-5">
                                    <Dropdown className="text-white">
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none "
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route('personal_dashboard.index')}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            {user.role === 'admin' && (
                                            <Dropdown.Link
                                                href={route('add_account.index')}
                                                method="get"
                                                as="button"
                                            >
                                                Add Account
                                            </Dropdown.Link>
                                            )}
                                            {user.role === 'admin' && (
                                            <Dropdown.Link
                                                href={route('new_client.index')}
                                                method="get"
                                                as="button"
                                            >
                                                New Client
                                            </Dropdown.Link>
                                            )}
                                            {user.role === 'admin' && (
                                            <Dropdown.Link
                                                href={route('result.index')}
                                                method="get"
                                                as="button"
                                            >
                                                Submitted Task
                                            </Dropdown.Link>
                                            )}

                                        </Dropdown.Content>
                                    </Dropdown>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black">
                                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                                </svg>
                                            </Link>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Navbar */}


                    {/* Sidebar */}
                    <div
                        className={
                            (showingNavigationDropdown ? 'block' : 'hidden') +
                            ' sm:hidden bg-black flex z-40 justify-end'
                        }
                    >
                        <div className='bg-[#f4f4f4] w-8/12 flex flex-col absolute h-screen -mt-[60px] p-8'>
                            <div className="space-y-4 pb-3 relative mt-[60px] pt-2 object-top">
                                <ResponsiveNavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('task.index')}
                                    active={route().current('task.index')}
                                >
                                    Task
                                </ResponsiveNavLink>
                            </div>

                            <div className="border-t border-gray-400 pb-1 pt-4 flex items-end h-full">
                                <div>
                                    <div className="px-4">
                                        <div className=" font-extrabold text-xl text-gray-900">
                                            {user.name}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500">
                                            {user.email}
                                        </div>
                                    </div>

                                    <div className="mt-3 space-y-1">
                                        <ResponsiveNavLink href={route('personal_dashboard.index')}>
                                            Profile
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink
                                            method="post"
                                            href={route('logout')}
                                            as="button"
                                        >
                                            Log Out
                                        </ResponsiveNavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar */}

                    
                </nav>

                {header && (
                    <header className="  ">
                        <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
                <div className='w-screen h-screen top-0 left-0 -z-50 bg-[#D2D3DF] fixed [background:radial-gradient(125%_125%_at_50%_10%,#E9EAF4_40%,#DBC6B2_100%)] bg-[size:2rem_2rem]'></div>
            </div>
        </div>
    );
}
