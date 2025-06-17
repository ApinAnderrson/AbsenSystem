import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Fragment, useRef, useState } from 'react';

export default function index({ absens, userName, users, tasks }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        absence : '',
    });
    const [hiddenUrgentTask, setHiddenUrgentTask] = useState(false);
    const [hiddenSoon, setHiddenSoon] = useState(false);
    const [hiddenUpComing, setHiddenUpComing] = useState(false);
    const filteredAbsens = absens.filter(absen => {
        return absen.user == userName
        // console.log(userName)
    });


    const urgent = [];
    const soon = [];
    const up_coming = [];

    // console.log(tasks)
    
    function tableCountTask(task) {
        const deadline = new Date(task.deadline);
        const today = new Date();
    
        // Clear time part
        deadline.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
    
        const diffTime = deadline - today;
        const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days until deadline
    
        if (remainingDays >= 0 && remainingDays <= 3) {
            if(task.penanggung_jawab === userName){
                urgent.push(task);
            }
        } else if (remainingDays >= 4 && remainingDays <= 7) {
            if(task.penanggung_jawab === userName){
                soon.push(task); // Soon
            }
        } else if (remainingDays >= 8) {
            if(task.penanggung_jawab === userName){
            up_coming.push(task); // Upcoming
            }
        }
    }

    tasks.map((task,index)=>{
        tableCountTask(task);
    })

    console.log(urgent)

    const UrgentTask = (value)=>{
        if(hiddenUrgentTask === value){
            setHiddenUrgentTask(true)
        } else{
            setHiddenUrgentTask(false)
        }
    }
    

    const soonTask = (value)=>{
        if(hiddenSoon === value){
            setHiddenSoon(true)
        } else{
            setHiddenSoon(false)
        }
    }
    

    const upComingTask = (value)=>{
        if(hiddenUpComing === value){
            setHiddenUpComing(true)
        } else{
            setHiddenUpComing(false)
        }
    }
    

    // const formRef = useRef();

