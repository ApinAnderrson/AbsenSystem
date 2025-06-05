import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useRef, useEffect } from "react";


export default function edit({ task, users, companies }) {


    const { data, setData, put, errors, processing } = useForm({
        //useForm dia bisa dibilang sama kayak useState cuma lebih powerfull, dia bisa isi banyak state, misalnya disini ada state title, description, dan question yang mana kalau pakai usestate harus buat 3 use state

        task_title: task?.task_title||"",
        // sama aja kayak const [title, setTitle] = useState("Untitled Form")

        description: task?.description||"",
        // sama aja kayak const [title, setDescription] = useState("")

        penanggung_jawab: task?.penanggung_jawab||"",

        task_format: task?.task_format||"",

        status: task?.status||"hello",

        company: task?.company||"",

        category: task?.category||"",

        deadline: task?.deadline||"",
    });
    const descriptionRef = useRef(null);
            


    const textAreaAdjust = (element) => {
        element.style.height = "1px";
        element.style.height = `${8 + element.scrollHeight}px`;
    };

    // Adjust textarea height on value change
    useEffect(() => {
        if (descriptionRef.current) {
            textAreaAdjust(descriptionRef.current);
        }
    }, [data.description]);
    
    const descriptionChange = (e) => {
        setData("description", e.target.value);  
    };

    // const taskRef = useRef(null);

    const titleChange = (e, index) => {
        setData("task_title", e.target.value)
    }

    const formatChange = (e) => {
        setData('task_format', e.target.value);
    }

    const formRef = useRef();

    function submit(e) {
        e.preventDefault();
        // console.log(data); // Check if data is correct before sending
        put(route('task.update', task.uuid), {
            methods: 'put',  // this overrides POST with PUT
            onSuccess: () => {
              alert('Task updated!');
            }
          });// Explicitly send data
    }


    return (
        <AuthenticatedLayout
            header={
                <>
                    <h1 className="text-6xl flex justify-center mt-8 font-semibold leading-tight text-[#1c1c1c] mb-2">
                        Edit Your Task! 🥳🎉✨
                    </h1>
                    <p className='text-2xl flex justify-center'>
                        The more client we get the better, so add our client now!
                    </p>
                </>
            }
        >
            <Head title="Dashboard" />

            <div className="">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex">
                    <div className="overflow-hidden max-w-7xl w-full shadow-sm sm:rounded-lg flex justify-center">
                        <div className="p-6 max-w-xl text-gray-900 w-full shadow-md rounded-lg">
                            <form onSubmit={submit} ref={formRef}>
                                <div id="task" className='mb-6 mt-3'>
                                    <InputLabel htmlFor="task" className='text-xl'>Task Title</InputLabel> <br />
                                    <TextInput 
                                        type="text" 
                                        name='task_title'  
                                        value={data.task_title}
                                        onChange={(e)=>(
                                            titleChange(e)
                                        )}  
                                        className='-mt-4 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black'
                                    />
                                </div>
                                <div className='w-full flex gap-7 mb-6'>
                                    <div id="penanggung_jawab" className='w-2/4'>
                                        <InputLabel htmlFor="penanggung_jawab" className='text-xl'>Penanggung Jawab</InputLabel> <br />
                                        <select 
                                            name="penanggung_jawab" 
                                            id="" 
                                            value={data.penanggung_jawab}
                                            onChange={(e)=>(
                                                setData('penanggung_jawab', e.target.value)
                                            )}
                                            className='-mt-4 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black'>
                                                <option value="" selected disabled hidden>Select User</option>
                                                {Array.from(new Set(users.map(user => user.name))).map((status, idx) => (
                                                    <option key={idx} value={status}>{status}</option>
                                                ))}
                                        </select>
                                    </div>
                                    <div id="status" className='w-2/4'>
                                        <InputLabel htmlFor="status" className='text-xl'>Status</InputLabel> <br />
                                        <select 
                                            name="status" 
                                            id="" 
                                            value={data.status}
                                            onChange={(e)=>(
                                                setData('status', e.target.value)
                                            )}
                                            className='-mt-4 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black'>
                                                <option value="On Progress">On Progress</option>
                                                <option value="Pending">Pending</option>
                                                {/* <option value="Approved">Approved</option> */}
                                                {/* <option value="In Review">In Review</option> */}
                                                {/* <option value="Rejected">Rejected</option> */}
                                                {/* <option value="Revision">Revision</option> */}
                                                <option value="Idle">Idle</option>
                                        </select>
                                    </div>
                                </div>
                                <div id="company" className='mb-6'>
                                    <InputLabel htmlFor="company" className='text-xl'>Company</InputLabel> <br />
                                    <select
                                        name="company" 
                                        id="" 
                                        value={data.company}
                                        onChange={(e)=>(
                                            setData('company', e.target.value)
                                        )}
                                        className='-mt-4 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black'>
                                            <option value="" selected disabled hidden>Select User</option>
                                            {Array.from(new Set(companies.map(company => company.company_name))).map((status, idx) => (
                                                <option key={idx} value={status}>{status}</option>
                                            ))}
                                    </select>
                                </div>
                                <div id="task_format" className='mb-6'>
                                    <InputLabel htmlFor="task_format" className='text-xl'>Taks Format</InputLabel> <br />
                                    <TextInput
                                    type="text"
                                    name='task_format'  
                                        value={data.task_format}
                                        onChange={(e)=>(
                                            formatChange(e)
                                        )}  
                                    className='-mt-4 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black'/>
                                </div>
                                <div className='flex w-full gap-7 mb-6'>
                                    <div id="category" className='w-2/4'>
                                        <InputLabel htmlFor="category" className='text-xl'>Category</InputLabel> <br />
                                        <select 
                                            name="category"
                                            id="" 
                                            onChange={e => ( 
                                                setData('category', e.target.value)
                                            )}
                                            value={data.category}
                                            className='-mt-4 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black'>
                                                <option value="Monthly">Monthly</option>
                                                <option value="By Request">By Request</option>
                                        </select>
                                    </div>
                                    <div id="deadline" className='w-2/4'>
                                        <InputLabel htmlFor="deadline" className='text-xl'>Deadline</InputLabel> <br />
                                        <TextInput
                                        name='deadline'
                                        type="date" 
                                        value={data.deadline}
                                        onChange={(e)=>(
                                            setData('deadline', e.target.value)
                                        )}
                                        className='-mt-4 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black'/>
                                    </div>
                                </div>
                                <div id="description" className='mb-5'>
                                    <InputLabel htmlFor="description" className='text-xl'>Description</InputLabel> <br />
                                    <textarea
                                            ref={descriptionRef}
                                            value={data.description}
                                            onChange={descriptionChange}
                                            id="textarea"
                                            name='description'
                                            placeholder="Form description"
                                            className="-mt-4 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black"
                                        />
                                </div>
                                <div className='mt-4 flex items-center justify-end'>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md border border-transparent bg-gray-900 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 active:bg-gray-900"
                                    >
                                        Edit Your task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
