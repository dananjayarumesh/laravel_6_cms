$(document).ready(function () {
	sortableInit();

	$('#addSection').click(function () {
		// $('#mainProcess').prop('disabled', true);
		var section_id = $('#mainProcess').val();
		if (section_id == "") {
			return notify.error('Please Select main process.');
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

		var operation_id =  $('#exsit_operation_id').val();

		if ($('#main_sub_process').has('option').length > 0) {
			if (sub_section_id == "") {
				return notify.error('Please Select main sub process.');
			}
		}

		if (start_date == "" || end_date == "") {
			return notify.error('Start date and end date fields required');
		}

		var sdat = new Date(start_date.split("-").reverse().join("-")).getTime();

		var edat = new Date(end_date.split("-").reverse().join("-")).getTime();

		if (edat < sdat) {
			return notify.error('Start date must be less than End date.');
		}
		
		if (start_date == end_date) {
			return notify.error('Start date cannot be equale End date.');
		}

		/*When build section template, it pass to the database*/

		$.ajax({
			url: '../addSectionfromExistOperation',
			method: "post",
			data: {
				operation_id: operation_id,
				section_id: section_id,
				sub_section_id:sub_section_id,
				start_date:start_date,
				end_date:end_date,
			},
			dataType: 'JSON',
			beforeSend: function () {},
			complete: function () {},
			success: function (data) {
	
				notify.success(data.msg);

				var section_template = getSectionTemplate(section_id, section_name, sub_section_id, sub_section_name, section_parents, start_date, end_date,operation_id,data.run_sec_id);

				addSection(section_parents, section_template);

				$('#addSectionModal').modal('hide');
	
			},
			error: function (data) {
	
				$.each( data.responseJSON, function(index, row ){
					notify.error(row);
				});
			}
		});

		
	});

	$("#addProcessMachine").click(function (event) {
		var section_id = $('#addMachineMainProcessId').val();
		var sub_process_id = $('#addMachineSubProcessId').val();
		var sec_process_id = $('#addrunSectionProcessId').val();
		var machine_id = $('#machineDropdown').val();
		var machine_name = $('#machineDropdown').find('option:selected').text();

		var machine_exists = $('.section-' + section_id + '-process-' + sub_process_id + '-machine-' + machine_id).length;
		if (machine_exists) {
			notify.error('Machine already added');
		} else {

			$.ajax({
				url: '../addMachinefromExistOperation',
				method: "post",
				data: {
					sec_process_id: sec_process_id,
					machine_id: machine_id,
				},
				dataType: 'JSON',
				beforeSend: function () {},
				complete: function () {},
				success: function (data) {
		
					notify.success(data.msg);

					$('.process-li-' + sub_process_id + ' .machine-list').append('<div><input class="section-' + section_id + '-process-' + sub_process_id + '-machine-' + machine_id + '" type="hidden" name="machines[' + section_id + '][' + sub_process_id + '][]" value="' + machine_id + '"><input class="section-' + section_id + '-process-' + sub_process_id + '-machine-' + machine_id + '" type="hidden" name="exsit_machines[' + section_id + '][' + sub_process_id + '][]" value="' + machine_id + '"> ' + machine_name + '&nbsp;&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" onclick="deleteProcessMachine(this,'+sec_process_id+',' + machine_id + ')"></i></div>');
					$('#addProcessMachineModel').modal('hide');

					$('#addMachineMainProcessId').val('');
					$('#addMachineSubProcessId').val('');
					$('#addrunSectionProcessId').val('');
		
				},
				error: function (data) {
		
					$.each( data.responseJSON, function(index, row ){
						notify.error(row);
					});
				}
			});
			
		}
	});

	$('#addProcessLabor').click(function () {
		var section_id = $('#addLaborMainProcessId').val();
		var sub_process_id = $('#addLaborSubProcessId').val();
		var sec_process_id = $('#addsectionProId').val();
		var labor_id = $('#laborDropdown').val();
		var labor_name = $('#laborDropdown').find('option:selected').text();



		var labor_exists = $('.section-' + section_id + '-process-' + sub_process_id + '-labor-' + labor_id).length;

		if (labor_exists) {
			notify.error('Labor already added');
		} else {

			$.ajax({
				url: '../addLaborfromExistOperation',
				method: "post",
				data: {
					sec_process_id: sec_process_id,
					labor_id: labor_id,
				},
				dataType: 'JSON',
				beforeSend: function () {},
				complete: function () {},
				success: function (data) {
		
					notify.success(data.msg);
		
					$('.process-li-' + sub_process_id + ' .labor-list').append('<div><input class="section-' + section_id + '-process-' + sub_process_id + '-labor-' + labor_id + '" type="hidden" name="labors[' + section_id + '][' + sub_process_id + '][]" value="' + labor_id + '"><input class="section-' + section_id + '-process-' + sub_process_id + '-labor-' + labor_id + '" type="hidden" name="exsit_labors[' + section_id + '][' + sub_process_id + '][]" value="' + labor_id + '"> ' + labor_name + '&nbsp;&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" onclick="deleteProcessLabor(this,'+sec_process_id+','+labor_id+')"></i></div>');
					$('.process-li-exsit-' + sub_process_id + ' .labor-list').append('<div><input class="section-' + section_id + '-process-' + sub_process_id + '-labor-' + labor_id + '" type="hidden" name="labors[' + section_id + '][' + sub_process_id + '][]" value="' + labor_id + '"><input class="section-' + section_id + '-process-' + sub_process_id + '-labor-' + labor_id + '" type="hidden" name="exsit_labors[' + section_id + '][' + sub_process_id + '][]" value="' + labor_id + '"> ' + labor_name + '&nbsp;&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" onclick="removeProcessItems(this)"></i></div>');
					$('#addProcessLaborModel').modal('hide');
		
				},
				error: function (data) {
		
					$.each( data.responseJSON, function(index, row ){
						notify.error(row);
					});
				}
			});
			
		}
	})

	$('#addProcessStock').click(function () {

		var error_free = true;
		var element = $("#stockQty");
		var error_element = $("span", element.parent());
		if (!$("#stockQty").val()) {
			error_element.removeClass("error").addClass("error_show");
			error_free = false;
		}
		else {
			error_element.removeClass("error_show").addClass("error");
			var sub_process_id = $('#addStockSubProcessId').val();
			var stock_id = $('#stockDropdown').val();
			var stock_name = $('#stockDropdown').find('option:selected').text();
			var qty = $('#stockQty').val();

			$('.process-li-' + sub_process_id + ' .stock-list').append('<div><input type="hidden" name="stocks[' + sub_process_id + '][]" value="' + stock_id + '"><input type="hidden" name="stock_qtys[' + sub_process_id + '][]" value="' + qty + '"> ' + stock_name + ': ' + qty + '&nbsp;&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" onclick="removeProcessItems(this)"></i></div>');
			$('#addProcessStockModel').modal('hide');

		}

	})

	$('#addProcess').click(function () {

		var main_process = $('#addProcessMainProcessId').val();

		var sub_processes = $('#subProcess').val();

		var start_date = $('#processStartDate').val();
		var end_date = $('#processEndDate').val();

		var run_section_Id = $('#run_section_Id').val();

		var production_type_name = $( "#production_type option:selected" ).text();
		var production_unit_price = $("#pro_unit_price").val();
		var production_type = $("#production_type").val();

		var exist_processes = getSectionExistProcesses(main_process);
		var output = '';
		var new_processes = [];

		if(start_date == "" || end_date == ""){
			return notify.error('Start date and end date fields required');
		}

		var sdat = new Date(start_date.split("-").reverse().join("-")).getTime();

		var edat = new Date(end_date.split("-").reverse().join("-")).getTime();

		if(edat < sdat){
			return notify.error('Start date must be less than End date.');
		}

		if (start_date == end_date) {
			return notify.error('Start date cannot be equale End date.');
		}


		/*When build sub process template, it pass to the database*/

		$.ajax({
			url: '../addSubProcessfromExistOperation',
			method: "post",
			data: {
				run_section_Id			: run_section_Id,
				sub_processes			: sub_processes,
				start_date				: start_date,
				end_date				: end_date,
				production_unit_price	: production_unit_price,
				production_type			: production_type,
			},
			dataType: 'JSON',
			beforeSend: function () {},
			complete: function () {},
			success: function (data) {
	
				notify.success(data.msg);
				
	
				// $.each(sub_processes, function (index, row) {

					var row_array = sub_processes.split(",");

					new_processes.push(parseInt(row_array[0]));
		
					var exist_check = '';
		
					if (row_array[2]) {
						exist_check = $.inArray(parseInt(row_array[2]), exist_processes);
					} else {
						exist_check = $.inArray(parseInt(row_array[0]), exist_processes);
					}
		
					if (exist_check <= -1) {
		
						var sub_name = '';
		
						var hidden_input = '';
		
						var hidden_input2 = '';
		
						var machine_mdl = '';
		
						var li_id = '';
		
						var labor_mdl = '';
		
		
						if (row_array[3]) {
							sub_name = '<i class="fa fa-arrow-right"></i> ' + row_array[3];
						}
		
						if (row_array[2]) {
							
							hidden_input = '<input class="process-id-input" name="section_processes[' + main_process + '][]" type="hidden" value="' + row_array[2] + '">';
							hidden_input2 = '<input class="process-id-input" name="exsit_section_processes[' + main_process + '][]" type="hidden" value="' + row_array[2] + '">';
							machine_mdl = '<a href="javascript:;" onclick="addProcessMachines(' + main_process + ',' + row_array[2] + ','+data.run_sec_pro_id_array+')" class="btn btn-default btn-xs">Add Item</a>';
							labor_mdl = '<a href="javascript:;" onclick="addProcessLabours(' + main_process + ',' + row_array[2] + ','+data.run_sec_pro_id_array+')" class="btn btn-default btn-xs">Add Item</a>';
							li_id = row_array[2];
						} else {
							hidden_input = '<input class="process-id-input" name="section_processes[' + main_process + '][]" type="hidden" value="' + row_array[0] + '">';
							hidden_input2 = '<input class="process-id-input" name="exsit_section_processes[' + main_process + '][]" type="hidden" value="' + row_array[0] + '">';
							machine_mdl = '<a href="javascript:;" onclick="addProcessMachines(' + main_process + ',' + row_array[0] + ','+data.run_sec_pro_id_array+')" class="btn btn-default btn-xs">Add Item</a>';
							labor_mdl = '<a href="javascript:;" onclick="addProcessLabours(' + main_process + ',' + row_array[0] + ','+data.run_sec_pro_id_array+')" class="btn btn-default btn-xs">Add Item</a>';
							li_id = row_array[0];
						}
		
		
						output += '<li class="ui-state-default operation-section-process-tile process-li-' + li_id + '">' +
							hidden_input +
							hidden_input2 +
							'<div class="operation-section-process-title">' +
							'<div class="btn-group pull-right">' +
							'<a href="javascript:;" onclick="editSubProcess('+data.run_sec_pro_id_array+',' + li_id + ')" class="btn btn-default btn-xs" style="font-size: 12px; margin-right: 7px;">Edit</a>'+
							'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs remove-icon" onclick="deleteSubProcessFromSec(this,' + main_process + ',' + li_id + ',' + run_section_Id + ')"><i class="fa fa-fw fa-close"></i></button>' +
							'</div>' +
							row_array[1] + '<span class="sub_process_level_1">' + sub_name + '</span>' +
							'<br><small>'+start_date+' - '+end_date+'</small>'+
							'<br><br><small style="color: #314e60;font-size: 12px;font-weight: bold;"> Production Type : '+production_type_name+'</small>'+
							'<br><small style="color: #314e60;font-size: 12px;font-weight: bold;"> Unit Value : '+production_unit_price+'</small>'+
							'<div id="production_type_div"></div>'
							'</div>' +
							// '<div style="border: 1px solid #ddd; padding: 3px; margin-top: 2px;">' +
							// '<div class="row">' +
							// '<div class="col-md-6">' +
							// '<strong>Machines</strong>' +
							// '<div class="machine-list"></div>' +
							// '<div>' + machine_mdl + '</div>' +
							// '</div>' +
							// '<div class="col-md-6">' +
							// '<strong>Employees</strong>' +
							// '<div class="labor-list"></div>' +
							// '<div>' + labor_mdl + ' </div>' +
							// '</div>' +
							// '</div>' +
							// '</div>' +
		
							'</div>' +
		
							'</li>';
		
						$('#new_li_list_' + li_id).html(output);
		
					}
				// });
		
				// $.each(exist_processes, function (index, row) {
				// 	var exist_check = $.inArray(row, new_processes);
				// 	if (exist_check == -1) {
				// 		// $('#section'+main_process+' .process-li-'+row).remove();
				// 		// $('#section'+main_process+' .process-li-exsit-'+row).remove();
				// 	}
				// });
		
				$('.sortable-' + main_process).append(output);
		
				// $('#addProcessModal').modal('hide');
	
			},
			error: function (data) {
	
				$.each( data.responseJSON, function(index, row ){
					notify.error(row);
				});
			}
		});

		
	});


	$('#addStock').click(function () {
		var item_name = $('#stockItems').find('option:selected').text();

		var item_id = $('#stockItems').val();

		var stock_run_section_Id = $('#stock_run_section_Id').val();

		// var stock_grn = $('#stock_no').val();

		// var row_array = stock_grn.split(",");

		// var stock_grn_detail_id = row_array[0];

		// var stock_grn_qty = row_array[1];

		// var stock_grn_no = $('#stock_no').find('option:selected').text();

		// var row_array_detail_no = stock_grn_no.split(" - ");

		// var stock_grn_detail_no = row_array_detail_no[0];

		var qty = $('#stockQty').val();

		var main_process = $('#addStockMainProcessId').val();

		// var item_exist_qty = $('.qty-section-' + main_process + '-stock-' + stock_grn_detail_id + '-qty');

		// var exist_item = $('.section-' + main_process + '-stock-' + stock_grn_detail_id + '-qty-display');

		var item_exist_qty = $('.qty-section-' + main_process + '-stock-' + item_id + '-qty');

		var exist_item = $('.section-' + main_process + '-stock-' + item_id + '-qty-display');

		var exist_item_exists = exist_item.length;

		// var current_qty = parseInt(item_exist_qty.val());

		if (exist_item_exists != 0) {
			// if (qty > current_qty) {

			// 	return notify.error('Given qty must be less than selected Item qty');
			// }
		} else {
			// if(stock_grn_qty < qty){

			// 	return notify.error('Given qty must be less than selected Item qty');
			// }
		}

		


		// if ($('#stock_no').has('option').length > 0) {
		// 	if (stock_grn_detail_id == "") {
		// 		return notify.error('Please Select Stock.');
		// 	}
		// }

		// var exist_qty_ele = $('.section-' + main_process + '-stock-' + stock_grn_detail_id + '-qty');
		var exist_qty_ele = $('.section-' + main_process + '-stock-' + item_id + '-qty');

		var exist_qty_exists = exist_qty_ele.length;

		$.ajax({
			url: '../addRunSectionStock',
			method: "post",
			data: {
				stock_run_section_Id: stock_run_section_Id,
				// stock_grn_detail_id:stock_grn_detail_id,
				qty:qty,
				item_id:item_id,
			},
			dataType: 'JSON',
			beforeSend: function () {},
			complete: function () {},
			success: function (data) {
	
				notify.success(data.msg);
	
				if (exist_qty_exists) {

					var new_qty = parseInt(qty) + parseInt(exist_qty_ele.val());
		
					// if (new_qty > current_qty) {
		
					// 	return notify.error('Given qty must be less than selected Item qty');
					// }
		
					// $('.section-' + main_process + '-stock-' + stock_grn_detail_id + '-qty-display').html(new_qty);
					// $('.section-' + main_process + '-stock-' + stock_grn_detail_id + '-qty').val(new_qty);
					$('.section-' + main_process + '-stock-' + item_id + '-qty-display').html(new_qty);
					$('.section-' + main_process + '-stock-' + item_id + '-qty').val(new_qty);
		
				} else {

					// var template = '<tr>' +
					// '<td>' + item_name + '</td>' +
					// '<td>' + stock_grn_detail_no + '</td>' +
					// '<td class="section-' + main_process + '-stock-' + stock_grn_detail_id + '-qty-display">' + qty + '</td>' +
					// '<td>' +
					// '<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs remove-icon" onclick="removeStock(this); deleteRunSectionStock(' + stock_run_section_Id + ','+ stock_grn_detail_id +')">' +
					// '<i class="fa fa-fw fa-close"></i>' +
					// '<input type="hidden" name="section_stocks[' + main_process + '][]" value="' + stock_grn_detail_id + '">' +
	
					// '<input type="hidden" name="section_stocks_items[' + main_process + '][]" value="' + item_id + '">' +
	
					// '<input type="hidden" class="section-' + main_process + '-stock-' + stock_grn_detail_id + '-qty" name="section_stock_qtys[' + main_process + '][]" value="' + qty + '">' +
	
					// '<input type="hidden" name="exsit_section_stocks[' + main_process + '][]" value="' + stock_grn_detail_id + '">' +
					// '<input type="hidden" class="exist-section-' + main_process + '-stock-' + stock_grn_detail_id + '-qty" name="exist_section_stock_qtys[' + main_process + '][]" value="' + qty + '">' +
					// '<input type="hidden" name="exist_section_stocks_items[' + main_process + '][]" value="' + item_id + '">' +
	
					// '<input type="hidden" class="qty-section-' + main_process + '-stock-' + stock_grn_detail_id + '-qty" name="stock_qtys[' + main_process + '][]" value="' + stock_grn_qty + '">' +
					// '</button>' +
					// '</td>' +
					// '</tr>';
					var template = '<tr>' +
					'<td>' + item_name + '</td>' +
					// '<td>' + stock_grn_detail_no + '</td>' +
					'<td class="section-' + main_process + '-stock-' + item_id + '-qty-display">' + qty + '</td>' +
					'<td>' +
					'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs remove-icon" onclick="removeStock(this); deleteRunSectionStock(' + stock_run_section_Id + ','+ item_id +')">' +
					'<i class="fa fa-fw fa-close"></i>' +
					'<input type="hidden" name="section_stocks[' + main_process + '][]" value="' + item_id + '">' +
	
					'<input type="hidden" name="section_stocks_items[' + main_process + '][]" value="' + item_id + '">' +
	
					'<input type="hidden" class="section-' + main_process + '-stock-' + item_id + '-qty" name="section_stock_qtys[' + main_process + '][]" value="' + qty + '">' +
	
					'<input type="hidden" name="exsit_section_stocks[' + main_process + '][]" value="' + item_id + '">' +
					'<input type="hidden" class="exist-section-' + main_process + '-stock-' + item_id + '-qty" name="exist_section_stock_qtys[' + main_process + '][]" value="' + qty + '">' +
					'<input type="hidden" name="exist_section_stocks_items[' + main_process + '][]" value="' + item_id + '">' +
	
					// '<input type="hidden" class="qty-section-' + main_process + '-stock-' + item_id + '-qty" name="stock_qtys[' + main_process + '][]" value="' + stock_grn_qty + '">' +
					'</button>' +
					'</td>' +
					'</tr>';
					$("#stockContent_" + main_process).append(template);
					
				}
		
				$('#addStockModal').modal('hide');
	
			},
			error: function (data) {
				$.each( data.responseJSON, function(index, row ){

					notify.error(row);
				});
			}
		});
		
	});

	$('#addSectionModal').on('shown.bs.modal', function () {

		//get exist sections
		var exist_sections = [];
		var exist_sections_names = [];
		$('.section-id').each(function () {
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
				$.each(data, function (index, row) {
					var exist_check = $.inArray(row.id, exist_sections);
					if (exist_check > -1) {
						// options += '<option disabled value="'+row.id+'">'+row.name+'</option>';
					} else {
						options += '<option value="' + row.id + '">' + row.name + '</option>';
					}
				});

				$('#mainProcess').html(options);
				$('#mainProcess').prop('disabled', false);
				$('#addSection').prop('disabled', false);
			},
			error: function (data) {
			}
		});

		//set exist sections to parent select dropdown
		var options = '';
		$.each(exist_sections, function (index, row) {
			options += '<option value="' + row + '">' + exist_sections_names[index] + '</option>';
			$('#parentProcess').html(options);
		});



	});

	$('#addSectionModal').on('hide.bs.modal', function () {
		$('#addSection').prop('disabled', true);
	});




	$('#addStockModal').on('shown.bs.modal', function () {
		$('#stockQty').val(1);
	});

})

