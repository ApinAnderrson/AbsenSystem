import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useRef, useState, Fragment, useEffect } from 'react';

export default function index({ tasks, userName  }) { //tasks diambil dari TaskController yang mana di bagian index itu di definisikan $task = task (model)::all() dan didefinisikan sebagai tasks. begitu juga dengan statuses
    
    console.log(tasks)

    const {data, setData, post, put, processing, errors} = useForm({
        uuid: "",
        link: "",
    });

    const [showIndex, setShowIndex] = useState(-1);
    const [showDeleteEdit, setShowDeleteEdit] = useState(null);
    const [showDescriptionSubmit, setShowDescriptionSubmit] = useState({index: null, type: null});
    const [sortPenanggungJawab, setSortPenanggungJawab] = useState(userName);
    const [sortStatus, setSortStatus] = useState('');
    const [sortDeadline, setSortDeadline] = useState('Desc'); // or 'desc'
    const [sortTask, setSortTask] = useState(''); 
    const [sortCompany, setSortCompany] = useState(''); 


    function tableChangeColor(task) {
        const deadline = new Date(task.deadline);
        const today = new Date();
    
        // Clear time part
        deadline.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
    
        const diffTime = deadline - today;
        const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days until deadline
    
        if (remainingDays >= 0 && remainingDays <= 3) {
            return 'bg-red-800'; // Urgent
        } else if (remainingDays >= 4 && remainingDays <= 7) {
            return 'bg-yellow-500'; // Soon
        } else if (remainingDays >= 8 ) {
            return 'bg-emerald-600'; // Upcoming
        } else if (remainingDays < 0){
            return 'bg-gray-400';
        }
    }

    function statusChangeColor(task){
        const status = task.status
        if (status === 'Idle'){
            return 'bg-violet-600 text-white'
        } else if (status === 'Revision'){
            return 'bg-blue-600 text-white'
        } else if (status === 'Rejected'){
            return 'bg-cyan-600 text-white'
        } else if (status === 'In Review'){
            return 'bg-green-600 text-white'
        }else if (status === 'Approved'){
            return 'bg-yellow-500 text-white'
        }else if (status === 'Pending'){
            return 'bg-orange-500 text-white'
        }else if (status === 'On Progress'){
            return 'bg-red-800 text-white'
        } else{
            return 'text-black'
        }
    }

    const toggleDescription = (type, index, uuid) => {
        if(showDescriptionSubmit.index === index && showDescriptionSubmit.type === type) {
            setShowDescriptionSubmit({index:null, type:null})
            // console.log(showDescriptionSubmit)
        }  else{
            setShowDescriptionSubmit({index, type})
            // console.log(showDescriptionSubmit)
        }
        setData('uuid', uuid)
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

    const formRef = useRef();

    function delete_edit(e, index){
        if(showDeleteEdit == index){
            setShowDeleteEdit(null)
        }else{
            setShowDeleteEdit(index)
        }
    }

    const filteredPJ = tasks.filter(task => {
        return (
            sortPenanggungJawab === "" || task.penanggung_jawab === sortPenanggungJawab
        ) && (sortStatus === "" || task.status === sortStatus) && (sortCompany === "" || task.company === sortCompany)
    }).sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
    
        if (sortDeadline === "Desc") {
          return dateA - dateB;
        } else if (sortDeadline === "Asc") {
          return dateB - dateA;
        } else {
          return 0;
        }
      })

      console.log(tasks);

    function handleSort(e) {
        // console.log(e.target.value)
        if (e.target.value === "Desc") {
            setSortDeadline('Desc')
        }
        else{
            setSortDeadline('Asc')
        }
    }

    function submit(e) {
        e.preventDefault();
        // console.log(e); // Check if data is correct before sending
        post(route('result.store'), {
            onSuccess: () => {
                put(route('update_task_submit.update'), {
                    onSuccess: () => window.location.reload(),
                    onError: (e) => console.error('PUT error', e),
                });
            },
            onError: (e) => console.error('POST error', e),
        });
    }

    let num = 1;

    const countAll = tasks.filter(t => t.status !== 'In Review' && t.status !== 'Rejected' && t.status !== 'Approved' && t.status !== 'Cancel' && t.penanggung_jawab === userName).length;
    const countInReview = tasks.filter(t => t.status === 'In Review' && t.penanggung_jawab === userName).length;
    const countRejected = tasks.filter(t => t.status === 'Rejected' && t.penanggung_jawab === userName).length;
    const countApproved = tasks.filter(t => t.status === 'Approved' && t.penanggung_jawab === userName).length;
    const countCancel = tasks.filter(t => t.status === 'Cancel' && t.penanggung_jawab === userName).length;


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
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden  shadow-sm sm:rounded-lg">
                        <div className="p-6 text-graypb-5 mb-5">
                            <div id="headTop" className='flex justify-between'>
                                <div id="sort-section" className='flex gap-7'>
                                    <div id='sort_penanggung_jawab' className="">
                                        <select name="" 
                                        className='text-black' 
                                        value={sortPenanggungJawab}
                                        onChange={(e)=>setSortPenanggungJawab(e.target.value)}
                                        id="">
                                            <option value="">All</option>
                                            {Array.from(new Set(tasks.map(task => task.penanggung_jawab))).map((status, idx)=>(
                                                <option key={idx} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div id='sort_penanggung_jawab' className="">
                                        <select name="" 
                                        className='text-black' 
                                        value={sortStatus}
                                        onChange={(e)=>setSortStatus(e.target.value)}
                                        id="">
                                            <option value="">All</option>
                                            {Array.from(new Set(tasks.map(task => task.status))).map((status, idx) => (
                                                <option key={idx} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div id='sort_penanggung_jawab' className="">
                                        <select name="" 
                                        className='text-black' 
                                        value={sortCompany}
                                        onChange={(e)=>setSortCompany(e.target.value)}
                                        id="">
                                            <option value="">All</option>
                                            {Array.from(new Set(tasks.map(task => task.company))).map((company, idx) => (
                                                <option key={idx} value={company}>{company}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div id='sort_deadline' className="">
                                            Deadline:
                                            <select name="" 
                                            className='text-black' 
                                            value={sortDeadline}
                                            onChange={(e)=>handleSort(e)}
                                            id="">
                                                <option value="Desc">Urgent</option>
                                                <option value="Asc">Not Urgent</option>
                                            </select>
                                    </div>
                                </div>
                                <div className="">
                                    <Link href={route('task.create')} className="px-5 py-4 bg-black text-white rounded-lg">+ Tambah Data</Link>
                                </div>
                            </div>
                            {/* TASKK */}
                    <div className="overflow-hidden  border-zinc-50 mt-10 border-2 shadow-lg rounded-2xl p-4 flex flex-col gap-5">
                        <div className='w-full flex gap-5'>
                            <div className='w-full '>

                                {/* On Progress */}
                                <div id="on-progress" className='w-full pb-5 mb-5 '>
                                    <div className={`text-gray-950  bg-white font-thin p-8 border-zinc-300 border-2 rounded-2xl w-full`}>
                                        <div className=' p-5 flex gap-10'>
                                            <div className={`inline-flex w-32 py-2 justify-center font-extrabold items-center border-b-2 px-1 pt-1 text-sm leading-5 transition duration-150 ease-in-out focus:outline-none 
                                                    ${sortTask === ''
                                                    ? 'w-32 text-black border-indigo-700 border-b-2 justify-center'
                                                    : 'border-transparent text-gray-500 hover:border-indigo-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 '}`}
                                                    onClick={(e)=>setSortTask('')}
                                            >All  ({countAll})
                                            </div>
                                            <div className={`inline-flex w-32 py-2 justify-center font-extrabold items-center border-b-2 px-1 pt-1 text-sm leading-5 transition duration-150 ease-in-out focus:outline-none 
                                                    ${sortTask === "In Review"
                                                    ? 'w-32 text-black border-indigo-700 border-b-2 justify-center'
                                                    : 'border-transparent text-gray-500 hover:border-indigo-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 '}`}
                                                    onClick={(e)=>setSortTask('In Review')}
                                            >In Review  ({countInReview})</div>
                                            <div className={`inline-flex w-32 py-2 justify-center font-extrabold items-center border-b-2 px-1 pt-1 text-sm leading-5 transition duration-150 ease-in-out focus:outline-none 
                                                    ${sortTask === "Rejected"
                                                    ? 'w-32 text-black border-indigo-700 border-b-2 justify-center'
                                                    : 'border-transparent text-gray-500 hover:border-indigo-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 '}`}
                                                    onClick={(e)=>setSortTask('Rejected')}
                                            >Rejected  ({countRejected})</div>
                                            <div className={`inline-flex w-32 py-2 font-extrabold items-center border-b-2 px-1 pt-1 text-sm leading-5 transition duration-150 ease-in-out focus:outline-none 
                                                    ${sortTask === "Approved"
                                                    ? 'text-black justify-center border-indigo-700 border-b-2'
                                                    : 'border-transparent text-gray-500 justify-center hover:border-indigo-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 '}`}
                                                    onClick={(e)=>setSortTask('Approved')} 
                                            >Approved ({countApproved})</div>
                                            <div className={`inline-flex w-32 py-2 font-extrabold items-center border-b-2 px-1 pt-1 text-sm leading-5 transition duration-150 ease-in-out focus:outline-none 
                                                    ${sortTask === "Cancel"
                                                    ? 'text-black justify-center border-indigo-700 border-b-2'
                                                    : 'border-transparent text-gray-500 justify-center hover:border-indigo-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 '}`}
                                                    onClick={(e)=>setSortTask('Cancel')} 
                                            >Cancel  ({countCancel})</div>
                                        </div>
                                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='px-4 py-2'>No</th>
                                                    <th className=''>Task</th>
                                                    <th className=''>Description</th>
                                                    <th className=''>Penanggung Jawab</th>
                                                    <th className=''>Task Format</th>
                                                    <th className=''>Status</th>
                                                    <th className=''>Company</th>
                                                    <th className=''>Category</th>
                                                    <th className=''>Deadline</th>
                                                    <th className={``}>Submit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredPJ.map((task, index)=>(
                                                    (sortTask === "" ? !['Rejected', 'Approved', 'In Review', 'Cancel'].includes(task.status) : task.status === sortTask) && (
                                                    <Fragment key={task.uuid} >
                                                        <tr id={task.uuid} className={`text-gray-950 text-lg text-left `}>
                                                            <td>
                                                                <div className={`${tableChangeColor(task)} w-12 h-8 text-white font-extrabold rounded-md items-center flex justify-center`}>
                                                                    { num++ }
                                                                </div>
                                                            </td>
                                                            <td>{ task.task_title }</td>
                                                            <td>
                                                                <button className='bg-red-800 px-5 py-2 rounded-md text-md text-bold text-white' onClick={(e)=>toggleDescription("description", index, task.uuid)}>Description</button>
                                                            </td>
                                                            <td>{ task.penanggung_jawab }</td>
                                                            <td>{ task.task_format }</td>
                                                            <td >
                                                                <div className={`${statusChangeColor(task)} justify-center items-center flex font-light py-2 px-4 rounded-md  `} >
                                                                    { task.status }
                                                                </div>
                                                            </td>
                                                            <td>{ task.company }</td>
                                                            <td>{ task.category }</td>
                                                            <td>{ task.deadline }</td>
                                                            <td className={`${task.status === 'Cancel' ? 'hidden' : ''}`}>
                                                                <button className='bg-red-800 px-5 py-2 rounded-md text-md text-bold text-white' onClick={(e)=>toggleDescription("submit", index, task.uuid)}>Submit</button>
                                                            </td>
                                                            <td className={`${task.status === 'Cancel' ? '' : 'hidden'}`}>
                                                                Task Canceled
                                                            </td>
                                                            <td className=''>
                                                                <button>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setShowDeleteEdit(index)} className={``} width="16" height="16" >
                                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                                                    </svg>
                                                                </button>
                                                                <div ref={(el)=> (dropdownRefs.current[index] = el)} className= {`${showDeleteEdit === index ? '' : 'hidden'} bg-white ml-3 rounded-md absolute w-40 h-20 p-2 flex items-left flex-col justify-center`}>
                                                                    <button id="delete" 
                                                                        onClick={() => {
                                                                            if (confirm("Are you sure?")) {
                                                                                router.delete(route('task.destroy',task.uuid ), {
                                                                                    onSuccess: () => alert("Task deleted!"),
                                                                                    onError: (errors) => console.error(errors),
                                                                                });
                                                                            }
                                                                        }}
                                                                        className='text-left ml-2 text-sm p-2 w-fit hover:text-red-600'>Delete
                                                                    </button>
                                                                    <div id="line-delete-edit" className='w-full h-[1px] bg-white border-b-[1px]'></div>
                                                                    <Link id="edit" href={route('task.edit', task.uuid)} className='text-left ml-2 text-sm p-2 w-fit hover:text-green-600'>Edit</Link>
                                                                </div >
                                                            </td>
                                                        </tr>
                                                        <tr className={`${showDescriptionSubmit.index === index ? '' : 'hidden'}`}>
                                                            <td colSpan={11} className={``}>
                                                                {/* Description section */}
                                                                <div id="descriptionSection" className={`${showDescriptionSubmit.type === "description" ? "block" : "hidden"}   `}>
                                                                    <div className='text-2xl font-bold text-neutral-900 mb-1'>{task.company}</div>
                                                                    <div className='text-sm text-zinc-900 mb-1'>{task.description}</div>
                                                                </div>

                                                                {/* Submit section */}
                                                                <div id="submitSection" className={`${showDescriptionSubmit.type === "submit" ? "block" : "hidden"}`}>
                                                                    <form onSubmit={submit}>
                                                                        <div className={`${sortTask === "Rejected" ? "" : "hidden"} mb-10 border-b-2 border-b-gray-700`}>
                                                                            <p className='text-2xl font-extrabold mb-3'>REVISI</p>
                                                                            <div className={` mb-5`}>{ task.rejected_revision?.revision }</div>
                                                                        </div>
                                                                        <div className='text-2xl font-extrabold mb-1'>Wow! You Already Finish Your Task 😎🥰</div>
                                                                        <div className='text-lg mb-2'>Submit Your Task Now!</div>
                                                                        <input 
                                                                            type="text" 
                                                                            className={`w-full rounded-lg`} 
                                                                            value={['In Review', 'Approved'].includes(task.status) ? task.result?.link || '' : data.link}
                                                                            onChange={(e)=> setData("link", e.target.value)}  
                                                                            disabled ={['In Review', 'Approved'].includes(task.status)}
                                                                        />
                                                                        <div className={`${sortTask === "In Review" || sortTask === "Approved" ? 'hidden' : ''} mt-4 flex items-center justify-end`}>
                                                                            <button type="submit" className={` py-3 px-5 rounded-md bg-yellow-500`} onSubmit={(e)=>submit(e)} disabled={processing}>
                                                                                Submit Task
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* On Progress */}
                            </div>
                        </div>
                    </div>
                    {/* TASKK */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
