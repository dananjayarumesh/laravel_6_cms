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
      User Permissions 
      <small>Manage user permissions</small>
    </h1>
  </section>

  <!-- Main content -->
  <section class="content">

    <!-- Default box -->
    <div class="box">
      <div class="box-header with-border">
       <select class="form-control select2" id="user">
         <option value="">--- Select User ---</option>
         @foreach($users as $user)
          <option value="{{$user->id}}">{{$user->name}}</option>
         @endforeach
       </select>
     </div>

     <div class="box-body">
      <table class="table table-bordered table-striped dataTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Permission Name</th>
            <th>Enabled</th>
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

@endsection

@push('script')

<!-- DataTables -->
<script src="{{asset('assets/admin/bower_components/datatables.net/js/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('assets/admin/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/admin/ladda/js/spin.min.js')}}"></script>
<script src="{{asset('assets/admin/ladda/js/ladda.min.js')}}"></script>

<script src="{{asset('assets/admin/js/crud.js')}}"></script>
<script src="{{asset('assets/admin/js/form-submit.js')}}"></script>
<script src="{{asset('assets/admin/js/user-permission.js')}}"></script>

<script>
  //Initialize Select2 Elements
  $('.select2').select2()
</script>
@endpush