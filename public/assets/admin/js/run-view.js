$(document).ready(function(){

	$('#addSection').click(function(){
		$('#mainProcess').prop('disabled',true);
		var section_id = $('#mainProcess').val();
		if(section_id == ""){
			return;
		}
		var section_name = $('#mainProcess').find('option:selected').text();
		var section_parents = $('#parentProcess').val();
		var section_template = getSectionTemplate(section_id,section_name,section_parents);

		addSection(section_parents,section_template);

		sortableInit();
		$('#addSectionModal').modal('hide');
	});

	$('#addProcess').click(function(){
		var main_process = $('#addProcessMainProcessId').val();
		var sub_processes = $('#subProcess').val();

		var exist_processes = getSectionExistProcesses(main_process);	

		var output = '';
		var new_processes = [];
		$.each( sub_processes, function( index, row ){
			var row_array = row.split(",");
			new_processes.push(parseInt(row_array[0]));
			var exist_check = $.inArray( parseInt(row_array[0]), exist_processes );
			if(exist_check <= -1){
				output += '<li class="ui-state-default process-li-'+row_array[0]+'"><input class="process-id-input" name="section_processes['+main_process+'][]" type="hidden" value="'+row_array[0]+'">'+row_array[1]+'</li>';
			}
		});

		$.each( exist_processes, function( index, row ){
			var exist_check = $.inArray( row, new_processes );
			if(exist_check == -1){
				$('#section'+main_process+' .process-li-'+row).remove();
			}
		});

		$('.sortable-'+main_process).append(output);

		$('#addProcessModel').modal('hide');
	});

	$('#addSectionModal').on('shown.bs.modal', function () {
		
		//get exist sections
		var exist_sections = [];
		var exist_sections_names = [];
		$('.section-id').each(function(){
			exist_sections.push(parseInt($(this).val()));
			exist_sections_names.push($(this).attr('data-name'));
		});
// console.log(exist_sections);
		// alert('test');
		$.ajax({
			url: '../main-process/getMainProcesses',
			method: 'post',
			dataType: 'json',
			success: function (data) {

				var options = '';
				$.each( data, function( index, row ){
					var exist_check = $.inArray( row.id, exist_sections );
					if(exist_check > -1){
						// options += '<option disabled value="'+row.id+'">'+row.name+'</option>';
					}else{
						options += '<option value="'+row.id+'">'+row.name+'</option>';
					}
				});
			// console.log(options);

			$('#mainProcess').html(options);
			$('#mainProcess').prop('disabled',false);
		},
		error: function(data){
		}
	});



		//set exist sections to parent select dropdown
		var options = '';
		$.each( exist_sections, function( index, row ){
			options += '<option value="'+row+'">'+exist_sections_names[index]+'</option>';
			$('#parentProcess').html(options);
		});

	});

})

function addSection(section_parents,section_template) {

	var section_parents_array = section_parents;
	var max_parent_index = -1;
	var parent_index;
	for(var i=0, len=section_parents_array.length; i < len; i++){
		parent_index = $( "#sectionContent" ).children().index( $('#section'+section_parents_array[i]));	
		if(parseInt(parent_index) > max_parent_index){
			max_parent_index = parent_index;
		}
	}

	if(max_parent_index == -1){
		$('#sectionContent').append(section_template);
	}else{
		$( "#sectionContent .section-column:nth-child("+(parseInt(max_parent_index)+1)+")" ).after(section_template);
	}
	
}

function getSectionTemplate(section_id,section_name,section_parents) {
	var template = '<div id="section'+section_id+'" class="column section-column section-'+section_id+'">'+
	'<input type="hidden" class="section-id" name="sections[]" data-name="'+section_name+'" value="'+section_id+'">'+
	'<input type="hidden" class="section-parents" name="section_parents[]" value="'+section_parents+'">'+
	'<div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">'+
	'<div class="portlet-header ui-widget-header ui-corner-all">'+
	'<div class="btn-group pull-right">'+
	'<button type="button" class="btn btn-default btn-xs" onclick="addSectionProcess('+section_id+')">Add Process</button>'+
	'<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">'+
	'<span class="caret"></span>'+
	'<span class="sr-only">Toggle Dropdown</span>'+
	'</button>'+
	'<ul class="dropdown-menu" role="menu">'+
	'<li><a href="#">Action</a></li>'+
	'<li><a href="#">Another action</a></li>'+
	'<li><a href="#">Something else here</a></li>'+
	'<li class="divider"></li>'+
	'<li><a href="#">Separated link</a></li>'+
	'</ul>'+
	'</div>'+
	section_name+'</div>'+
	'<div class="portlet-content">'+
	'<ul class="sortable sortable-'+section_id+'">'+
	'</ul>'+
	'<div>'+
	'</div>'+
	'</div>'+
	'</div>'+
	'</div>';

	return template;
}

function getSectionExistProcesses(main_process) {
	var exist_processes = [];
	$('#section'+main_process+' .process-id-input').each(function(){
		exist_processes.push(parseInt($(this).val()));
	});
	return exist_processes;
}

function getExistSections() {
	var exist_sections = [];
	$('.section-id').each(function(){
		exist_sections.push($(this).val());
	});

	$('#section'+main_process+' .process-id-input').each(function(){
		exist_processes.push(parseInt($(this).val()));
	});
	return exist_processes;
}

function addSectionProcess(main_process) {

	var exist_processes = getSectionExistProcesses(main_process);

	$.ajax({
		url: '../sub-process/getSubProcessByMainProcess',
		method: 'post',
		data: {
			'main_process': main_process
		},
		dataType: 'json',
		success: function (data) {

			var options = '';
			$.each( data, function( index, row ){
				var exist_check = $.inArray( row.id, exist_processes );
				if(exist_check > -1){
					options += '<option selected value="'+row.id+','+row.name+'">'+row.name+'</option>';
				}else{
					options += '<option value="'+row.id+','+row.name+'">'+row.name+'</option>';
				}
			});

			$('#subProcess').html(options);
			$('#addProcessMainProcessId').val(main_process);

			$('#addProcessModel').modal('show');
			$('.multi-select').multiSelect('refresh');

		},
		error: function(data){
			alert('sss');
		}
	});

}

function sortableInit() {
	$( ".sortable" ).each(function() {
		$( this ).sortable({
			connectWith: this
		}).disableSelection();
	});
}