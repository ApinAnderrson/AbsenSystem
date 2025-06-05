import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Fragment, useState, useRef } from 'react';

export default function Dashboard({ userName , absens , clients , tasks }) {

    const [showIndex, setShowIndex] = useState(-1);
    const [showDescriptionSubmit, setShowDescriptionSubmit] = useState(null);
    const [hiddenOnProgress, setHiddenOnProgress] = useState(false);
    const [hiddenPending, setHiddenPending] = useState(false);
    const [hiddenApproved, setHiddenApproved] = useState(false);
    const [hiddenInReview, setHiddenInReview] = useState(false);
    const [hiddenRejected, setHiddenRejected] = useState(false);
    const [hiddenRevision, setHiddenRevision] = useState(false);
    const [hiddenIdle, setHiddenIdle] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        absence : '',
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
    
        if (remainingDays <= 1) {
            urgent.push(task);
        } else if (remainingDays >= 2 && remainingDays <= 3) {
            soon.push(task); // Soon
        } else if (remainingDays >= 4 && remainingDays <= 6) {
            up_coming.push(task); // Upcoming
        } else {
            return 'bg-blue-700'; // Later
        }
    }

    tasks.map((task,index)=>{
        tableCountTask(task);
    })

    const date = new Date();
    const today = date.toISOString().slice(0, 10);

    const [sortDate, setSortDate] = useState(today)

    const filteredAbsens = absens.filter(absen => {
        return sortDate === '' || absen.tanggal === sortDate;
    });

    const toggleDescription = (index) => {
        // console.log(e)
        if(showDescriptionSubmit === index){
            setShowDescriptionSubmit(null)
        } else{
            setShowDescriptionSubmit(index)
        }
    }

    const onProgressTask = (value)=>{
        if(hiddenOnProgress === value){
            setHiddenOnProgress(true)
        } else{
            setHiddenOnProgress(false)
        }
    }
    
    const pendingTask = (value)=>{
        if(hiddenPending=== value){
            setHiddenPending(true)
        } else{
            setHiddenPending(false)
        }
    }
    
    const approvedTask = (value)=>{
        if(hiddenApproved=== value){
            setHiddenApproved(true)
        } else{
            setHiddenApproved(false)
        }
    }
    
    const inReviewTask = (value)=>{
        if(hiddenInReview=== value){
            setHiddenInReview(true)
        } else{
            setHiddenInReview(false)
        }
    }
    
    const rejectedTask = (value)=>{
        if(hiddenRejected=== value){
            setHiddenRejected(true)
        } else{
            setHiddenRejected(false)
        }
    }

    const revisionTask = (value)=>{
        if(hiddenRevision === value){
            setHiddenRevision(true)
        } else{
            setHiddenRevision(false)
        }
    }

    const idleTask = (value)=>{
        if(hiddenIdle === value){
            setHiddenIdle(true)
        } else{
            setHiddenIdle(false)
        }
    }

    const onProgressStatus = tasks.filter(task => {
                            return task.status === 'On Progress';
                        });

    const pendingStatus = tasks.filter(task => {
                            return task.status === 'Pending';
                        });
    
    const approvedStatus = tasks.filter(task => {
                            return task.status === 'Approved';
                        });
    
    const inReviewStatus = tasks.filter(task => {
                            return task.status === 'In Review';
                        });
    
    const rejectedStatus = tasks.filter(task => {
                            return task.status === 'Rejected';
                        });
    
    const revisionStatus = tasks.filter(task => {
                            return task.status === 'Revision';
                        });

    const idleStatus = tasks.filter(task => {
                            return task.status === 'Idle';
                        });
    

    const formRef = useRef();
    
    function submit(e) {
        e.preventDefault();
        // console.log(e); // Check if data is correct before sending
        post(route('absence.store'), {
            onSuccess: () => window.location.reload(),
        });
    }

    // console.log(clients)

    return (
    <>
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
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-screen-2xl ">
                    <div className="overflow-hidden bg-transparent border-zinc-50 border-2 shadow-lg rounded-2xl p-4 flex flex-col gap-5">
                        <div className='w-full flex gap-5'>
                            <div className='w-3/5 grid grid-cols-3 gap-x-3 gap-y-3'>
                                
                                    <div className="text-white bg-red-800 p-10 h-fit flex flex-col gap-8 border-zinc-50 border-2 rounded-2xl col-span-1">
                                        <div className='text-3xl font-extrabold'>
                                            Urgent Task
                                        </div>
                                        <div className='text-6xl text-right font-extrabold'>
                                            {urgent.length}/{tasks.length}
                                        </div>
                                    </div>
                                    <div className="text-gray-900 bg-yellow-500 p-10 h-fit flex flex-col gap-8 border-zinc-50 border-2 rounded-2xl col-span-1">
                                        <div className='text-3xl font-extrabold'>
                                            Soon
                                        </div>
                                        <div className='text-6xl text-right font-extrabold'>
                                            {soon.length}/{tasks.length}
                                        </div>
                                    </div>
                                    <div className="text-gray-900 bg-emerald-600 p-10 h-fit flex flex-col gap-8 border-zinc-50 border-2 rounded-2xl col-span-1">
                                        <div className='text-3xl font-extrabold'>
                                            Up Coming
                                        </div>
                                        <div className='text-6xl text-right font-extrabold'>
                                            {up_coming.length}/{tasks.length}
                                        </div>
                                    </div>
                                    
                                    {/* Client Static */}

                                    <div className="text-gray-900 bg-white p-10 px-14 h-fit flex flex-col gap-3 border-zinc-50 border-2 rounded-2xl col-span-3">
                                        <div className='text-3xl font-extrabold p-2 pb-3 border-b-2 border-gray-900 flex flex-col gap-5 '>
                                            Client
                                        </div>
                                            <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='px-4 py-2'>No</th>
                                                    <th className='w-40'>Nama</th>
                                                    <th className='w-40'>Type</th>
                                                    <th className='w-40'>Location</th>
                                                    <th className='w-40'>Congtract</th>
                                                    <th className='w-40'>Product</th>
                                                    <th className='w-40'>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clients.map((client, index)=>(
                                                    <Fragment key={client.id}>
                                                        <tr id={client.id} className='text-gray-950 text-lg text-left'>
                                                            <td>{ index + 1 }</td>
                                                            <td>{ client.company_name }</td>
                                                            <td>{ client.type }</td>
                                                            <td>{ client.location }</td>
                                                            <td>{ client.contract }</td>
                                                            <td>{ client.package }</td>
                                                            <td>{ client.status }</td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div> 

                                    {/* Client Static */}
                            </div>
                            <div className='w-2/5'>
                                <div className="text-gray-950  bg-white font-thin p-8 border-zinc-50 border-2 rounded-2xl max-h-96">
                                    <div id='sort_penanggung_jawab' className="pb-4 flex justify-between">
                                        <input type="date" 
                                            value={sortDate}
                                        onChange={(e)=>setSortDate(e.target.value)}
                                        />
                                        <form onSubmit={submit} ref={formRef} className='flex gap-5'>
                                            <select 
                                            name="" 
                                            id=""
                                            value={data.absence}
                                            onChange={(e)=>setData('absence', e.target.value)}
                                            >
                                                <option value="Sakit">Sakit</option>
                                                <option value="Izin">Izin</option>
                                                <option value="Hadir">Hadir</option>
                                                <option value="Balek">Balek</option>
                                            </select>
                                            <button type='submit' className='bg-emerald-500 font-bold px-5 py-2'>
                                                Submit
                                            </button>

                                        </form>
                                    </div>
                                    <table className="w-full border-collapse ">
                                        <thead>
                                            <tr className='text-2xl border-b-2'>
                                                <th className=' px-4 py-2'>No</th>
                                                <th className='w-40  p-2'>Nama</th>
                                                <th className='w-40 p-2 '>Status</th>
                                                <th className='w-40 p-2 '>Datang</th>
                                                <th className='w-40 p-2 '>Pulang</th>
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
                        </div>
                    </div>

                    {/* TASKK */}
                    <div className="overflow-hidden  border-zinc-50 mt-10 border-2 shadow-lg rounded-2xl p-4 flex flex-col gap-5">
                        <div className='w-full flex gap-5'>
                            <div className='w-full '>

                                {/* On Progress */}
                                <div id="on-progress" className='w-full pb-5 border-b-2 border-red-800 '>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenOnProgress ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-red-800 rounded-xl`} onClick={()=>onProgressTask(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white ' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>On Progress</div>
                                    </div>
                                    <div className={`${hiddenOnProgress ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='w-10 px-4 py-2'>No</th>
                                                    <th className='w-72'>Task</th>
                                                    <th className='w-80'>Penanggung Jawab</th>
                                                    <th className='w-52'>Task Format</th>
                                                    <th className='w-52'>Status</th>
                                                    <th className='w-80'>Company</th>
                                                    <th className='w-42'>Category</th>
                                                    <th className=''>Deadline</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {onProgressStatus.map((task, index)=>(
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
                                                        <tr className={`${showDescriptionSubmit === index ? '' : 'hidden'}`}>
                                                            <td colSpan={9} className={``}>
                                                                <div id="descriptionDetail_SubmitTask" className={` bg-white border-neutral-500 rounded-xl border p-5`}>
                                                                    <div id="descriptionSection" className={``}>
                                                                        <div className='text-xl font-bold text-neutral-900  mb-1 '>{task.company}</div>
                                                                        {/* <div className='text-md text-yellow-200 mb-1 font-semibold'>{task.task_format}</div> */}
                                                                        <div className='text-sm text-zinc-900 mb-1 '>{task.description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* On Progress */}

                                {/* Pending */}
                                <div id="pending" className='w-full pb-5 border-b-2 border-orange-500'>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenPending ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-orange-600 rounded-xl`} 
                                            onClick={()=>pendingTask(false)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>Pending</div>
                                    </div>
                                    <div className={`${hiddenPending ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='w-10 px-4 py-2'>No</th>
                                                    <th className='w-72'>Task</th>
                                                    <th className='w-80'>Penanggung Jawab</th>
                                                    <th className='w-52'>Task Format</th>
                                                    <th className='w-52'>Status</th>
                                                    <th className='w-80'>Company</th>
                                                    <th className='w-42'>Category</th>
                                                    <th className=''>Deadline</th>
                                                    {/* <th className=''></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pendingStatus.map((task, index)=>(
                                                    <Fragment key={task.uuid}>
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
                                                        <tr className={`${showDescriptionSubmit === index ? '' : 'hidden'}`}>
                                                            <td colSpan={9} className={``}>
                                                                <div id="descriptionDetail_SubmitTask" className={` bg-white border-neutral-500 rounded-xl border p-5`}>
                                                                    <div id="descriptionSection" className={``}>
                                                                        <div className='text-xl font-bold text-neutral-900  mb-1 '>{task.company}</div>
                                                                        {/* <div className='text-md text-yellow-200 mb-1 font-semibold'>{task.task_format}</div> */}
                                                                        <div className='text-sm text-zinc-900 mb-1 '>{task.description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* Pending */}

                                {/* Approved */}
                                <div id="approved" className='w-full pb-5 border-yellow-500 border-b-2'>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenApproved ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-yellow-500 rounded-xl`} onClick={()=>approvedTask(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>Approved</div>
                                    </div>
                                    <div className={`${hiddenApproved ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='w-10 px-4 py-2'>No</th>
                                                    <th className='w-72'>Task</th>
                                                    <th className='w-80'>Penanggung Jawab</th>
                                                    <th className='w-52'>Task Format</th>
                                                    <th className='w-52'>Status</th>
                                                    <th className='w-80'>Company</th>
                                                    <th className='w-42'>Category</th>
                                                    <th className=''>Deadline</th>
                                                    {/* <th className=''></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {approvedStatus.map((task, index)=>(
                                                    <Fragment key={task.uuid}>
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
                                                        <tr className={`${showDescriptionSubmit === index ? '' : 'hidden'}`}>
                                                            <td colSpan={9} className={``}>
                                                                <div id="descriptionDetail_SubmitTask" className={` bg-white border-neutral-500 rounded-xl border p-5`}>
                                                                    <div id="descriptionSection" className={``}>
                                                                        <div className='text-xl font-bold text-neutral-900  mb-1 '>{task.company}</div>
                                                                        {/* <div className='text-md text-yellow-200 mb-1 font-semibold'>{task.task_format}</div> */}
                                                                        <div className='text-sm text-zinc-900 mb-1 '>{task.description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* Approved */}

                                {/* In Review */}
                                <div id="in-review" className='w-full pb-5 border-green-600 border-b-2'>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenInReview ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-green-600 rounded-xl`} onClick={()=>inReviewTask(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>In Review</div>
                                    </div>
                                    <div className={`${hiddenInReview ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='w-10 px-4 py-2'>No</th>
                                                    <th className='w-72'>Task</th>
                                                    <th className='w-80'>Penanggung Jawab</th>
                                                    <th className='w-52'>Task Format</th>
                                                    <th className='w-52'>Status</th>
                                                    <th className='w-80'>Company</th>
                                                    <th className='w-42'>Category</th>
                                                    <th className=''>Deadline</th>
                                                    {/* <th className=''></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inReviewStatus.map((task, index)=>(
                                                    <Fragment key={task.uuid}>
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
                                                        <tr className={`${showDescriptionSubmit === index ? '' : 'hidden'}`}>
                                                            <td colSpan={9} className={``}>
                                                                <div id="descriptionDetail_SubmitTask" className={` bg-white border-neutral-500 rounded-xl border p-5`}>
                                                                    <div id="descriptionSection" className={``}>
                                                                        <div className='text-xl font-bold text-neutral-900  mb-1 '>{task.company}</div>
                                                                        {/* <div className='text-md text-yellow-200 mb-1 font-semibold'>{task.task_format}</div> */}
                                                                        <div className='text-sm text-zinc-900 mb-1 '>{task.description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* In Review */}

                                {/* Rejected */}
                                <div id="rejected" className='w-full pb-5 border-cyan-600 border-b-2'>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenRejected ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-cyan-600 rounded-xl`} onClick={()=>rejectedTask(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>Rejected</div>
                                    </div>
                                    <div className={`${hiddenRejected ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='w-10 px-4 py-2'>No</th>
                                                    <th className='w-72'>Task</th>
                                                    <th className='w-80'>Penanggung Jawab</th>
                                                    <th className='w-52'>Task Format</th>
                                                    <th className='w-52'>Status</th>
                                                    <th className='w-80'>Company</th>
                                                    <th className='w-42'>Category</th>
                                                    <th className=''>Deadline</th>
                                                    {/* <th className=''></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rejectedStatus.map((task, index)=>(
                                                    <Fragment key={task.uuid}>
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
                                                        <tr className={`${showDescriptionSubmit === index ? '' : 'hidden'}`}>
                                                            <td colSpan={9} className={``}>
                                                                <div id="descriptionDetail_SubmitTask" className={` bg-white border-neutral-500 rounded-xl border p-5`}>
                                                                    <div id="descriptionSection" className={``}>
                                                                        <div className='text-xl font-bold text-neutral-900  mb-1 '>{task.company}</div>
                                                                        {/* <div className='text-md text-yellow-200 mb-1 font-semibold'>{task.task_format}</div> */}
                                                                        <div className='text-sm text-zinc-900 mb-1 '>{task.description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* Rejected */}

                                {/* Revision */}
                                <div id="revision" className='w-full pb-5 border-blue-600 border-b-2'>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenRevision ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-blue-600 rounded-xl`} onClick={()=>revisionTask(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>Revision</div>
                                    </div>
                                    <div className={`${hiddenRevision ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='w-10 px-4 py-2'>No</th>
                                                    <th className='w-72'>Task</th>
                                                    <th className='w-80'>Penanggung Jawab</th>
                                                    <th className='w-52'>Task Format</th>
                                                    <th className='w-52'>Status</th>
                                                    <th className='w-80'>Company</th>
                                                    <th className='w-42'>Category</th>
                                                    <th className=''>Deadline</th>
                                                    {/* <th className=''></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {revisionStatus.map((task, index)=>(
                                                    <Fragment key={task.uuid}>
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
                                                        <tr className={`${showDescriptionSubmit === index ? '' : 'hidden'}`}>
                                                            <td colSpan={9} className={``}>
                                                                <div id="descriptionDetail_SubmitTask" className={` bg-white border-neutral-500 rounded-xl border p-5`}>
                                                                    <div id="descriptionSection" className={``}>
                                                                        <div className='text-xl font-bold text-neutral-900  mb-1 '>{task.company}</div>
                                                                        {/* <div className='text-md text-yellow-200 mb-1 font-semibold'>{task.task_format}</div> */}
                                                                        <div className='text-sm text-zinc-900 mb-1 '>{task.description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* Revision */}

                                {/* Idle */}
                                <div id="Idle" className='w-full pb-5 border-violet-600 border-b-2'>
                                    <div className='flex items-center p-7 gap-4'>
                                        <div className={`${hiddenIdle ? 'rotate-0' : 'rotate-90'} w-12 h-12 items-center flex justify-center text-white bg-violet-600 rounded-xl`} onClick={()=>idleTask(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-white' >
                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        </div>
                                        <div className='text-3xl font-bold h-8 items-center flex'>Idle</div>
                                    </div>
                                    <div className={`${hiddenIdle ? 'hidden' : ''} text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='w-10 px-4 py-2'>No</th>
                                                    <th className='w-72'>Task</th>
                                                    <th className='w-80'>Penanggung Jawab</th>
                                                    <th className='w-52'>Task Format</th>
                                                    <th className='w-52'>Status</th>
                                                    <th className='w-80'>Company</th>
                                                    <th className='w-42'>Category</th>
                                                    <th className=''>Deadline</th>
                                                    {/* <th className=''></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {idleStatus.map((task, index)=>(
                                                    <Fragment key={task.uuid}>
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
                                                        <tr className={`${showDescriptionSubmit === index ? '' : 'hidden'}`}>
                                                            <td colSpan={9} className={``}>
                                                                <div id="descriptionDetail_SubmitTask" className={` bg-white border-neutral-500 rounded-xl border p-5`}>
                                                                    <div id="descriptionSection" className={``}>
                                                                        <div className='text-xl font-bold text-neutral-900  mb-1 '>{task.company}</div>
                                                                        {/* <div className='text-md text-yellow-200 mb-1 font-semibold'>{task.task_format}</div> */}
                                                                        <div className='text-sm text-zinc-900 mb-1 '>{task.description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* Idle */}


                            </div>
                        </div>
                    </div>
                    {/* TASKK */}
                </div>
            </div>
        </AuthenticatedLayout>
        </>
    );
}
