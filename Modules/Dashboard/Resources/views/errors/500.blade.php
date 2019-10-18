@extends('dashboard::layouts.master')

@push('script')
@endpush

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
   <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        {{-- <li><a href="#">Examples</a></li> --}}
        <li class="active">500 error</li>
      </ol>
    </section>

    <!-- Main content -->
   <section class="content">
      <div class="error-page">
        <h2 class="headline text-yellow"> 500</h2>

        <div class="error-content">
          <h3><i class="fa fa-warning text-yellow"></i> Oops! Something went wrong.</h3>

          <p>
        Internal system error occured. Please try again later.
          Click here to return back to <a href="{{url('/')}}">dashboard.</a>
          </p>
        </div>
        <!-- /.error-content -->
      </div>
      <!-- /.error-page -->
    <div>
</div></section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@endsection

@push('script')
@endpush