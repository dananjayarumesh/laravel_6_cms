        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Add User</h4>
        </div>
        <form class="ajax-submit" action="{{route('user.store')}}" method="post" onsubmit="event.preventDefault(); crud.directSubmit(this);">
          <div class="modal-body">
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" placeholder="Name" name="name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" placeholder="Email" name="email">
            </div>

            <div class="form-group">
              <label>Role</label>
              <select class="form-control select2" name="roles[]" multiple="multiple" data-placeholder="Select" style="width: 100%;">
                @foreach($roles as $role)
                  <option value="{{$role->id}}">{{$role->name}}</option>
                @endforeach
              </select>
            </div>
            
            {{--<div class="form-group">
              <label>Username</label>
              <input type="text" class="form-control" placeholder="Email" name="username">
            </div>--}}
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" placeholder="Password" name="password">
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <input type="password" class="form-control" placeholder="Confirm Password" name="password_confirmation">
            </div>
            {{--<div class="form-group">
              <label>Permission</label>
              <select class="form-control" name="permission">
                  @foreach($permissions as $permission)
                    <option value="{{$permission->id}}">{{$permission->name}}</option>
                  @endforeach
              </select>
            </div>--}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>

      </div>


<script>
  $(function () {
    //Initialize Select2 Elements
    $('.select2').select2()
  });
</script>