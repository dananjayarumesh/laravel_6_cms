<div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Edit User</h4>
        </div>
        <form action="{{route('user.update',['id'=>$user->id])}}" method="post" onsubmit="event.preventDefault(); crud.directSubmit(this);">
            <div class="modal-body">
              <input name="_method" type="hidden" value="PUT">
            
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Name" name="name" value="{{$user->name}}">
              </div>
              <div class="form-group">
                <label>Role</label>
                <select class="form-control select2" name="roles[]" multiple="multiple" data-placeholder="Select" style="width: 100%;">
                  @foreach($roles as $role)
                    @if(is_array($roleName) && in_array($role->name, $roleName))
                      <option value="{{$role->name}}" selected>{{$role->name}}</option>
                    @else
                      <option value="{{$role->name}}">{{$role->name}}</option>
                    @endif
                  @endforeach
                </select>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" name="password">
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control" placeholder="Confirm Password" name="conpassword">
              </div>
            </div>
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