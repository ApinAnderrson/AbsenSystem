    import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Fragment, useState, useRef, useEffect } from 'react';

export default function index({ clients, cicilans }) {

    
        
    const [showDeleteEdit, setShowDeleteEdit] = useState(false);

    // console.log(cicilans)

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

    
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Client
                </h2>
            }
        >
        <Head title="Client" />
            <div className="flex flex-col items-center pt-6 mt-10 sm:justify-center sm:pt-0\">
                <div className='flex justify-between w-full max-w-screen-2xl'>
                    <Link href="/" className='w-fit'>
                        <img className='w-96' src="\logo\Logo Pro Insight.png" alt="" />
                    </Link>
                    <div className='flex items-center'>
                        <Link href={route('new_client.create')} className='bg-indigo-600 text-white hover:bg-indigo-500 hover:ring-2 ring-indigo-900 px-5 py-3 rounded-md'>
                            New Client
                        </Link>
                    </div>
                </div>
                <div className=" w-full flex mt-6 gap-5 justify-between">  
                    <div className="w-full px-6 py-4 shadow-md sm:rounded-lg">
                        <table className='w-full border-collapse text-black'>
                            <thead>
                                <tr className=' text-left'>
                                    <th>No</th>
                                    <th>Company Name</th>
                                    <th>Type</th>
                                    <th>Location</th>
                                    <th>Contract</th>
                                    <th>Package</th>
                                    <th>Status</th>
                                    <th>Contract Ends</th>
                                    <th>Payment Month</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client,index)=>(
                                    <Fragment key = {client.uuid}>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{client.company_name}</td>
                                            <td>{client.type}</td>
                                            <td>{client.location}</td>
                                            <td>{
                                                client.contract.split(' ')[0] === "" ? client.contract.split(" ")[2] + " Bulan" : client.contract.split(" ")[0] + " Tahun " + client.contract.split(" ")[2] + " Bulan"
                                                // console.log(client.contract.split(' ')[2])
                                            }</td>
                                            <td>{client.package}</td>
                                            <td>{client.status}</td>
                                            <td>{client.contract_end}</td>
                                            <td>{client.payment_month !== "-" 
                                                ? client.payment_month 
                                                : cicilans
                                                    .filter(c => c.client_uuid === client.uuid)
                                                    .map((cicilan, index)=>{
                                                        const date = new Date(cicilan.tanggal);
                                                        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                                        const day = String(date.getDate()).padStart(2, '0');
                                                        const month = monthNames[date.getMonth()];
                                                        const year = date.getFullYear();
                                                        const formattedDate = `${day} ${month} ${year}`;
                                                        return <span key={index}>{formattedDate} {`${cicilan.status_cicilan === 'true' ? '✅' : ''}`} <br /> </span>;
                                                    }
                                                )}
                                            </td>
                                            <td className=''>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setShowDeleteEdit(index)} className={``} width="16" height="16" fill="currentColor" >
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                                    </svg>
                                                </button>
                                                <div ref={(el)=> (dropdownRefs.current[index] = el)} className= {`${showDeleteEdit === index ? '' : 'hidden'} bg-white ml-3 rounded-md absolute w-40 h-20 p-2 flex items-left flex-col justify-center`}>
                                                    <button id="delete" 
                                                        onClick={() => {
                                                            if (confirm("Are you sure?")) {
                                                                router.delete(route('new_client.destroy',client.uuid ), {
                                                                    onSuccess: () => alert("Task deleted!"),
                                                                    onError: (errors) => console.error(errors),
                                                                });
                                                            }
                                                        }}
                                                        className='text-left ml-2 text-sm p-2 w-fit hover:text-red-600'>Delete
                                                    </button>
                                                    <div id="line-delete-edit" className='w-full h-[1px] bg-white border-b-[1px]'></div>
                                                    <Link id="edit" href={route('new_client.edit', client.uuid)} className='text-left ml-2 text-sm p-2 w-fit hover:text-green-600'>Edit</Link>
                                                </div >
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
