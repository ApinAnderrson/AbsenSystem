<?php

namespace App\Http\Controllers;

use App\Models\newClient;
use App\Http\Requests\StorenewClientRequest;
use App\Http\Requests\UpdatenewClientRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Number;
use Inertia\Inertia;

class NewClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = newClient::all();
        return inertia('NewClient/index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('NewClient/create',[
            
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorenewClientRequest $request)
    {
        // dd($request);
        $validated = $request->validate([
            'company_name' => 'string|required',
            'type' => 'string|required',
            'location' => 'string|required',
            'contract_tahun' => 'string|nullable',
            'contract_bulan' => 'string|required',
            'package' => 'string|required',
            'status' => 'string|required',
        ]);



        $today = now('Asia/Jakarta');

        $contract = $validated['contract_tahun'] . ' Tahun ' . $validated['contract_bulan'] . ' Bulan';

        $month = (int) $validated['contract_bulan'];
        $year = (int) $validated['contract_tahun'];

        $extraYears = intdiv($month, 12);
        $remainingMonths = $month % 12;
        $totalYears = $year + $extraYears;

        $contractEnd = now()->addYears($totalYears)->addMonths($remainingMonths);


        $status = Str::lower($validated['status']);
        $payment_month = $status === 'lunas' ?  $today->format('F') : "-";


        $clientUuid = Str::uuid()->toString();

        // dd($contractEnd->toDateString(), $payment_month);

        newClient::create([
            'uuid' => $clientUuid,
            'company_name' => $validated['company_name'],
            'type' => $validated['type'],
            'location' => $validated['location'],
            'contract' => $contract,
            'package' => $validated['package'],
            'status' => $validated['status'],
            'contract_end' => $contractEnd->toDateString(),
            'payment_month' => $payment_month,
        ]);

        return Redirect::to('new_client');
    }

    /**
     * Display the specified resource.
     */
    public function show(newClient $newClient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(newClient $newClient)
    {
        
        return inertia('NewClient/edit', [
            'clients' => $newClient,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatenewClientRequest $request, newClient $newClient)
    {
        // dd($newClient->uuid);
        $validated = $request->validate([
            'company_name' => 'string|required',
            'type' => 'string|required',
            'location' => 'string|required',
            'contract_tahun' => 'string|nullable',
            'contract_bulan' => 'string|required',
            'package' => 'string|required',
            'status' => 'string|required',
        ]);

        $today = now('Asia/Jakarta');

        $contract = $validated['contract_tahun'] . ' Tahun ' . $validated['contract_bulan'] . ' Bulan';

        $month = (int) $validated['contract_bulan'];
        $year = (int) $validated['contract_tahun'];

        $extraYears = intdiv($month, 12);
        $remainingMonths = $month % 12;
        $totalYears = $year + $extraYears;

        $contractEnd = now()->addYears($totalYears)->addMonths($remainingMonths);


        $status = Str::lower($validated['status']);
        $payment_month = $status === 'lunas' ? $today->format('F') : "-";


        $uuid = $newClient->uuid;
         

        $update_client = newClient::where('uuid', $uuid);
        $update_client->update([
            'company_name' => $validated['company_name'],
            'type' => $validated['type'],
            'location' => $validated['location'],
            'contract' => $contract,
            'package' => $validated['package'],
            'status' => $validated['status'],
            'contract_end' => $contractEnd->toDateString(),
            'payment_month' => $payment_month,
        ]);
        return Redirect::to('new_client');


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(newClient $newClient)
    {
        $uuid = $newClient->uuid;
        $newClient = newClient::where('uuid', $uuid);
        $newClient->delete();

        return Redirect::to('new_client');
    }
}
