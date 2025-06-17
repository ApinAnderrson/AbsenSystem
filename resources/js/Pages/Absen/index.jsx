import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Fragment, useState, useRef } from 'react';

export default function Dashboard({ absens }) {

    const deadline = new Date();
    const monthName = deadline.toLocaleString('default', { month: 'long' });
    const monthNum = String(deadline.getMonth() + 1).padStart(2, '0');
    console.log(absens[0].tanggal.split('-')[1])
    
    function kehadiran (jam_datang, jam_balek, status){
        if(jam_datang <= '09:00:00'){
            return ''
        } else if(status === 'Lembur'){
            return 'bg-green-800 text-white'
        }
        else if(jam_datang >= "09:00:01" || jam_datang <= "17:00:00"){
            return 'bg-red-800 text-white'
        } 
    }

    const [sortMonth, setSortMonth] = useState(monthNum)
    const [sortName, setSortName] = useState('')
    absens.map((e)=>{
        console.log(e.user)
    })

    let num = 1;

    return (
    <>
        <AuthenticatedLayout 
            header={
                <>
                    <h1 className="text-6xl mt-8 font-semibold leading-tight text-[#1c1c1c] mb-2">
                        Ini Absen
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
                            <select name=""
                                id=""
                                className='bg-transparent border-b-2 border-gray-500 w-64 focus:outline-none border-t-0 border-l-0 border-r-0'
                                value={sortMonth}
                                onChange={(e)=>setSortMonth(e.target.value)}
                                >
                                    <option value={monthNum} hidden>{monthName}</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                            </select>
                        </div>
                        <div className='flex gap-10 px-5 py-2'>
                            <button value='' onClick={(e)=>setSortName(e.target.value)}>All</button>
                            {Array.from(new Set(absens.map(absen => absen.user))).map((user, idx) => (
                                <button key={idx} value={user} onClick={(e)=>setSortName(e.target.value)}>{user}</button>
                            ))}
                        </div>
                        <div className='bg-white p-8'>
                        <table className="w-full text-left border-collapse ">
                                            <thead>
                                                <tr className='text-xl border-b-2'>
                                                    <th className='px-4 py-2'>No</th>
                                                    <th className=''>Nama</th>
                                                    <th className=''>Status</th>
                                                    <th className=''>Tanggal</th>
                                                    <th className=''>Jam Datang</th>
                                                    <th className=''>Jam Balek</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {[...absens]
                                                .sort((a, b) => b.tanggal.localeCompare(a.tanggal)) // or sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
                                                .map((absen, index) => (
                                                    absen.tanggal.split('-')[1] === sortMonth &&  (sortName === '' || absen.user === sortName)  && (
                                                    <Fragment key={absen.id} >
                                                        <tr id={absen.id} className={` text-lg text-left `}>
                                                            <td>
                                                                <div className={`w-12 h-8 ${kehadiran(absen.jam_datang, absen.jam_balek, absen.status)} ${absen.status === "Lembur" ? " bg-green-700" : ""} font-extrabold rounded-md items-center flex justify-center`}>
                                                                    { num++ }
                                                                </div>
                                                            </td>
                                                            <td>{ absen.user }</td>
                                                            <td>{ absen.status }</td>
                                                            <td>{ absen.tanggal }</td>
                                                            <td>{ absen.jam_datang }</td>
                                                            <td>{ absen.jam_balek }</td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                                ))} 
                                            </tbody>
                                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
        </>
    );
}
