<?php

namespace App\Http\Controllers;

use App\Models\absen;
use App\Http\Requests\StoreabsenRequest;
use App\Http\Requests\UpdateabsenRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Redirect;
use PhpParser\Node\Stmt\Return_;

class AbsenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreabsenRequest $request, User $user)
    {
        $user = Auth::user();
        $nowDate = now('Asia/Jakarta')->toDateString();
        $nowTime = now('Asia/Jakarta')->toTimeString();
        $validated = $request->validate([
            'absence' =>  'required|string'
        ]);
        //check is that you already absen today
        $todayAbsen  = absen::where('user', $user->name)
                            ->where('tanggal', $nowDate)
                            ->first();

        if($validated['absence'] !== 'Balek') {
            if(!$todayAbsen){
                absen::create([
                    'user' => $user->name,
                    'status' => $validated['absence'],
                    'tanggal' => $nowDate,
                    'jam_datang' => $nowTime,
                    'jam_balek' => $validated['absence'] === "Hadir" ? null : $nowTime,
                ]);
            } else {
            return Redirect::back()->withErrors(['absence' => 'You already submitted Hadir today.']);
            }
        }

        if($validated['absence'] === 'Balek'){
            if(!$todayAbsen){
                return Redirect::back()->withErrors(['absence' => 'You already submitted Hadir today.']);
                
            }else{
                $todayAbsen->update([
                    'jam_balek' => $nowTime,
                ]);
            ;
        }
        }
        

        // dd($validated, $nowDate, $now2, $user->name);
        
        return Redirect::to('');

    }

    /**
     * Display the specified resource.
     */
    public function show(absen $absen)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(absen $absen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateabsenRequest $request, absen $absen)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(absen $absen)
    {
        //
    }
}
