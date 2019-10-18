<?php

namespace Modules\User\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->route('user');

        if($id == 0){
            $rules = [
                'name' => 'required|max:255',
                //'username' => 'required|unique:users,username,'.$id. ',id',
                'email' => 'required|email|unique:admins,email,'.$id. ',id',
                'password' => 'required|min:6|confirmed',
                'roles' => 'required|array',
            ];
        }else {
            $rules = [
                'name' => 'required|max:255',
                'password' => 'nullable|min:6|confirmed',
                'roles' => 'required|array',
            ];
        }

        

        

          return $rules;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}
