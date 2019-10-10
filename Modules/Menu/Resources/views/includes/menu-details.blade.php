<form action="{{route('menu.update',['menu'=>$menu->id])}}" method="post" onsubmit="event.preventDefault(); crud.directSubmit(this);">
  <input name="_method" type="hidden" value="PUT">
  <div class="modal-body">
    <div class="form-group">
      <label>Title</label>
      <input type="text" name="title" class="form-control" placeholder="Title" name="title" value="{{$menu->title}}">
    </div>
    <div class="form-group">
      <label>Icon</label>
      <select class="form-control select2" name="icon">
        @foreach($icons as $icon)
        <option value="{{$icon->id}}" {{$menu->menu_icon_id == $icon->id ? 'selected' : '' }}>
          <i class="fa fa-fw fa-sticky-note"></i>
          {{$icon->icon_class}}
        </option>
        @endforeach
      </select>
    </div>
    <div class="form-group">
      <label>Url</label>
      <input type="text" class="form-control" placeholder="Url" name="url" value="{{$menu->url}}">
    </div>
    <div class="form-group">
      <label>Permissions</label>
      @php
      $assigned_permissions = $menu->permissions ? explode(',', $menu->permissions) : [];
      @endphp
      <select class="form-control select2" name="permissions[]" multiple="multiple" data-placeholder="Select" style="width: 100%;">
        @foreach($permissions as $permission)
        <option value="{{$permission->name}}" {{in_array($permission->name, $assigned_permissions) ? 'selected' : ''}}>{{$permission->name}}</option>
        @endforeach
      </select>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox" name="super_admin_only" {{($menu->super_admin == 1 ? 'checked' : '')}} value="1"> Super admin only
      </label>
    </div>
  </div>
  <div class="modal-footer">
    <button type="submit" class="btn btn-primary">Update</button>
    <button type="button" class="btn btn-danger" data-id="{{$menu->id}}" onclick="crud.deleteClick(this)">Delete</button>
    @if($menu->status == 1)
    <button type="button" class="btn btn-warning" onclick="menuStatusChange({{$menu->id}})">Disable</button>
    @elseif($menu->status == 0) 
    <button type="button" class="btn btn-success" onclick="menuStatusChange({{$menu->id}})">Enable</button>
    @endif
    
  </div>
</form>