@extends('dashboard::layouts.master')

@push('script')
<!-- DataTables -->
<link rel="stylesheet" href="{{asset('assets/admin/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css')}}">
<link rel="stylesheet" href="{{asset('assets/admin/ladda/css/ladda-themeless.min.css')}}">
<!-- iCheck for checkboxes and radio inputs -->
<link rel="stylesheet" href="{{asset('assets/admin/plugins/iCheck/all.css')}}">
<link rel="stylesheet" href="{{asset('assets/admin/plugins/jquery.multi-select/multi-select.css')}}">
@endpush

@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      Users
      <small>All users in the system</small>
    </h1>
  </section>

  <!-- Main content -->
  <section class="content">

    <!-- Default box -->
    <div class="box">
      <div class="box-header with-border">
        <button type="button" class="btn btn-primary btn-sm" onclick="crud.addClick()">Add User</button>
        {{-- <h3 class="box-title">User List</h3> --}}

    {{--     <div class="box-tools pull-right">
          <button type="button" class="btn btn-block btn-primary btn-sm" onclick="addClick()">Add Client</button>
        </div> --}}
      </div>
      <div class="box-body">
        <table class="table table-bordered table-striped dataTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              {{-- <th>Permission</th> --}}
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <!-- /.box -->
  </section>
  <!-- /.content -->
</div>
<!-- /.content-wrapper -->
@include('dashboard::includes.form-modal')

{{-- @include('user::includes.permission-modal') --}}

@endsection

@push('script')

<!-- DataTables -->
<script src="{{asset('assets/admin/bower_components/datatables.net/js/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('assets/admin/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/admin/ladda/js/spin.min.js')}}"></script>
<script src="{{asset('assets/admin/ladda/js/ladda.min.js')}}"></script>
<!-- iCheck 1.0.1 -->
<script src="{{asset('assets/admin/plugins/iCheck/icheck.min.js')}}"></script>
<script src="{{asset('assets/admin/plugins/jquery.multi-select/jquery.multi-select.js')}}"></script>
<script src="{{asset('assets/admin/js/crud.js')}}"></script>
<script src="{{asset('assets/admin/js/form-submit.js')}}"></script>
<script src="{{asset('assets/admin/js/user.js')}}"></script>

<script>
    $('#permission').multiSelect()
</script>

@endpush