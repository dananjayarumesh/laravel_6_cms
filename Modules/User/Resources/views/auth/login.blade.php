@extends('dashboard::layouts.auth')

@section('content')




<div class="login-box">
  <div class="login-logo">
   <b>Admin</b>Panel
 </div>
 <!-- /.login-logo -->
 <div class="login-box-body">
  <p class="login-box-msg">Sign in to start your session</p>

  <form method="POST" action="{{ route('login') }}" aria-label="{{ __('Login') }}">
    {{ csrf_field() }}

    <div class="form-group has-feedback">
      <input type="email" name="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" placeholder="Email" value="{{ old('email') }}">
      <span class="glyphicon glyphicon-envelope form-control-feedback"></span>

      @if ($errors->has('email'))
      <span class="invalid-feedback" role="alert">
        <strong>{{ $errors->first('email') }}</strong>
      </span>
      @endif

    </div>


    <div class="form-group has-feedback">
      <input type="password" name="password" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" placeholder="Password" value="{{ old('password') }}">
      <span class="glyphicon glyphicon-lock form-control-feedback"></span>

      @if ($errors->has('password'))
      <span class="invalid-feedback" role="alert">
        <strong>{{ $errors->first('password') }}</strong>
      </span>
      @endif

    </div>


    <div class="form-group row">
      <div class="col-md-6 offset-md-4">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

          <label class="form-check-label" for="remember">
            {{ __('Remember Me') }}
          </label>
        </div>
      </div>
    </div>

    <div class="form-group row mb-0">
      <div class="col-md-8 offset-md-4">
        <button type="submit" class="btn btn-primary">
          {{ __('Login') }}
        </button>

                              {{--   <a class="btn btn-link" href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                  </a> --}}
                                </div>
                              </div>
                            </form>
{{--     <div class="social-auth-links text-center">
      <p>- OR -</p>
      <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>
      </div> --}}
      <!-- /.social-auth-links -->

      {{-- <a href="#">I forgot my password</a><br> --}}
      {{-- <a href="register.html" class="text-center">Register a new membership</a> --}}

    </div>
    <!-- /.login-box-body -->
  </div>
  <!-- /.login-box -->

  @endsection