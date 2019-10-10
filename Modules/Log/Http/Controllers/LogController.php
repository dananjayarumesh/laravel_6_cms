<?php

namespace Modules\Log\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Log\Entities\Log;
use Modules\Log\Entities\LogType;
use App\User;
use DataTables;

class LogController extends Controller
{

   public function index(Request $request)
    {
        $logs = Log::orderBy('id', 'desc')
                ->where(function ($q) use ($request){
                    if($request->log_type){
                        $q->where('log_type',$request->log_type);
                    }
                    if($request->user){
                        $q->where('user_id',$request->user);
                    }
                })
                ->paginate(100)->appends(request()->query());
        $log_types = LogType::all();
        $users = User::all();
        return view('log::index',compact('logs','log_types','users','request'));
    }

    public function data(Request $request){

        $data = Log::orderBy('id', 'desc')
                ->where(function($q) use ($request){

                    if($request){

                    }

                })
                ->get();

        return DataTables::make($data)
        ->addIndexColumn()
        ->editColumn('created_by', function ($row) {
            return ($row->user_id)?$row->createdBy->name:'';
        })
        ->editColumn('created_at', function ($row) {
            return date(DATETIMEFORMAT, strtotime($row->created_at));
        })
        ->editColumn('description', function ($row) {
            if($row->logtypes){
                return $row->logtypes->name;
            }
        })
        ->rawColumns(['created_by','action','created_at','description'])
        ->make(true); 
    }
}
