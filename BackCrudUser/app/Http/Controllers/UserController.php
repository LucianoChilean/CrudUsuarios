<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }
 
    public function show($id)
    {
      return User::find($id);            
    }

    public function Srut($rut)
    {
        
      return DB::table('users')
      ->where('rut','=',$rut)
      ->get();

    }

    public function store(Request $request)
    {
        $user = User::create($request->all());
        return $this->registrado($request, $user);
    }

    public function update(Request $request, $id)
    {
        $user =User::findOrFail($id);
        $user->update($request->all());

        return $user;
    }

    public function delete(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return 204;
    }

    public function registrado(Request $request, $user)
    {

        $user->generatePassword();
    
        return response()->json(['data' => $user->toArray()], 201);
    }
}
