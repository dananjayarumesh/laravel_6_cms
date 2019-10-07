/*
**** FORM SUBMIT HANDLER PLUGIN (BASIC) ****
Author: Rumesh Dananjaya
*/

//dynamically declare ladda
let ladda = {};
let loop_id = 1;
$('.ajax-submit').each(function(){
	$(this).attr('data-ladda',"ladda_"+loop_id);
	$(this).attr('data-form-id',loop_id);
	$(this).find('[type="submit"]').addClass("ladda_"+loop_id);
	ladda['ladda' + '_' + loop_id] = Ladda.create( document.querySelector( ".ladda_"+loop_id ) );
	loop_id++;
});

$('.ajax-submit').submit(function(event){
	event.preventDefault();

	let form_ladda = $(this).attr('data-ladda');
	let form = $(this);
	var data = new FormData(this);
	let path = $(this).attr('action');
	let method = $(this).attr('method');
	submitData(data,path,method,form_ladda,form);
});

function submitData(data,path,method,form_ladda=0,form=0){
	// get this form's ladda
	if(form != 0 && form_ladda != 0){
		var this_ladda = ladda[form_ladda];
	}
	$.ajax({
		url: path,
		method: method,
		data: data,
		processData: false,
		contentType: false,
		beforeSend: function () {
			if(form != 0 && form_ladda != 0){
				this_ladda.start();
			}
		},
		complete: function () {
			if(form != 0 && form_ladda != 0){
				this_ladda.stop();
			}
		},
		success: function (data) {
			notify.success(data.msg);
			if (typeof window['successHandler'] === 'function') {
				successHandler(form,data,method); // This need to be handled externally
			}
		},
		error: function(data){
			errorDisplay(data);
			if (typeof window['appendErrorHandler'] === 'function') {
				appendErrorHandler(data);
			}
		}
	});
}

function errorDisplay(data) {

	if(data.status == 403){
		notify.error(data.responseJSON.message);
	}else if(data.status == 422){
		$.each(data.responseJSON.errors, function(index, message) {
			notify.error(message);
		});
	}else{
		notify.error('Something went wrong.');
	}
}