$(document).ready(function(){

	$('#addSection').click(function(){
		$('#mainProcess').prop('disabled',true);
		var section_id = $('#mainProcess').val();
		if(section_id == ""){
			return;
		}

		var sub_section_id = $('#main_sub_process').val();
		// if(sub_section_id == ""){
		// 	return;
		// }
		var section_name = $('#mainProcess').find('option:selected').text();
		var section_parents = $('#parentProcess').val();

		var sub_section_name = $('#main_sub_process').find('option:selected').text();

		var start_date = $('#sectionStartDate').val();
		var end_date = $('#sectionEndDate').val();

		console.log(start_date);

		if( $('#main_sub_process').has('option').length > 0 ) {
			if(sub_section_id == ""){
				return notify.error('Please Select main sub process.');
			}
		}

		if(start_date == "" || end_date == ""){
			return notify.error('Start date and end date fields required');
		}

		var sdat = new Date(start_date.split("-").reverse().join("-")).getTime();

		var edat = new Date(end_date.split("-").reverse().join("-")).getTime();

		if(edat < sdat){
			return notify.error('Start date must be less than End date.');
		}else if(sdat == edat){
			return notify.error('Start date cannot be equale End date.');
		}

		var section_template = getSectionTemplate(section_id,section_name,sub_section_id,sub_section_name,section_parents,start_date,end_date);

		alert(section_template);

		addSection(section_parents,section_template);

		sortableInit();
		$('#addSectionModal').modal('hide');
	});

	$("#addProcessMachine").click(function(event){
		var section_id = $('#addMachineMainProcessId').val();
		var sub_process_id = $('#addMachineSubProcessId').val();
		alert(sub_process_id);
		var machine_id = $('#machineDropdown').val();
		var machine_name = $('#machineDropdown').find('option:selected').text();

		var machine_exists = $('.section-'+section_id+'-process-'+sub_process_id+'-machine-'+machine_id).length;
		if(machine_exists){
			notify.error('Machine already added');
		}else{
			$('.process-li-'+sub_process_id+ ' .machine-list').append('<div><input class="section-'+section_id+'-process-'+sub_process_id+'-machine-'+machine_id+'" type="hidden" name="machines['+section_id+']['+sub_process_id+'][]" value="'+machine_id+'"> '+machine_name+'&nbsp;&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" onclick="removeProcessItems(this)"></i></div>');
			$('#addProcessMachineModel').modal('hide');
		}
	});

	$('#addProcessLabor').click(function() {
		var section_id = $('#addLaborMainProcessId').val();
		var sub_process_id = $('#addLaborSubProcessId').val();
		var labor_id = $('#laborDropdown').val();
		var labor_name = $('#laborDropdown').find('option:selected').text();

		var labor_exists = $('.section-'+section_id+'-process-'+sub_process_id+'-labor-'+labor_id).length;

		if(labor_exists){
			notify.error('Labor already added');
		}else{
			$('.process-li-'+sub_process_id+ ' .labor-list').append('<div><input class="section-'+section_id+'-process-'+sub_process_id+'-labor-'+labor_id+'" type="hidden" name="labors['+section_id+']['+sub_process_id+'][]" value="'+labor_id+'"> '+labor_name+'&nbsp;&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" onclick="removeProcessItems(this)"></i></div>');
			$('#addProcessLaborModel').modal('hide');
		}
	})

	$('#addProcessStock').click(function() {

		var error_free = true;
		var element =$("#stockQty");
		var error_element=$("span", element.parent());
		if (!$("#stockQty").val()){
			error_element.removeClass("error").addClass("error_show"); 
			error_free=false;
		}
		else{
			error_element.removeClass("error_show").addClass("error");
			var sub_process_id = $('#addStockSubProcessId').val();
			var stock_id = $('#stockDropdown').val();
			var stock_name = $('#stockDropdown').find('option:selected').text();
			var qty = $('#stockQty').val();

			$('.process-li-'+sub_process_id+ ' .stock-list').append('<div><input type="hidden" name="stocks['+sub_process_id+'][]" value="'+stock_id+'"><input type="hidden" name="stock_qtys['+sub_process_id+'][]" value="'+qty+'"> '+stock_name+': '+qty+'&nbsp;&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" onclick="removeProcessItems(this)"></i></div>');
			$('#addProcessStockModel').modal('hide');

		}
		
	})

	$('#addProcess').click(function(){
		var main_process = $('#addProcessMainProcessId').val();
		var sub_processes = $('#subProcess').val();

		var exist_processes = getSectionExistProcesses(main_process);	
		var output = '';
		var new_processes = [];
		$.each( sub_processes, function( index, row ){
			var row_array = row.split(",");
			console.log(row_array);
			new_processes.push(parseInt(row_array[0]));

			var exist_check = '';

			if(row_array[2]){
				exist_check = $.inArray( parseInt(row_array[2]), exist_processes );
			}else{
				exist_check = $.inArray( parseInt(row_array[0]), exist_processes );
			}

			if(exist_check <= -1){

				var sub_name = '';

				var hidden_input = '';

				var machine_mdl = '';

				var li_id = '';

				var labor_mdl = '';

				if(row_array[3]){
					sub_name = '<i class="fa fa-arrow-right"></i> '+row_array[3];
				}

				if(row_array[2]){
					hidden_input = '<input class="process-id-input" name="section_processes['+main_process+'][]" type="hidden" value="'+row_array[2]+'">';
					machine_mdl = '<a href="javascript:;" onclick="addProcessMachines('+main_process+','+row_array[2]+')" class="btn btn-primary btn-sm">Add Item</a>';
					labor_mdl = '<a href="javascript:;" onclick="addProcessLabours('+main_process+','+row_array[2]+')" class="btn btn-primary btn-sm">Add Item</a>';
					li_id = row_array[2]; 
				}else{
					hidden_input = '<input class="process-id-input" name="section_processes['+main_process+'][]" type="hidden" value="'+row_array[0]+'">';
					machine_mdl = '<a href="javascript:;" onclick="addProcessMachines('+main_process+','+row_array[0]+')" class="btn btn-primary btn-sm">Add Item</a>';
					labor_mdl = '<a href="javascript:;" onclick="addProcessLabours('+main_process+','+row_array[0]+')" class="btn btn-primary btn-sm">Add Item</a>';
					li_id = row_array[0]; 
				}

				
				// output += '<li class="ui-state-default operation-section-process-tile process-li-'+li_id+'">'+
				// hidden_input+
				// '<div class="operation-section-process-title">'+
				// row_array[1]+ '<span class="sub_process_level_1">'+sub_name+'</span>'+
				// '<div class="btn-group pull-right">'+
				// '<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs remove-icon" onclick="removeProcess(this)"><i class="fa fa-fw fa-close"></i></button>'+
				// '</div>'+
				// '</div>'+
				// '<div style="border: 1px solid #ddd; padding: 3px; margin-top: 2px;">'+
				// '<div class="row">'+
				// '<div class="col-md-6">'+
				// '<strong>Machines</strong>'+
				// '<div class="machine-list"></div>'+
				// '<div>'+machine_mdl+'</div>'+
				// '</div>'+
				// '<div class="col-md-6">'+
				// '<strong>Employees</strong>'+
				// '<div class="labor-list"></div>'+
				// '<div>'+labor_mdl+' </div>'+
				// '</div>'+
				
				// '</div>'+
				// '</div>'+
				
				// '</div>'+

				// '</li>';

				$('.li-list_'+li_id).html(output);

			}
		});

$.each( exist_processes, function( index, row ){
	var exist_check = $.inArray( row, new_processes );
	if(exist_check == -1){
		$('#section'+main_process+' .process-li-'+row).remove();
	}
});

$('.sortable-'+main_process).append(output);

$('#addProcessModal').modal('hide');
});


$('#addStock').click(function() {
	var item_name = $('#stockItems').find('option:selected').text();
	var item_id = $('#stockItems').val();

	var stock_grn = $('#stock_no').val();

	var row_array = stock_grn.split(",");

	var stock_grn_detail_id = row_array[0];

	var stock_grn_qty = row_array[1];

	console.log(stock_grn_qty);

	var stock_grn_no = $('#stock_no').find('option:selected').text();

	var row_array_detail_no = stock_grn_no.split(" - ");

	var stock_grn_detail_no = row_array_detail_no[0];

	var qty = $('#stockQty').val();

	var main_process = $('#addStockMainProcessId').val();

	var item_exist_qty = $('.qty-section-'+main_process+'-stock-'+stock_grn_detail_id+'-qty');

	var exist_item = $('.section-'+main_process+'-stock-'+stock_grn_detail_id+'-qty-display');

	var exist_item_exists = exist_item.length;

	console.log(qty);

	var current_qty = parseInt(item_exist_qty.val());

	if(exist_item_exists != 0){
		if(qty > current_qty){

			return notify.error('Given qty must be less than selected Item qty');
		}
	}else{
		// if(stock_grn_qty < qty){

		// 	return notify.error('Given qty must be less than selected Item qty');
		// }
	}

	

	if( $('#stock_no').has('option').length > 0 ) {
		if(stock_grn_detail_id == ""){
			return notify.error('Please Select Stock.');
		}
	}

	var exist_qty_ele = $('.section-'+main_process+'-stock-'+stock_grn_detail_id+'-qty');
	console.log(exist_qty_ele);
	var exist_qty_exists = exist_qty_ele.length;

	if(exist_qty_exists){
		var new_qty = parseInt(qty) + parseInt(exist_qty_ele.val());

		if(new_qty > current_qty){

			return notify.error('Given qty must be less than selected Item qty');
		}

		$('.section-'+main_process+'-stock-'+stock_grn_detail_id+'-qty-display').html(new_qty);
		$('.section-'+main_process+'-stock-'+stock_grn_detail_id+'-qty').val(new_qty);

	}else{
		var template = '<tr>'+
		'<td>'+item_name+'</td>'+
		'<td>'+stock_grn_detail_no+'</td>'+
		'<td class="section-'+main_process+'-stock-'+stock_grn_detail_id+'-qty-display">'+qty+'</td>'+
		'<td>'+
		'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs remove-icon" onclick="removeStock(this)">'+
		'<i class="fa fa-fw fa-close"></i>'+
		'<input type="hidden" name="section_stocks['+main_process+'][]" value="'+stock_grn_detail_id+'">'+
		'<input type="hidden" name="section_stocks_items['+main_process+'][]" value="'+item_id+'">'+
		'<input type="hidden" class="section-'+main_process+'-stock-'+stock_grn_detail_id+'-qty" name="section_stock_qtys['+main_process+'][]" value="'+qty+'">'+
		'<input type="hidden" class="qty-section-'+main_process+'-stock-'+stock_grn_detail_id+'-qty" name="stock_qtys['+main_process+'][]" value="'+stock_grn_qty+'">'+
		'</button>'+
		'</td>'+
		'</tr>';
		$("#stockContent_"+main_process).append(template);
	}

	$('#addStockModal').modal('hide');

	/*var exist_qty_ele = $('.section-'+main_process+'-stock-'+item_id+'-qty');
	var exist_qty_exists = exist_qty_ele.length;
	if(exist_qty_exists){
		var new_qty = parseInt(qty) + parseInt(exist_qty_ele.val());
		$('.section-'+main_process+'-stock-'+item_id+'-qty-display').html(new_qty);
		$('.section-'+main_process+'-stock-'+item_id+'-qty').val(new_qty);

	}else{
		var template = '<tr>'+
		'<td>'+item_name+'</td>'+
		'<td class="section-'+main_process+'-stock-'+item_id+'-qty-display">'+qty+'</td>'+
		'<td>'+
		'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs remove-icon" onclick="removeStock(this)">'+
		'<i class="fa fa-fw fa-close"></i>'+
		'<input type="hidden" name="section_stocks['+main_process+'][]" value="'+item_id+'">'+
		'<input type="hidden" class="section-'+main_process+'-stock-'+item_id+'-qty" name="section_stock_qtys['+main_process+'][]" value="'+qty+'">'+
		'</button>'+
		'</td>'+
		'</tr>';
		$('#stockContent').append(template);
	}

	$('#addStockModal').modal('hide');
	*/
});

$('#addSectionModal').on('shown.bs.modal', function () {

		//get exist sections
		var exist_sections = [];
		var exist_sections_names = [];
		$('.section-id').each(function(){
			exist_sections.push(parseInt($(this).val()));
			exist_sections_names.push($(this).attr('data-name'));
		});

		$.ajax({
			url: '../../main-process/getMainProcesses',
			method: 'post',
			dataType: 'json',
			success: function (data) {

				var options = '';
				options += '<option value="">--Select Main Process--</option>';
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
			$('#addSection').prop('disabled',false);
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

$('#addSectionModal').on('hide.bs.modal', function () {
	$('#addSection').prop('disabled',true);
});




$('#addStockModal').on('shown.bs.modal', function () {
	$('#stockQty').val(1);
});

})

function removeProcessItems(ele){
	ele.parentNode.remove();
}

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

function getSectionTemplate(section_id,section_name,sub_section_id,sub_section_name,section_parents,start_date,end_date) {

	var sub_details = '';

	if(sub_section_id){

		sub_details = ' <i class="fa fa-arrow-right"></i> '+sub_section_name;
	}

	var template = '<div id="section'+section_id+'" class="column section-column section-'+section_id+'">'+
	'<input type="hidden" class="section-id" name="sections[]" data-name="'+section_name+'" value="'+section_id+'">'+
	'<input type="hidden" class="sub_section_id" name="sub_section_id[]" data-name="'+sub_section_name+'" value="'+sub_section_id+'">'+
	'<input type="hidden" name="section_start[]"  value="'+start_date+'">'+
	'<input type="hidden" name="section_end[]"  value="'+end_date+'">'+
	'<input type="hidden" class="section-parents" name="section_parents[]" value="'+section_parents+'">'+
	'<div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">'+
	'<div class="portlet-header ui-widget-header ui-corner-all">'+
	'<div class="btn-group pull-right">'+
	'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs" onclick="addSectionProcess('+section_id+')">Add Process</button>&nbsp'+
	'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs" onclick="addSectionStock('+section_id+')">Add Stock</button>'+
	'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs remove-icon" onclick="removeSection(this)"><i class="fa fa-fw fa-close"></i></button>'+
	'</div>'+
	section_name+
	sub_details+
	'<br><small>'+start_date+' - '+end_date+'</small><br></div>'+
	'<div class="stock-content-section">'+
	'<table class="table">'+
	'<tr>'+
	'<th colspan="3">Stock List</th>'+
	'</tr>'+
	'<tbody id="stockContent_'+section_id+'" class="stock-detail-Content">'+
	'</tbody>'+
	'</table>'+
	'</div>'+
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

function removeSection(e) {
	$(e).parent().parent().parent().parent().remove();
}

function removeProcess(e) {
	$(e).parent().parent().parent().remove();
}

function removeStock(e) {

	$(e).parent().parent().remove();
}

function closeOperationDiv(section_id){
	$('#section'+section_id).remove();
}

function getSectionExistProcesses(main_process) {
	var exist_processes = [];
	$('#section'+main_process+' .process-id-input').each(function(){
		exist_processes.push(parseInt($(this).val()));
	});
	return exist_processes;
}

// function getSectionExistStocks(main_process) {
// 	var exist_processes = [];
// 	$('#section'+main_process+' .process-id-input').each(function(){
// 		exist_processes.push(parseInt($(this).val()));
// 	});
// 	return exist_processes;
// }


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
		url: '../../sub-process/getSubProcessByMainProcess2',
		method: 'post',
		data: {
			'main_process': main_process
		},
		dataType: 'JSON',
		success: function (data) {

			// console.log(data);

			var options = '';
			
			$.each( data, function( index, row ){
												
				$.each(row.main_process, function( mainindex, mainrow ){
					console.log(row.sub_process[mainindex]);
					if(row.sub_process[mainindex].length == 0){
						var exist_check = $.inArray( mainrow.id, exist_processes );
						if(exist_check > -1){
							options += '<option selected value="'+mainrow.id+','+mainrow.name+'">'+mainrow.name+'</option>';
						}else{
							options += '<option value="'+mainrow.id+','+mainrow.name+'">'+mainrow.name+'</option>';
						}
					}else{
						$.each(row.sub_process[mainindex], function( subindex, subrow ){
							var exist_check = $.inArray( subrow.id, exist_processes );
							if(exist_check > -1){
								options += '<option selected value="'+mainrow.id+','+mainrow.name+','+subrow.id+','+subrow.name+'">'+mainrow.name+'<b>---></b> <i class="fa fa-arrow-right"></i><span class="data-subsection" data-subsection="'+subrow.id+'">'+subrow.name+'</span></option>';
							}else{
								options += '<option value="'+mainrow.id+','+mainrow.name+','+subrow.id+','+subrow.name+'">'+mainrow.name+'<b>---></b> <span class="data-subsection" data-subsection="'+subrow.id+'">'+subrow.name+'</span></option>';
							}
						});
					}
					
				});
				
			});

			$('#subProcess').html(options);
			$('#addProcessMainProcessId').val(main_process);

			$('#addProcessModal').modal('show');
			$('.multi-select').multiSelect('refresh');

		},
		error: function(data){
			alert('sss');
		}
	});

}

function addSectionStock(main_process) {
	
	// var exist_processes = getSectionExistProcesses(main_process);
	$.ajax({
		url: '../../stock-item/getStockItems',
		method: 'post',
		dataType: 'json',
		success: function (data) {
			var options = '';
				options += '<option value="">--Select Item--</option>';
			$.each( data, function( index, row ){
				// var exist_check = $.inArray( row.id, exist_processes );
				// if(exist_check > -1){
					options += '<option value="'+row.id+'">'+row.name+'</option>';
				// }else{
				// 	options += '<option value="'+row.id+','+row.name+'">'+row.name+'</option>';
				// }
			});
			$('#stockItems').html(options);
			$('#addStockMainProcessId').val(main_process);
			$('#addStockModal').modal('show');
		},
		error: function(data){
			alert('sss');
		}
	});
}

function addProcessMachines(main_process,sub_process) {
	$('#addMachineMainProcessId').val(main_process);
	$('#addMachineSubProcessId').val(sub_process);
	$('#addProcessMachineModel').modal('show');
}

function addProcessLabours(main_process,process_id) {
	$('#addLaborMainProcessId').val(main_process);
	$('#addLaborSubProcessId').val(process_id);
	$('#addProcessLaborModel').modal('show');
}

function addProcessStocks(process_id) {
	$('#addStockSubProcessId').val(process_id);
	$('#addProcessStockModel').modal('show');
	$("#stockQty").val('');
}

function sortableInit() {
	$( ".sortable" ).each(function() {
		$( this ).sortable({
			connectWith: this,
			handle: ".operation-section-process-title",
		}).disableSelection();
	});

	$( "#sectionContent" ).sortable({
		connectWith: this,
		revert: true,
		handle: ".portlet-header",
	}).disableSelection();
}

function getStockByItem(){
	var stock_item = $("#stockItems").val();
	$.ajax({
	  url: '../getStockByItem',
	  method: "post",
	  data: {
		stock_item:stock_item,
	  },
	  dataType: 'JSON',
	  beforeSend: function () {},
	  complete: function () {},
	  success: function (data) {
  
		console.log(data);
  
		var options = '<option value="">--- Select Stock ---</option>';
		$.each( data, function( qtyindex, qtyrow ){
		  $.each(qtyrow.grn_stock, function( stockindex, stockrow ){
			options += '<option value="'+stockrow.id+','+qtyrow.exsit_qty[stockindex]+'">'+stockrow.grn_detail_no+' - '+qtyrow.exsit_qty[stockindex]+' - '+stockrow.unit_price.toFixed(2)+'</option>';
		  });
		  
		});
		
		$('#stock_no').html(options);
  
	  },
	  error: function(data){
	  }
	});
  }

  function getSubProcessByMainProcess(){
	var main_process = $("#mainProcess").val();
	$.ajax({
	  url: '../getSubProcessByMainProcess',
	  method: "post",
	  data: {
		main_process:main_process,
	  },
	  dataType: 'JSON',
	  beforeSend: function () {
		// $('#processes').prop('disabled',true);
	  },
	  complete: function () {
		// $('#processes').prop('disabled',false);
	  },
	  success: function (data) {
  
		console.log(data);

		if(data.length != 0){
			var options = '<option value="">--- Select Main Sub Process ---</option>';
			$.each( data, function( index, row ){
			options += '<option value="'+row.id+'">'+row.name+'</option>';
			});
			
			$('#main_sub_process').html(options);

			$('#main_sub_pro_div').show();
		}else{
			$('#main_sub_pro_div').hide();
			$('#main_sub_process').val('0');
			// $('#main_sub_process').select2('refresh');
		}
  
	  },
	  error: function(data){
	  }
	});
  }


