import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useRef, useState, Fragment, useEffect } from 'react';

export default function index({ tasks, userName  }) { //tasks diambil dari TaskController yang mana di bagian index itu di definisikan $task = task (model)::all() dan didefinisikan sebagai tasks. begitu juga dengan statuses
    
    // console.log(status)

    const {data, setData, post, put, processing, errors} = useForm({
        uuid: "",
        link: "",
    });

    const [showIndex, setShowIndex] = useState(-1);
    const [showDeleteEdit, setShowDeleteEdit] = useState(null);
    const [showDescriptionSubmit, setShowDescriptionSubmit] = useState({index: null, type: null});
    const [sortPenanggungJawab, setSortPenanggungJawab] = useState('');
    const [sortStatus, setSortStatus] = useState('');
    const [sortDeadline, setSortDeadline] = useState('Desc'); // or 'desc'


    function tableChangeColor(task) {
        const deadline = new Date(task.deadline);
        const today = new Date();
    
        // Clear time part
        deadline.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
    
        const diffTime = deadline - today;
        const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days until deadline
    
        if (remainingDays <= 1) {
            return 'bg-red-800'; // Urgent
        } else if (remainingDays >= 2 && remainingDays <= 3) {
            return 'bg-yellow-500'; // Soon
        } else if (remainingDays >= 4 && remainingDays <= 6) {
            return 'bg-emerald-600'; // Upcoming
        } else {
            return 'bg-blue-700'; // Later
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
        ) && (sortStatus === "" || task.status === sortStatus)
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
    

    let num = 1

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
                                                    <th className=''>Submit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredPJ.map((task, index)=>(
                                                    task.status === 'Rejected' && (
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
                                                            <td>{ task.status }</td>
                                                            <td>{ task.company }</td>
                                                            <td>{ task.category }</td>
                                                            <td>{ task.deadline }</td>
                                                            <td>
                                                                <button className='bg-red-800 px-5 py-2 rounded-md text-md text-bold text-white' onClick={(e)=>toggleDescription("submit", index, task.uuid)}>Submit</button>
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
                                                                        <div className='text-2xl font-extrabold mb-1'>Wow! You Already Finish Your Task 😎🥰</div>
                                                                        <div className='text-lg mb-2'>Submit Your Task Now!</div>
                                                                        <input type="text" className='w-full rounded-lg' value={data.link} onChange={(e)=> setData("link", e.target.value)}/>
                                                                        <div className="mt-4 flex items-center justify-end ">
                                                                            <button type="submit" className="py-3 px-5 rounded-md bg-yellow-500" onSubmit={(e)=>submit(e)} disabled={processing}>
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