function removeProcessItems(ele) {
	ele.parentNode.remove();
}

function addSection(section_parents, section_template) {

	var section_parents_array = section_parents;
	var max_parent_index = -1;
	var parent_index;
	for (var i = 0, len = section_parents_array.length; i < len; i++) {
		parent_index = $("#sectionContent").children().index($('#section' + section_parents_array[i]));
		if (parseInt(parent_index) > max_parent_index) {
			max_parent_index = parent_index;
		}
	}

	if (max_parent_index == -1) {
		$('#sectionContent').append(section_template);
	} else {
		$("#sectionContent .section-column:nth-child(" + (parseInt(max_parent_index) + 1) + ")").after(section_template);
	}
}

function getSectionTemplate(section_id, section_name, sub_section_id, sub_section_name, section_parents, start_date, end_date,operation_id,run_sec_id) {

	var sub_details = '';

	if (sub_section_id) {

		sub_details = ' <i class="fa fa-arrow-right"></i> ' + sub_section_name;
	}

	var template = '<div id="section' + section_id + '" class="column section-column section-' + section_id + '">' +
		'<input type="hidden" class="operation-section-id" name="opeartions[]" data-name="" value="' + operation_id + '">' +
		'<input type="hidden" class="section-id" name="sections[]" data-name="' + section_name + '" value="' + section_id + '">' +
		'<input type="hidden" class="exsit-sections" name="exsit_sections[]" data-name="' + section_name + '" value="' + section_id + '">' +
		'<input type="hidden" class="common_sub_sections" name="common_sub_sections[]" data-name="' + sub_section_name + '" value="' + sub_section_id + '">' +
		'<input type="hidden" class="sub_section_id" name="sub_section_id[]" data-name="' + sub_section_name + '" value="' + sub_section_id + '">' +
		'<input type="hidden" class="exsit_sub_section_id" name="exsit_sub_section_id[]" data-name="' + sub_section_name + '" value="' + sub_section_id + '">' +
		'<input type="hidden" name="section_start[]"  value="' + start_date + '">' +
		'<input type="hidden" name="section_end[]"  value="' + end_date + '">' +
		'<input type="hidden" class="section-parents" name="section_parents[]" value="' + section_parents + '">' +
		'<div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">' +
		'<div class="portlet-header ui-widget-header ui-corner-all">' +
		'<div class="btn-group pull-right">' +
		'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs" onclick="addSectionProcess(' + section_id + ','+run_sec_id+')">Add Process</button>&nbsp' +
		'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs" onclick="addSectionStock(' + section_id + ','+run_sec_id+')">Add Stock</button>' +
		'<button type="button" style="font-size: 12px;" class="btn btn-default btn-xs remove-icon" onclick="deleteMainSection(this,' + section_id + ',' + sub_section_id + ',' + operation_id + ','+run_sec_id+')"><i class="fa fa-fw fa-close"></i></button>' +
		'</div>' +
		section_name +
		sub_details +
		'<br><small>' + start_date + ' - ' + end_date + '</small><br></div>' +
		'<div class="stock-content-section">' +
		'<table class="table">' +
		'<tr>' +
		'<th colspan="3">Stock List</th>' +
		'</tr>' +
		'<tbody id="stockContent_' + section_id + '" class="stock-detail-Content">' +
		'</tbody>' +
		'</table>' +
		'</div>' +
		'<div class="portlet-content">' +
		'<ul class="sortable sortable-' + section_id + '">' +
		'</ul>' +
		'<div>' +
		'</div>' +
		'</div>' +
		'</div>' +
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

function closeOperationDiv(section_id) {
	$('#section' + section_id).remove();
}

function getSectionExistProcesses(main_process) {
	var exist_processes = [];
	$('#section' + main_process + ' .process-id-input').each(function () {
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
	$('.section-id').each(function () {
		exist_sections.push($(this).val());
	});

	$('#section' + main_process + ' .process-id-input').each(function () {
		exist_processes.push(parseInt($(this).val()));
	});
	return exist_processes;
}

function addSectionProcess(main_process,section=null) {

	var exist_processes = getSectionExistProcesses(main_process);

	$.ajax({
		url: '../../sub-process/getSubProcessByMainProcess2',
		method: 'post',
		data: {
			'main_process': main_process
		},
		dataType: 'JSON',
		success: function (data) {

			var options = '';

			$.each(data, function (index, row) {

				$.each(row.main_process, function (mainindex, mainrow) {
					if (row.sub_process[mainindex].length == 0) {
						var exist_check = $.inArray(mainrow.id, exist_processes);
						if (exist_check > -1) {
							options += '<option selected value="' + mainrow.id + ',' + mainrow.name + '">' + mainrow.name + '</option>';
						} else {
							options += '<option value="' + mainrow.id + ',' + mainrow.name + '">' + mainrow.name + '</option>';
						}
					} else {
						$.each(row.sub_process[mainindex], function (subindex, subrow) {
							var exist_check = $.inArray(subrow.id, exist_processes);
							if (exist_check > -1) {
								options += '<option selected value="' + mainrow.id + ',' + mainrow.name + ',' + subrow.id + ',' + subrow.name + '">' + mainrow.name + '<b>---></b> <i class="fa fa-arrow-right"></i><span class="data-subsection" data-subsection="' + subrow.id + '">' + subrow.name + '</span></option>';
							} else {
								options += '<option value="' + mainrow.id + ',' + mainrow.name + ',' + subrow.id + ',' + subrow.name + '">' + mainrow.name + '<b>---></b> <span class="data-subsection" data-subsection="' + subrow.id + '">' + subrow.name + '</span></option>';
							}
						});
					}

				});

			});

			$('#subProcess').html(options);
			$('#addProcessMainProcessId').val(main_process);

			$('#run_section_Id').val(section);

			$('#addProcessModal').modal('show');
			
			$('.multi-select').multiSelect('refresh');
			sortableInit();
		},
		error: function (data) {
			
		}
	});

}

function addSectionStock(main_process,run_sec_id) {

	// var exist_processes = getSectionExistProcesses(main_process);
	$.ajax({
		url: '../../stock-item/getStockItems',
		method: 'post',
		dataType: 'json',
		success: function (data) {
			var options = '';
			options += '<option value="">--Select Item--</option>';
			$.each(data, function (index, row) {
				// var exist_check = $.inArray( row.id, exist_processes );
				// if(exist_check > -1){
				options += '<option value="' + row.id + '">' + row.name + '</option>';
				// }else{
				// 	options += '<option value="'+row.id+','+row.name+'">'+row.name+'</option>';
				// }
			});
			$('#stockItems').html(options);
			$('#addStockMainProcessId').val(main_process);
			$('#stock_run_section_Id').val(run_sec_id);
			$('#addStockModal').modal('show');
		},
		error: function (data) {
			alert('sss');
		}
	});
}

function addProcessMachines(main_process, sub_process,run_sec_pros_id) {
	$('#addMachineMainProcessId').val(main_process);
	$('#addMachineSubProcessId').val(sub_process);
	$('#addrunSectionProcessId').val(run_sec_pros_id);
	$('#addProcessMachineModel').modal('show');
}

function addProcessLabours(main_process, process_id,run_sec_pros_id) {
	$('#addLaborMainProcessId').val(main_process);
	$('#addLaborSubProcessId').val(process_id);
	$('#addLaborSubProcessId').val(process_id);
	$('#addsectionProId').val(run_sec_pros_id);
	$('#addProcessLaborModel').modal('show');
}

function addProcessStocks(process_id) {
	$('#addStockSubProcessId').val(process_id);
	$('#addProcessStockModel').modal('show');
	$("#stockQty").val('');
}

function sortableInit() {

	$(".sortable").each(function () {
		$(this).sortable({
			connectWith: this,
			handle: ".operation-section-process-title",
			deactivate: function( event, ui ) {
				// processUpdatePriority();
				sectionUpdatePriority();
			}
		}).disableSelection();
	});

	$("#sectionContent").sortable({
		connectWith: this,
		revert: true,
		handle: ".portlet-header",
		deactivate: function( event, ui ) {
			sectionUpdatePriority();
		}
	}).disableSelection();

}

function getStockByItem() {
	var stock_item = $("#stockItems").val();
	$.ajax({
		url: '../getStockByItem',
		method: "post",
		data: {
			stock_item: stock_item,
		},
		dataType: 'JSON',
		beforeSend: function () { },
		complete: function () { },
		success: function (data) {

			var options = '<option value="">--- Select Stock ---</option>';
			$.each(data, function (qtyindex, qtyrow) {
				$.each(qtyrow.grn_stock, function (stockindex, stockrow) {
					
					if(qtyrow.exsit_qty[stockindex] >= 1){
						options += '<option value="' + stockrow.id + ',' + qtyrow.exsit_qty[stockindex] + '">' + stockrow.grn_detail_no + ' - ' + qtyrow.exsit_qty[stockindex] + ' - ' + stockrow.unit_price.toFixed(2) + '</option>';
					}
				});

			});

			$('#stock_no').html(options);

		},
		error: function (data) {
		}
	});
}

function getSubProcessByMainProcess() {
	var main_process = $("#mainProcess").val();
	$.ajax({
		url: '../getSubProcessByMainProcess',
		method: "post",
		data: {
			main_process: main_process,
		},
		dataType: 'JSON',
		beforeSend: function () {
			// $('#processes').prop('disabled',true);
		},
		complete: function () {
			// $('#processes').prop('disabled',false);
		},
		success: function (data) {

			if (data.length != 0) {
				var options = '<option value="">--- Select Main Sub Process ---</option>';
				$.each(data, function (index, row) {
					options += '<option value="' + row.id + '">' + row.name + '</option>';
				});

				$('#main_sub_process').html(options);

				$('#main_sub_pro_div').show();
			} else {
				$('#main_sub_pro_div').hide();
				$('#main_sub_process').val('0');
				// $('#main_sub_process').select2('refresh');
			}

		},
		error: function (data) {
		}
	});
}

function deleteRunSectionStock(run_sec_id,stock_item_id){

	$.ajax({
		url: '../deleteRunSectionStock',
		method: "post",
		data: {
			run_sec_id: run_sec_id,
			stock_item_id:stock_item_id
		},
		dataType: 'JSON',
		beforeSend: function () {},
		complete: function () {},
		success: function (data) {

			notify.success(data.msg);
		},
		error: function (data) {
		}
	});
}

function deleteProcessLabor(ele=null,labor_pro_id,labor_id){

	$.ajax({
		url: '../deleteProcessLabor',
		method: "post",
		data: {
			labor_pro_id: labor_pro_id,
			labor_id:labor_id
		},
		dataType: 'JSON',
		beforeSend: function () {},
		complete: function () {},
		success: function (data) {

			notify.success(data.msg);

			if(ele){
				removeProcessItems(ele);
			}

		},
		error: function (data) {
			$.each( data.responseJSON, function(index, row ){
				notify.error(row);
			});
		}
	});
}

function deleteProcessMachine(ele=null,machine_pro_id,machine_id){

	$.ajax({
		url: '../deleteProcessMachine',
		method: "post",
		data: {
			machine_pro_id: machine_pro_id,
			machine_id:machine_id
		},
		dataType: 'JSON',
		beforeSend: function () {},
		complete: function () {},
		success: function (data) {

			notify.success(data.msg);

			if(ele){
				removeProcessItems(ele);
			}

		},
		error: function (data) {

			$.each( data.responseJSON, function(index, row ){
				notify.error(row);
			});
		}
	});
}

function sectionConfirm(ele = null, sec_id,process_id){
	// ConfirmDialog("Are you sure. This cannot be undone ?",deleteMainSection(ele,sec_id,process_id));
	// notify.confirm('Are you sure. This cannot be undone ?','deleteMainSection('+ele+','+sec_id+','+process_id+')');
}

function deleteMainSection(ele =null,sec_id,run_sec,operation_id = null,run_section_id = null){

	$.ajax({
		url: '../deleteMainSection',
		method: "post",
		data: {
			operation_id: operation_id,
			sec_id: sec_id,
			run_sec:run_sec,
			run_section_id:run_section_id,
		},
		dataType: 'JSON',
		beforeSend: function () {},
		complete: function () {},
		success: function (data) {

			notify.success(data.msg);

			if(ele){
				removeSection(ele);
			}

		},
		error: function (data) {

			$.each( data.responseJSON, function(index, row ){
				notify.error(row);
			});
		}
	});
}

function deleteSubProcessFromSec(ele =null,pro_id,sub_pro_id,run_sec_id=null){

	$.ajax({
		url: '../deleteSubProcessFromSec',
		method: "post",
		data: {
			pro_id: pro_id,
			sub_pro_id:sub_pro_id,
			run_sec_id:run_sec_id,
		},
		dataType: 'JSON',
		beforeSend: function () {},
		complete: function () {},
		success: function (data) {

			notify.success(data.msg);

			if(ele){
				removeProcess(ele);
			}

		},
		error: function (data) {

			$.each( data.responseJSON, function(index, row ){
				notify.error(row);
			});
		}
	});
}

function editOperationMainData(operation_id){
	
	$.ajax({
		url: '../editOperationMainData',
		method: "post",
		data: {
			operation_id: operation_id,
			book_count:$('#book_count').val(),
			end_date:$('#end_date').val(),
			start_date:$('#start_date').val(),
			note:$('#note').val(),
			book:$('#book').val(),
			isbn_no:$('#isbn_no').val(),
		},
		dataType: 'JSON',
		beforeSend: function () {},
		complete: function () {},
		success: function (data) {

			notify.success(data.msg);

		},
		error: function (data) {

			$.each( data.responseJSON, function(index, row ){
				notify.error(row);
			});
		}
	});
}

function ConfirmDialog(message,functionname) {

    $('<div></div>').appendTo('body')
    .html('<div><h6>'+message+'?</h6></div>')
    .dialog({
        modal: true, title: 'Delete message', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function () {

				functionname;
                
                $(this).dialog("close");
            },
            No: function () { 
				
				

                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $(this).remove();
        }
    });
}

function sectionUpdatePriority(){

    $.ajax({

      url: '../update/priority',
      method: "post",
      data: $('#sectionProrityForm').serialize(),
      dataType: 'JSON',
      beforeSend: function () {},
      complete: function () {},
      success: function (data) {
    
		notify.success(data.msg);
      },
      error: function(data){
		$.each( data.responseJSON, function(index, row ){
			notify.error(row);
		});
      }
	  });
}

function getOperationDate(operation_id){

	$.ajax({
		url: '../getOperationStartDate',
		method: "post",
		data: {
		  operationId:operation_id,
		},
		dataType: 'JSON',
		beforeSend: function () {},
		complete: function () {},
		success: function (data) {
  
		  if(data.actual_start_date ){

			var str = data.actual_start_date;
  
			var result = str.split('-');
	
			var month = result[1] - 1;

			if(data.actual_end_date){

				var end = data.actual_end_date;
  
				var result2 = end.split('-');
		
				var end_month = result2[1] - 1;

				var end_duration = new Date(result2[0],end_month, result2[2]);
			}

			

			$("#sectionStartDate").val(data.actual_start_date);

			$("#sectionStartDate").datepicker({
				minDate: new Date(result[0],month, result[2]),
				dateFormat: 'yy-mm-dd'
			});

			$("#sectionEndDate").datepicker({
				minDate: new Date(result[0],month, result[2]),
				dateFormat: 'yy-mm-dd'
			});

		  }else{

			$("#sectionStartDate").datepicker({
				dateFormat: 'yy-mm-dd'
			});

			$("#sectionEndDate").datepicker({
				dateFormat: 'yy-mm-dd'
			});

		  }

		},
		error: function(data){
		}
	});

}

function editSubProcess(process_id,sub_process_id) {

	$('#process_id').val(process_id);
	$('#sub_process_id').val(sub_process_id);

	loadProcessStockType(process_id,sub_process_id);
	
}

function loadProcessStockType(process_id,sub_process_id) {
	
	$.ajax({
		url: '../loadProcessStockType',
		method: "post",
		data: {
			process_id: process_id,
			sub_process_id:sub_process_id,
		},
		dataType: 'JSON',
		beforeSend: function () {},
		complete: function () {},
		success: function (data) {

			console.log(data);

			$("#edit_production_type").val(data.production_type);
			$('#edit_production_type').trigger('change');

			$('input[name="pro_unit_price"]').val(data.unit_value);

			$('#editProcessModal').modal('show');

		},
		error: function (data) {

			$.each( data.responseJSON, function(index, row ){
				notify.error(row);
			});
		}
	});
}


function editProcessStockType() {

	var sub_process_id = $("#sub_process_id").val();

	$.ajax({
		url: '../submitEditSubProcess',
		method: "post",
		data: $('#edit_process_stock_form').serialize(),
		dataType: 'JSON',
		beforeSend: function () {},
		complete: function () {},
		success: function (data) {

			notify.success(data.msg);

			$('#editProcessModal').modal('hide');

			$('#production_type_div_'+sub_process_id).html('<small style="color: #314e60;font-size: 12px;font-weight: bold;"> Production Type : '+data.pro_type+'</small>'+
			'<br><small style="color: #314e60;font-size: 12px;font-weight: bold;"> Unit Value : '+data.unit_value+'</small>');
		},
		error: function (data) {

			$.each( data.responseJSON, function(index, row ){
				notify.error(row);
			});
		}
	});
}




