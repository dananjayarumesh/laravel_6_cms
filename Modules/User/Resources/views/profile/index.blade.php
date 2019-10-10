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
            Profile
            <small>User profile view</small>
        </h1>
    </section>

    <!-- Main content -->
    <section class="content">

        <div class="row">
            <div class="col-md-3">

                <!-- Profile Image -->
                <div class="box box-primary">
                    <div class="box-body box-profile">
                        <img class="profile-user-img img-responsive img-circle" src="{{asset('assets/admin/img/user.png')}}"
                            alt="User profile picture">

                    <h3 class="profile-username text-center">{{Auth::user()->name}}</h3>

                    @php
                        $user_role = Auth::user()->getRoleNames();
                    @endphp

                        @foreach ($user_role as $role)
                            <p class="text-muted text-center">{{$role}}</p>
                        @endforeach
                        
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->
            </div>
            <!-- /.col -->
            <div class="col-md-9">

                    <div class="box box-primary">
                            <div class="box-body box-profile">

                <form class="form-horizontal" id="user_profile">
                    <div class="form-group">
                        <label for="name" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                            <input type="hidden" class="form-control" id="userid" name="userid" value="{{Auth::user()->id}}">
                            <input type="text" class="form-control" id="name" name="name" value="{{Auth::user()->name}}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="email" name="email" value="{{Auth::user()->email}}" readonly>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password" class="col-sm-2 control-label">Password</label>

                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="con_password" class="col-sm-2 control-label">Confirm Password</label>

                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="con_password" name="con_password" placeholder="Confirm Password">
                        </div>
                    </div>
                    {{-- <div class="form-group">
                        <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                        <div class="col-sm-10">
                            <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                        </div>
                    </div> --}}
                    {{-- <div class="form-group">
                        <label for="inputSkills" class="col-sm-2 control-label">Skills</label>

                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputSkills" placeholder="Skills">
                        </div>
                    </div> --}}
                    {{-- <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>
                                </label>
                            </div>
                        </div>
                    </div> --}}
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="button" class="btn btn-info" id="profile_edit_btn" onclick="editUserprofile()">Submit</button>
                        </div>
                    </div>
                </form>
                            </div>
                    </div>
            </div>



            <!-- /.col -->
        </div>
        <!-- /.row -->

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
<!-- iCheck 1.0.1 -->
<script src="{{asset('assets/admin/plugins/iCheck/icheck.min.js')}}"></script>
<script src="{{asset('assets/admin/plugins/jquery.multi-select/jquery.multi-select.js')}}"></script>
<script src="{{asset('assets/admin/js/crud.js')}}"></script>
<script src="{{asset('assets/admin/js/form-submit.js')}}"></script>
<script src="{{asset('assets/admin/js/user-profile.js')}}"></script>

<script>
    $('#permission').multiSelect()
</script>

<script>
    // $("#profile_edit_btn").click(function(){        
    //     $("#myForm").submit(); // Submit the form
    // });
</script>

@endpush