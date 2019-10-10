 <!DOCTYPE html>
 <html>
 <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Admin</title>

  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="{{asset('assets/admin/bower_components/bootstrap/dist/css/bootstrap.min.css')}}">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{asset('assets/admin/bower_components/font-awesome/css/font-awesome.min.css')}}">
  <!-- Ionicons -->
  <link rel="stylesheet" href="{{asset('assets/admin/bower_components/Ionicons/css/ionicons.min.css')}}">
  <link rel="stylesheet" href="{{asset('assets/admin/bower_components/select2/dist/css/select2.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{asset('assets/admin/dist/css/AdminLTE.min.css')}}">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
   folder instead of downloading all of them to reduce the load. -->
   <link rel="stylesheet" href="{{asset('assets/admin/dist/css/skins/_all-skins.min.css')}}">

   <link href="{{asset('assets/admin/jquery-ui/jquery-ui.min.css')}}" rel="stylesheet">

   <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
   <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- Google Font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

<style type="text/css">
  .loading{
    background-image: url('assets/img/loading.gif');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 130px 130px;
    /*height: 200px;*/
  }
  .content-title{
    padding: 3px;
    font-size: 16px;
    font-weight: bold;
    background: #eee;
    text-align: center;
    margin-bottom: 10px;
  }

  .logo{
    background-color: #232E33 !important;
    color: #ffffff !important;
    border-right: 0px !important;
  }
/*  .invalid-feedback{
    color: #bf5353 !important;
  }*/
 /* .skin-black .main-header .navbar>.sidebar-toggle , .skin-black .main-header .navbar .nav>li>a{
    color: #ffffff !important;
  }*/
</style>
@stack('style')
</head>
<body class="hold-transition skin-black fixed sidebar-mini">
  <!-- Site wrapper -->
  <div class="wrapper">

    @include('dashboard::includes.header')
    @include('dashboard::includes.sidebar')

    @yield('content')

    @include('dashboard::includes.footer')
    <div class="custom-container"></div>
  </div>
  <!-- ./wrapper -->

  <!-- jQuery 3 -->
  <script src="{{asset('assets/admin/bower_components/jquery/dist/jquery.min.js')}}"></script>
  <!-- Bootstrap 3.3.7 -->
  <script src="{{asset('assets/admin/bower_components/bootstrap/dist/js/bootstrap.min.js')}}"></script>
  <!-- SlimScroll -->
  <script src="{{asset('assets/admin/bower_components/jquery-slimscroll/jquery.slimscroll.min.js')}}"></script>
  <!-- FastClick -->
  <script src="{{asset('assets/admin/bower_components/fastclick/lib/fastclick.js')}}"></script>

  <script src="{{asset('assets/admin/bower_components/select2/dist/js/select2.full.min.js')}}"></script>

  <!-- AdminLTE App -->
  <script src="{{asset('assets/admin/dist/js/adminlte.min.js')}}"></script>

  {{-- <script src="external/jquery/jquery.js"></script> --}}
  <script src="{{asset('assets/admin/jquery-ui/jquery-ui.min.js')}}"></script>
  <script src="{{ asset('assets/admin/plugins/bootstrap-notify/bootstrap-notify.min.js') }}" charset="utf-8"></script>
  <script src="{{ asset('assets/admin/js/message-notify.js') }}" charset="utf-8"></script>
<body>
<script>
  $(document).ready(function () {
    $('.sidebar-menu').tree()
  })
</script>

@stack('script')
<script type="text/javascript">
 $.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
</script>

</body>
</html>
