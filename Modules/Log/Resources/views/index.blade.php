@extends('dashboard::layouts.master')

@push('script')
<!-- DataTables -->
<link rel="stylesheet" href="{{asset('assets/admin/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css')}}">
<link rel="stylesheet" href="{{asset('assets/admin/ladda/css/ladda-themeless.min.css')}}">
@endpush

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Activity Logs
        <small>All Activity logs in the system</small>
      </h1>
      
    </section>

    <!-- Main content -->
    <section class="content">

        <div class="box">
          <div class="box-body">
            <form id="filterForm" method="GET">
      
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Log Types:</label>
      
                    <select name="log_type" id="log_types" class="form-control select2" style="">
                        <option value="">--Select Types--</option>
                      @foreach($log_types as $log_type)
                        <option {{$request->log_type == $log_type->id ? "selected" : ""}} value="{{$log_type->id}}">{{$log_type->name}}</option>
                      @endforeach
                    </select>
                  </div>
      
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>User:</label>
      
                    <select name="user" id="username" class="form-control select2" style="">
                        <option value="">--Select User--</option>
                      @foreach($users as $user)
                        <option {{$request->user == $user->id ? "selected" : ""}} value="{{$user->id}}">{{$user->name}}</option>
                      @endforeach
                    </select>
                  </div>
                </div>
      
                <div class="col-md-3">
                  <div class="row">
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-primary" style="margin-top: 25px">Search</button>
                    </div>
                    {{-- <div class="col-md-2">
                        <button type="submit" class="btn btn-primary" style="margin-top: 25px">Search</button>
                    </div> --}}
                  </div>
                </div>
              </div>
      
      
            </form>
          </div>
        </div>

      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                    title="Collapse">
              <i class="fa fa-minus"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
              <i class="fa fa-times"></i></button>
          </div>
        </div>
        <div class="box-body">
          <table class="table table-bordered table-striped dataTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Log</th>
                <th>User</th>
                <th>References</th>
                <th>IP</th>
                <th>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              @php
                  $count = 1;
              @endphp
              @foreach ($logs as $key => $log)
              @php
                  if($log->user_id){
                    $username = $log->createdBy->name;
                  }
              @endphp
                  <tr>
                    <td>{{$logs->firstItem() + $key}}</td>
                    <td>{{$log->logtypes->name}}</td>
                    <td>{{$username}}</td>
                    <td>{{$log->reference}}</td>
                    <td>{{$log->ip}}</td>
                    <td>{{date(DATETIMEFORMAT, strtotime($log->created_at))}}</td>
                  </tr>
                  @php
                      $count++;
                  @endphp
              @endforeach
              
            </tbody>
          </table>
          <div class="pull-right">
              {{ $logs->links() }}
          </div>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

@endsection

@push('script')

<!-- DataTables -->
<script src="{{asset('assets/admin/bower_components/datatables.net/js/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('assets/admin/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/admin/ladda/js/spin.min.js')}}"></script>
<script src="{{asset('assets/admin/ladda/js/ladda.min.js')}}"></script>
<script src="{{asset('assets/admin/js/crud.js')}}"></script>
<script src="{{asset('assets/admin/js/form-submit.js')}}"></script>

<script>
  $('.select2').select2();
</script>

@endpush
