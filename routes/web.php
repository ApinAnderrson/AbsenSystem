<?php

use App\Http\Controllers\AbsenController;
use App\Http\Controllers\AddAccountController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\NewClientController;
use App\Http\Controllers\PersonalDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskStatusController;
use App\Http\Controllers\UpdateTaskSubmit;
use App\Models\absen;
use App\Models\newClient;
use App\Models\task;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth','verified'])->group(function() {
    Route::get('/dashboard', function () {
        $absens = absen::all();
        $clients = newClient::all();
        $tasks = task::all();
        return Inertia::render('Dashboard',[
            'userName' => Auth::user()->name,
            'absens' => $absens,
            'clients' => $clients,
            'tasks' => $tasks,
        ]);
    })->name('dashboard');
    
    Route::resource('task', TaskController::class);


    Route::resource('/result', ResultController::class);
    
    Route::resource('/personal_dashboard', PersonalDashboardController::class);
    Route::resource('/absence', AbsenController::class);
    Route::get('rejected', function ()  {
        $tasks = task::all();
        return Inertia::render('Task/rejected', [
            'userName' => Auth::user()->name,
            'tasks' => $tasks
        ]);
    })->name('rejected');
    Route::get('approved', function ()  {
        $tasks = Task::with('result')->get();
        return Inertia::render('Task/approved', [
            'userName' => Auth::user()->name,
            'tasks' => $tasks
        ]);
    })->name('approved');
});


Route::middleware(['auth', 'admin'])->group(function(){
    Route::get('add_account', [AddAccountController::class, 'index'])->name('add_account.index');
    Route::post('add_account', [AddAccountController::class, 'store'])->name('add_account.store');
    Route::get('add_account/{user}/edit', [ProfileController::class, 'edit'])->name('add_account.edit');
    Route::put('add_account/{user}', [ProfileController::class, 'update'])->name('add_account.update');
    Route::delete('add_account/{user}', [ProfileController::class, 'destroy'])->name('add_account.destroy');

    Route::resource('new_client', NewClientController::class);

    Route::resource('result', ResultController::class);
    Route::put('result', [UpdateTaskSubmit::class, 'update'])->name('update_task_submit.update');
    // Route::put('result/{result}', [ResultController::class, 'update']) -> name('result.update');
});



// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
