import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';


export default function edit({ clients }) {

    const str = clients.contract;
    const words = str.split(" ");


    // Output: ['Hello', 'World', 'React']

    const { data, setData, put, processing, errors, reset } = useForm({
        company_name: clients?.company_name||'',
        type: clients?.type||'',
        location: clients?.location||'',
        contract_tahun: words[0],
        contract_bulan: words[2],
        package: clients?.package||'',
        status: clients?.status||'',
    });

    

    const submit = (e) => {
        e.preventDefault();

        put(route('new_client.update', clients.uuid), {
            onSuccess: () => {
                alert('Client updated!');
              }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h1 className="text-6xl flex justify-center mt-8 font-semibold leading-tight text-[#1c1c1c] mb-2">
                        Wow! Let's Edit Our Client 🥳🎉✨
                    </h1>
                    <p className='text-2xl flex justify-center'>
                        The more client we get the better, so add our client now!
                    </p>
                </>
            }
        >
            <div className="flex flex-col items-center w-7xl pt-6 sm:justify-center sm:pt-0 ">
                            
                            <div className="max-w-7xl w-full flex mt-6 gap-5 justify-center">
                                <div className="w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-xl sm:rounded-lg">
                                    <Head title="New Client" />
            
                                    <form onSubmit={submit}>
                                        <div className='mb-6 mt-3'>
                                            <InputLabel htmlFor="company_name" value="Company Name" />
            
                                            <TextInput
                                                id="company_name"
                                                name="company_name"
                                                value={data.company_name}
                                                className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400"
                                                autoComplete="company_name"
                                                onChange={(e) => setData('company_name', e.target.value)}
                                                required
                                            />
            
                                            <InputError message={errors.company_name} className="mt-2" />
                                        </div>
            
                                        <div className='mb-6'>
                                            <InputLabel htmlFor="package" value="What Package" />
            
                                            <select
                                                id="package"
                                                name="package"
                                                value={data.package}
                                                className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400 outline-none focus:ring-0 focus:border-black"
                                                autoComplete="package"
                                                onChange={(e) => setData('package', e.target.value)}
                                                required
                                            >
                                                <option value="Protall" >Protall</option>
                                                <option value="Progrand">Progrand</option>
                                                <option value="Proventi">Proventi</option>
                                                <option value="Promax">Promax</option>
                                                <option value="Company Profile">Company Profile</option>
                                                <option value="HR System">HR System</option>
                                                <option value="Invitation Link">Invitation Link</option>
                                                <option value="Application">Application</option>
                                                <option value="Photo & Video">Photo & Video</option>
                                                <option value="Adds On">Adds On</option>
                                            </select>
            
                                            <InputError message={errors.package} className="mt-2" />
                                        </div>
            
                                        <div className="mb-6">
                                            <InputLabel htmlFor="location" value="Business Location" />
            
                                            <TextInput
                                                id="location"
                                                name="location"
                                                value={data.location}
                                                className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400"
                                                autoComplete="location"
                                                onChange={(e) => setData('location', e.target.value)}
                                                required
                                            />
            
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>
            
                                        <div className="mb-6">
                                            <InputLabel htmlFor="contract" value="Contract" />
            
                                            <div className='flex items-end justify-between'>
                                                <input
                                                    id="contract"
                                                    name="contract"
                                                    value={data.contract_tahun}
                                                    className="mt-1 block bg-transparent shadow-sm border-0 border-b border-gray-400 focus:border-black focus:ring-0 outline-none active:border-b"
                                                    type="number"
                                                    onChange={(e) => setData('contract_tahun', e.target.value)}
                                                /> 
                                                Tahun
                                                <input
                                                    id="contract"
                                                    name="contract"
                                                    value={data.contract_bulan}
                                                    className="mt-1 block bg-transparent shadow-sm border-0 border-b border-gray-400 focus:border-black focus:ring-0 outline-none active:border-b "
                                                    autoComplete="contract"
                                                    type="number"
                                                    max="11"
                                                    onChange={(e) => setData('contract_bulan', e.target.value)}
                                                /> 
                                                <div className='flex align-bottom'>Bulan</div>
                                            </div>
                                            
            
                                            <InputError message={errors.contract} className="mt-2" />
                                        </div>
            
                                        <div className="mb-6">
                                            <InputLabel
                                                htmlFor="type"
                                                value="Type Of Business"
                                            />
            
                                            <TextInput
                                                id="type"
                                                name="type"
                                                value={data.type}
                                                className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400"
                                                autoComplete="type"
                                                onChange={(e) =>
                                                    setData('type', e.target.value)
                                                }
                                                required
                                            />
            
                                            <InputError
                                                message={errors.type}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <InputLabel
                                                htmlFor="status"
                                                value="Status"
                                            />
            
                                            <TextInput
                                                id="status"
                                                name="status"
                                                value={data.status}
                                                className="mt-1 block w-full bg-transparent border-0 border-b border-gray-400"
                                                autoComplete="status"
                                                onChange={(e) =>
                                                    setData('status', e.target.value)
                                                }
                                                required
                                            />
            
                                            <InputError
                                                message={errors.status}
                                                className="mt-2"
                                            />
                                        </div>
                                        
            
                                        <div className="mt-4 flex items-center justify-end">
            
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
