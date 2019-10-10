@extends('dashboard::layouts.master')

@push('style')
<!-- DataTables -->
<link rel="stylesheet" href="{{asset('assets/admin/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css')}}">
<link rel="stylesheet" href="{{asset('assets/admin/ladda/css/ladda-themeless.min.css')}}">
<style>
	.sortable { list-style-type: none; margin: 0; padding: 0; width: 100%; }
	.sortable li { margin: 0 3px 3px 3px; padding: 0.8em; padding-left: 1.5em; font-size: 12px; }
	.sortable li span { position: absolute; margin-left: -1.3em; }
	.selected{
		background: #F49915;
		color: #FFF !important;
	}
	.selected a{
		color: #FFF !important;
	}
</style>

@endpush

@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			Menu Management
		</h1>
	</section>
	<!-- Main content -->
	<section class="content">
		<!-- Default box -->
		<div class="box">
			<div class="box-header with-border">
				<button type="button" class="btn btn-primary btn-sm" onclick="crud.addClick()">Add Menu</button>
			</div>
			<div class="box-body">
				<div class="row">
					<div class="col-md-6">
						<form method="post" id="menuProrityForm" action="{{url('menu/priority/update')}}" onsubmit="event.preventDefault(); crud.directSubmit(this);">
							 <input name="_method" type="hidden" value="PUT">
						<div class="row">
							<div class="col-md-4">
								<label>Level 1</label>
								<ul class="sortable">
									@foreach($level_1_menus as $key => $level_1_menu)
									<li class="ui-state-default {{($level_1_menu->id == $request->l_1)?'selected':''}}">
										<a href="{{url('admin/menu/' . '?l_1=' . $level_1_menu->id)}}">
											<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
											{{$level_1_menu->title}}
										</a>
										<input type="hidden" class="level1_prority" name="level1_prority[]" value="{{$level_1_menu->id}}">
									</li>
									@endforeach
								</ul>
							</div>
							<div class="col-md-4">
								<label>Level 2</label>
								<ul class="sortable">
									@foreach($level_2_menus as $key => $level_2_menu)
									<li class="ui-state-default {{($level_2_menu->id == $request->l_2)?'selected':''}} level2-tile">
										<a href="{{url('admin/menu/' . '?l_1=' . $request->l_1 .'&l_2=' . $level_2_menu->id)}}">
											<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
											{{$level_2_menu->title}}
										</a>
										<input type="hidden" class="level2_prority" name="level2_prority[]" value="{{$level_2_menu->id}}">
									</li>
									@endforeach
								</ul>
							</div>
							<div class="col-md-4">
								<label>Level 3</label>
								<ul class="sortable">
									@foreach($level_3_menus as $key => $level_3_menu)
									<li class="ui-state-default {{($level_3_menu->id == $request->l_3)?'selected':''}} level3-tile">
										<a href="{{url('admin/menu/' . '?l_1=' . $request->l_1 .'&l_2=' . $request->l_2 . '&l_3=' . $level_3_menu->id)}}">
											<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
											{{$level_3_menu->title}}
										</a>
										<input type="hidden" class="level3_prority" name="level3_prority[]" value="{{$level_3_menu->id}}">
									</li>
									@endforeach
								</ul>
							</div>
						</div>
						<button type="submit" style="display: none;"></button>
						</form>
					</div>
					<div class="col-md-6">
						{!! $edit_view !!}
					</div>
				</div>
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

<script>
	$( function() {
		$( ".sortable" ).each(function() {
			$( this ).sortable({
				connectWith: this,
				deactivate: function( event, ui ) {
					$('#menuProrityForm').submit();
				}
		});
		});
	} );

	$(function () {
    //Initialize Select2 Elements
    $('.select2').select2()
  });
</script>


<!-- DataTables -->
<script src="{{asset('assets/admin/bower_components/datatables.net/js/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('assets/admin/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/admin/ladda/js/spin.min.js')}}"></script>
<script src="{{asset('assets/admin/ladda/js/ladda.min.js')}}"></script>
<script src="{{asset('assets/admin/js/crud.js')}}"></script>
<script src="{{asset('assets/admin/js/form-submit.js')}}"></script>
<script src="{{asset('assets/admin/js/menu.js')}}"></script>


<script type="text/javascript">
	function successHandler(form,data,method) {
		if(method == 'delete'){
			window.location.href = "{{url('menu')}}";
		}else{
			location.reload();
		}
		
	}

	function menuStatusChange(menuId){
		$.ajax({
			url: 'menu/menuStatusChange',
			method: 'post',
			dataType: 'json',
			data: {
				'menuId': menuId
			},
			beforeSend: function (){},
			success: function (data) {
				notify.success(data.msg);
				location.reload();
			},
			error: function(data){
			$.each( data.responseJSON, function(index, row ){
				console.log(row);
				notify.error(row);
			});
			}
		});
	}
</script>
@endpush