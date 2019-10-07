/*
**** CRUD MODULE HANDLER PLUGIN ****
Author: Rumesh Dananjaya
*/

class Crud{

	constructor() {

		//get resource route
		let str = $(location).attr('pathname');
		let lastSlash = str.lastIndexOf("/");
		let resource = str.substring(lastSlash+1);

		// this.form = "formData";
		// this.modal = "#formModal";
		// this.submitButton = "#btnSubmit";
		// this.datatables = "";
		this.resource = resource;
		this.url = "";
		// this.refreshPage = false;
		// this.update = false;
		// this.id = 0;
	}

	addClick(e){
		this.loadModal(this.resource);
	}

	editClick(e){
		this.loadModal(this.resource,$(e).attr('data-id'));
	}

	deleteClick(e){
		notify.confirm('Please confirm delete','crud.deleteRow('+$(e).attr('data-id')+')');
	}

	deleteRow(id){
		submitData("",crud.resource + '/'+ id,"delete");
	}

	loadModal(resource,id = 0){
		if(id == 0){
			this.url = this.resource+"/create";
		}else{
			this.url = this.resource+"/"+id+"/edit";
		}

		$.ajax({
			url: this.url,
			method: "get",
			data: {
				id:id
			},
			beforeSend: function () {
			},
			complete: function () {
			},
			success: function (data) {
				$('#formModal .modal-content').html(data);
				$('#formModal').modal('show');
			},
			error: function(data){
				if(data.status == 403){
					notify.error(data.responseJSON.message);
				}else{
					notify.error('Something went wrong.');
				}
			}
		});
	}

	directSubmit(submit_form){

		let submit_btn = $(submit_form).find('[type="submit"]');
		let ladda_selector = 'ladda';

		if(submit_btn.length > 0){

		$(submit_form).find('[type="submit"]').addClass(ladda_selector);
			ladda['ladda'] = Ladda.create( document.querySelector( "."+ladda_selector ) );
		}else{
			ladda_selector = 0;
		}

		
		var data = new FormData(submit_form);
		let path = $(submit_form).attr('action');
		let method = $(submit_form).attr('method');

		

		submitData(data,path,method,ladda_selector,$(submit_form));
	}
}

function successHandler(form,data){
	$('#formModal').modal('hide');
	datatabel.draw();
}

let crud = new Crud();