        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Add Menu</h4>
        </div>
        <form action="{{route('menu.store')}}" method="post" onsubmit="event.preventDefault(); crud.directSubmit(this);">
          <div class="modal-body">
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control" placeholder="Title" name="title">
            </div>

            <div class="form-group">
              <label>Icon</label>
              <select class="form-control" name="icon">
                @foreach($icons as $icon)
                <option value="{{$icon->id}}"><i class="fa fa-fw fa-sticky-note"></i>{{$icon->icon_class}}</option>
                @endforeach
              </select>
            </div>

            <div class="form-group">
              <label>Url</label>
              <input type="text" class="form-control" placeholder="Url" name="url">
            </div>

            <div class="form-group">
              <label>Parent (level 1)</label>
              <select class="form-control" name="parent_level_1" id="parent_level_1" onchange="loadSubLevelParents(this,'#parent_level_2')">
                <option value="">--- Select ---</option>
                @foreach($main_parents as $main_parent)
                <option value="{{$main_parent->id}}">{{$main_parent->title}}</option>
                @endforeach
              </select>
            </div>

            <div class="form-group">
              <label>Parent (level 2)</label>
              <select class="form-control" name="parent_level_2" id="parent_level_2">
                <option value="">--- Select ---</option>
              </select>
            </div>

            <div class="checkbox">
              <label>
                <input type="checkbox" name="super_admin_only" value="1"> Super admin only
              </label>
            </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>

      </div>




    </script>