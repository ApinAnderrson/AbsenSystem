<?php

namespace App\Http\Controllers;

use App\Models\addAccount;
use App\Http\Requests\StoreaddAccountRequest;
use App\Http\Requests\UpdateaddAccountRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AddAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('AddAccount/index', [
            'users' => $users,
            'userName' => Auth::user()->name,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreaddAccountRequest $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required', // or default to 'user
        ]);
        
        // dd($request->role);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role // or just 'user'
        ]);



        // Auth::login($user); // This Line is for Automaticlly Login when make an Account

        return Redirect::to('add_account'); // Or anywhere else
    }

    /**
     * Display the specified resource.
     */
    public function show(addAccount $addAccount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(addAccount $addAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateaddAccountRequest $request, addAccount $addAccount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(addAccount $addAccount)
    {
        dd($addAccount);
    }
}
