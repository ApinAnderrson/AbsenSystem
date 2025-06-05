<?php

namespace App\Http\Controllers;

use App\Models\newClient;
use App\Models\task;
use App\Http\Requests\StoretaskRequest;
use App\Http\Requests\UpdatetaskRequest;
use App\Models\User;
use GrahamCampbell\ResultType\Success;
use Illuminate\Console\View\Components\Task as ComponentsTask;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $tasks = task::all();
        return inertia('Task/index',[
            'tasks' => $tasks,
            'userName' => Auth::user()->name,
        ]); //Task/index ini lebih ke file yang ingin diakses itu yang mana, dan pake /
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $companies = newClient::all();
        return inertia('Task/create', [
            'users' => $users,
            'companies' => $companies,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoretaskRequest $request)
    {
        $validatedData = $request->validate([
            'task_title' => 'string|required',
            'description' => 'string|required',
            'penanggung_jawab' => 'string|required',
            'task_format' => 'string|required',
            'status' => 'string|required',
            'company' => 'string|required',
            'category' => 'string|required',
            'deadline' => 'string|required',
        ]);
        
        
        $formUuid = Str::uuid()->toString();

        task::create([
            'uuid' => $formUuid,
            'task_title' => $validatedData['task_title'],
            'description' => $validatedData['description'],
            'penanggung_jawab' => $validatedData['penanggung_jawab'],
            'task_format' => $validatedData['task_format'],
            'status' => $validatedData['status'],  // Use validated data here
            'company' => $validatedData['company'],
            'category' => $validatedData['category'],
            'deadline' => $validatedData['deadline'],
        ]);

        return redirect()->route('task.index')->with('success', 'Task saved successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(task $task)
    {
        // $task_edit = task::findOrFail($task); 
        $users = User::all();
        $companies = newClient::all();
        return inertia('Task/edit',[
            'task'=>$task,
            'users'=>$users,
            'companies'=>$companies,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatetaskRequest $request, task $task)
    {
        //

        // dd($task);
        $validated = $request->validate([
            'task_title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'penanggung_jawab' => 'nullable|string',
            'task_format' => 'nullable|string',
            'status' => 'nullable|string',
            'company' => 'nullable|string',
            'category' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);
        
        $uuid = $task->uuid;
        // dd($uuid);

        $update_task = task::where('uuid', $uuid);
        $update_task->update($validated);
        return redirect()->route('task.index')->with('success','Task Updated');
    }

    /**
     * Remove the specified resource  from storage.
     */
    public function destroy(task $task)
    {
        $uuid = $task->uuid;
        // dd($uuid);

        $del_task= task::where('uuid', $uuid);
        // $del_status= task_status::where('task_uuid', $uuid);
        $del_task->delete();
        // $del_status->delete();
        return redirect()->route('task.index')->with('message', 'Task deleted successfully.');
    }
}
