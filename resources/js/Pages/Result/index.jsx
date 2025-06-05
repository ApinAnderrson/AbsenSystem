import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Fragment, useState, useRef, useEffect } from 'react';

export default function index({ tasks }) {

    // console.log(tasks.penanggung_jawab)
    
    const filteredTask = tasks;
    

    const { data, setData, put, processing, errors, reset } = useForm({
        uuid: '',
        status: ''
    });
        
    const [showDeleteEdit, setShowDeleteEdit] = useState(false);
    const [hiddenSubmitLink, setHiddenSubmitLink] = useState(true);
    const [hiddenLinkContainer, setHiddenLinkContainer] = useState(null);


    // console.log(clients.password)

    const hideLink = (e, index, uuid )=>{
        if(hiddenSubmitLink === e){
            setHiddenSubmitLink(false)
            setHiddenLinkContainer(index)
        } else{
            setHiddenSubmitLink(true);
            setHiddenLinkContainer(null);
        }
        setData('uuid', uuid)
        console.log(e, index)
    }

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
        console.log(data)
        e.preventDefault();
        
        
        put(route('result.update', {result: data.uuid}), {
            onSuccess: () => {
                if(data.status === 'Rejected'){
                router.delete(route('result.destroy', data.uuid ), {
                    onSuccess: () => {
                        window.location.reload()
                    },
                    onError: (errors) => console.error(errors),
                });
                } else {
                    onSuccess: () => {
                        window.location.reload()
                    }
                }
            },
            onError: (errors) => console.error(errors),
        });
        
    };

    let num = 1
    
    return (
        <AuthenticatedLayout
            header={
                <>
                    <h1 className="text-6xl mt-8 font-semibold leading-tight text-[#1c1c1c] mb-2">
                        Task Result 🎊✨🎉
                    </h1>
                    <p className='text-2xl'>
                        Finally , you have completed the task. You can now proceed to the next task.
                    </p>
                </>
            }
        >
        <Head title="Client" />
            <div className="flex flex-col items-center sm:justify-center sm:pt-0\">
                
                <div className=" w-full flex mt-6 gap-5 justify-between">  
                    <div className="w-full px-6 py-4 shadow-md sm:rounded-lg">
                        <table className='w-full border-collapse text-black'>
                            <thead>
                                <tr className=' text-left border-b-2 border-gray-700'>
                                    <th>No</th>
                                    <th>Task</th>
                                    <th>Penanggung Jawab</th>
                                    <th>Task Format</th>
                                    <th>Company</th>
                                    <th>Category</th>
                                    <th>Deadline</th>
                                    <th>Check</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTask.map((task,index)=>(
                                    task.status !== 'Approved' && task.status !== 'Rejected' && (
                                    <Fragment key = {task.uuid}>
                                        {console.log(task.status)}
                                        <tr className={``}>
                                            <td>{ num++ }</td>
                                            <td>{task.task_title}</td>
                                            <td>{task.penanggung_jawab}</td>
                                            <td>{task.task_format}</td>
                                            <td>{task.company}</td>
                                            <td>{task.category}</td>
                                            <td>{task.deadline}</td>
                                            <td>
                                                <div className={`${hiddenSubmitLink ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-red-800 rounded-xl`} onClick={()=>hideLink(true, index, task.uuid)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white ' >
                                                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className={`border-b-2 border-gray-300 ${hiddenLinkContainer  === index ? '' : 'hidden' }`}>
                                            <td colSpan={8} >
                                                <div className='flex flex-col'>
                                                    <div className='font-bold mb-3 flex justify-between items-center'>
                                                        <div className='text-xl'>
                                                            Link Pengumpulan
                                                        </div>
                                                        <div className='flex gap-5 w-1/5'>
                                                        <form onSubmit={submit} className='flex w-full py-3 px-5 gap-5'>
                                                            <ul className="items-center w-full text-sm font-medium text-gray-900  border border-gray-200 rounded-lg sm:flex ">
                                                                <li className="w-full border-b sm:border-b-0 sm:border-r">
                                                                    <div className="flex items-center ps-3">
                                                                        <input id={`list-radio-accept${index}`} checked={data.status === "Approved"} onChange={(e)=>setData('status', e.target.value)} type="radio" value="Approved" name={`list-radio${index}`}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-900 focus:ring-blue-500 "/>
                                                                        <label htmlFor={`list-radio-accept${index}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Approved</label>
                                                                    </div>
                                                                </li>
                                                                <li className="w-full border-b sm:border-b-0 sm:border-r">
                                                                    <div className="flex items-center ps-3">
                                                                        <input id={`list-radio-rejected${index}`} checked={data.status === "Rejected"} onChange={(e)=>setData('status', e.target.value)} type="radio" value="Rejected" name={`list-radio${index}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-900 focus:ring-blue-500 "/>
                                                                        <label htmlFor={`list-radio-rejected${index}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Rejected</label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <button type="submit" className="py-3 px-8 rounded-md bg-yellow-500" disabled={processing}>
                                                                Send
                                                            </button>
                                                        </form>
                                                        </div>
                                                    </div>
                                                    <div className='bg-white p-5'>
                                                        {task.result?.link}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
