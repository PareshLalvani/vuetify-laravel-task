<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Functions;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use Functions;

  
    /** Login with email and password */
    public function adminLogin(Request $request)
    {
        $v = validator($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($v->fails()) {
            return $this->jsonValidation($v);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->jsonError(__('strings.invalid_credential'));
        }
        if (!Hash::check($request->password, $user->password)) {
            return $this->jsonError(__('strings.incorrect_password'));
        }
        if (!$user->is_active) {
            return $this->jsonError(__('strings.account_disabled'));
        }

        $accessTokenObject = $user->createToken('Login');
        $data = [
            'id' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'token' => $accessTokenObject->accessToken,
        ];
        return $this->jsonData('Login successfull', $data);
    }

    /** Send password link to user email */
    public function forgotPassword(Request $request)
    {
        $v = validator($request->all(), [
            'email' => 'required|email',
            'is_app_user' => 'boolean'
        ]);

        if ($v->fails()) {
            return $this->jsonValidation($v);
        }

        $user = User::where('email', $request->email);
        if(!$request->is_app_user) {
            $user = $user->whereIn('role',['A','SA']);
        } else {
            $user = $user->whereIn('role',['C','SP']);
        }
        $user = $user->first();
        if (!$user) {
            return $this->jsonError( __('strings.invalid_email'));
        }

        $password_reset = PasswordReset::where('email', $request->email)->delete();
        $reset_token = Str::random(50);
        PasswordReset::create(['email'=>$request->email,'token'=>$reset_token]);

        $is_app_user = 0;
        if($user->role=='SP' || $user->role === 'C') $is_app_user = 1;

        $user->notify(new PasswordResetEmail($reset_token, $user, $is_app_user));
        return $this->jsonSuccess(__('strings.password_reset_link_sent'));
    }

    /** Reset password by user using email link */
    public function resetPassword(Request $request)
    {
        $v = validator($request->all(), [
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
            'token' => 'required',
        ]);

        if ($v->fails()) {
            return $this->jsonValidation($v);
        }

        $user = User::where('email', $request->email)->first();
        $password_reset = PasswordReset::where('token', $request->token)->first();
        if (!$user || !$password_reset) {
            return $this->jsonError(__('strings.reset_token_not_found'));
        }
        if ($user->email != $password_reset->email) {
            return $this->jsonError(__('strings.reset_token_invalid'));
        }
        if (Hash::check($request->password, $user->password)) {
            return $this->jsonError(__('strings.same_old_new_password'));
        }

        $user->password = Hash::make($request->password);
        $user->save();
        PasswordReset::where('email', $request->email)->delete();
        
        $user->notify(new PasswordSuccessResetEmail($user));

        return $this->jsonSuccess(__('strings.password_reset_success'));
    }

    /** Logout user */
    public function logout()
    {
        if (Auth::check()) {
            Auth::user()->AauthAcessToken()->delete();
        }
        return $this->jsonSuccess('Logout successfull');
    }

    /** Change password of logged in user */
    public function changePassword(Request $request)
    {
        $v = validator($request->all(), [
            'old_password' => 'required',
            'password' => 'required|confirmed|min:6',
        ]);

        if ($v->fails()) {
            return $this->jsonValidation($v);
        }

        $user = auth()->user();
        if (!$user) {
            return $this->jsonError(__('strings.user_not_found'));
        }
        if (!Hash::check($request->old_password, $user->password)) {
            return $this->jsonError( __('strings.incorrect_old_password'));
        }
        if (Hash::check($request->password, $user->password)) {
            return $this->jsonError( __('strings.same_old_new_password'));
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return $this->jsonSuccess(__('strings.password_reset_success'));
    }

    public function getUsers(Request $request)
    {
    	$v = validator($request->all(), [
            'page' => 'integer',
            'perPage' => 'integer',
            'search' => 'nullable',
        ]);
        if ($v->fails()) return $this->jsonValidation($v);
        
        $users = User::query();
        
        //Search with name/email
        if($request->search) {
        	$search = $request->search;
        	$users->where('name','like',"%$search%")->orWhere('email','like',"%$search%");
        }


        //Total count
        $count = $users->count();

        ///Pagination
        if($request->page && $request->perPage) {
            $page = $request->page;
            $perPage = $request->perPage;
            $users = $users->skip($perPage*($page-1))->take($perPage);
        }
        $users = $users->get();
        return $this->jsonData('User list',$users);
    }

}