function submit(e) {
    e.preventDefault();
    // console.log(e); // Check if data is correct before sending
    post(route('absence.store'), {
        onSuccess: () => window.location.reload(),
    });
}
    
    return (
        <AuthenticatedLayout
            header={
                <>
                    
                </>
            }
        >
        <Head title="Client" />
            <div className="flex flex-col gap-14 items-center pt-6 sm:justify-center sm:pt-0 ">
                <div className="max-w-screen-2xl w-full flex mt-6 gap-5 justify-between"> 
                    <div className='w-3/12'>
                        <div className='flex justify-center h-96 flex-col'>
                            <h1 className="text-6xl mb-2 mt-8 font-semibold leading-tight text-[#1c1c1c]">
                                Hi, {userName}! 👋
                            </h1>
                            <p className='text-xl bg-yellow-500 font-extrabold w-fit px-10 py-3 mb-2 rounded-lg tracking-widest'>
                                {users.role.toUpperCase()}
                            </p>
                            <p className='text-2xl tracking-wider font-bold'>
                                {users.email}
                            </p>
                        </div>
                    </div>
                    <div className="w-9/12 no-scrollbar bg-white shadow-md overflow-y-auto max-h-96 sm:rounded-lg ">
                        <table className="w-full border-collapse ">
                            <thead className='text-2xl border-b-2 sticky top-0 bg-gray-100'>
                                <tr>
                                    <th className='px-6 py-6'>No</th>
                                    <th className='px-6 py-6'>Nama</th>
                                    <th className='px-6 py-6 '>Status</th>
                                    <th className='px-6 py-6 '>Datang</th>
                                    <th className='px-6 py-6 '>Pulang</th>
                                </tr>
                                <tr className='border-b-2 '>

                                </tr>
                            </thead>
                            <tbody>
                                {filteredAbsens.map((absen, index)=>(
                                    <Fragment key={absen.id}>
                                        <tr id={absen.id} className='text-gray-950 text-lg text-center'>
                                            <td>{ index + 1 }</td>
                                            <td>{ absen.user }</td>
                                            <td>{ absen.status }</td>
                                            <td>{ absen.jam_datang }</td>
                                            <td>{ absen.jam_balek }</td>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='max-w-screen-2xl w-full flex mt-6 gap-5 justify-between'>
                    <div className='w-3/12'>
                        <div className='flex flex-col gap-10'>
                            <div className='text-black bg-red-800 p-10 h-fit flex flex-col gap-8 border-gray-950 border-4 rounded-2xl col-span-1'>
                                <div className='font-extrabold text-2xl'>
                                    Urgent Task
                                </div>
                                <div className='text-4xl text-right font-extrabold'>
                                    {urgent.length}
                                </div>
                            </div>
                            <div className='text-black bg-yellow-500 p-10 h-fit flex flex-col gap-8 border-gray-950 border-4  rounded-2xl col-span-1'>
                                <div className='font-extrabold text-2xl'>
                                    Soon Task
                                </div>
                                <div className='text-4xl text-right font-extrabold'>
                                    {soon.length}
                                </div>
                            </div>
                            <div className='text-black bg-emerald-600 p-10 h-fit flex flex-col gap-8 border-gray-950 border-4 rounded-2xl col-span-1'>
                                <div className='font-extrabold text-2xl'>
                                    Up Coming Task
                                </div>
                                <div className='text-4xl text-right font-extrabold'>
                                    {up_coming.length}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-9/12'>
                        <div className='flex flex-col'>
                                <div id="urgent_task" className='w-full pb-5 border-b-2 border-red-800 '>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenUrgentTask ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-red-800 rounded-xl`} onClick={()=>UrgentTask(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white ' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>Urgent Task</div>
                                    </div>
                                    <div className={`${hiddenUrgentTask ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='px-4 py-2'>No</th>
                                                    <th className=''>Task</th>
                                                    <th className=''>Penanggung Jawab</th>
                                                    <th className=''>Task Format</th>
                                                    <th className=''>Status</th>
                                                    <th className=''>Company</th>
                                                    <th className=''>Category</th>
                                                    <th className=''>Deadline</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {urgent.map((task, index)=>(
                                                    <Fragment key={task.uuid} className={``}>
                                                        <tr id={task.uuid} className='text-gray-950 text-lg text-left'>
                                                            <td>{ index + 1 }</td>
                                                            <td>{ task.task_title }</td>
                                                            <td>{ task.penanggung_jawab }</td>
                                                            <td>{ task.task_format }</td>
                                                            <td>{ task.status }</td>
                                                            <td>{ task.company }</td>
                                                            <td>{ task.category }</td>
                                                            <td>{ task.deadline }</td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div id="soon" className='w-full pb-5 border-b-2 border-yellow-500 '>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenSoon ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-yellow-500 rounded-xl`} onClick={()=>soonTask(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white ' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>Soon Task</div>
                                    </div>
                                    <div className={`${hiddenSoon ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='px-4 py-2'>No</th>
                                                    <th className=''>Task</th>
                                                    <th className=''>Penanggung Jawab</th>
                                                    <th className=''>Task Format</th>
                                                    <th className=''>Status</th>
                                                    <th className=''>Company</th>
                                                    <th className=''>Category</th>
                                                    <th className=''>Deadline</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {soon.map((task, index)=>(
                                                    <Fragment key={task.uuid} className={``}>
                                                        <tr id={task.uuid} className='text-gray-950 text-lg text-left'>
                                                            <td>{ index + 1 }</td>
                                                            <td>{ task.task_title }</td>
                                                            <td>{ task.penanggung_jawab }</td>
                                                            <td>{ task.task_format }</td>
                                                            <td>{ task.status }</td>
                                                            <td>{ task.company }</td>
                                                            <td>{ task.category }</td>
                                                            <td>{ task.deadline }</td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div id="Up Coming" className='w-full pb-5 border-b-2 border-emerald-500 '>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenUpComing ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-emerald-500 rounded-xl`} onClick={()=>upComingTask(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white ' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>Up Coming Task</div>
                                    </div>
                                    <div className={`${hiddenUpComing ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='px-4 py-2'>No</th>
                                                    <th className=''>Task</th>
                                                    <th className=''>Penanggung Jawab</th>
                                                    <th className=''>Task Format</th>
                                                    <th className=''>Status</th>
                                                    <th className=''>Company</th>
                                                    <th className=''>Category</th>
                                                    <th className=''>Deadline</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {up_coming.map((task, index)=>(
                                                    <Fragment key={task.uuid} className={``}>
                                                        <tr id={task.uuid} className='text-gray-950 text-lg text-left'>
                                                            <td>{ index + 1 }</td>
                                                            <td>{ task.task_title }</td>
                                                            <td>{ task.penanggung_jawab }</td>
                                                            <td>{ task.task_format }</td>
                                                            <td>{ task.status }</td>
                                                            <td>{ task.company }</td>
                                                            <td>{ task.category }</td>
                                                            <td>{ task.deadline }</td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
