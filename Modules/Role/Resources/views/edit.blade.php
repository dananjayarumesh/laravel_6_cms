        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Add Role</h4>
        </div>
        <form action="{{route('role.update',['id'=>$role->id])}}" method="post" onsubmit="event.preventDefault(); crud.directSubmit(this);">
          <div class="modal-body">
            <input name="_method" type="hidden" value="PUT">
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" placeholder="Name" name="name" value="{{$role->name}}">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
