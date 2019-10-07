 var SSPEnable = true;
 var opt = {
  responsive: true,
  processing: true,
  serverSide: true,
  ajax:{
    url: crud.resource + '/data',
    type:'POST',
    dataType: 'JSON',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization');
    }
  },
  columns:[
  {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
  {data: 'labor_code' , name: 'labor_code', orderable: true, searchable : true},
  {data: 'inhouseLabor' , name: 'inhouseLabor', orderable: true, searchable : true},
  {data: 'name' , name: 'name', orderable: true, searchable : true},
  {data: 'hourly_rate' , name: 'hourly_rate', orderable: true, searchable : true},
  {data: 'ot_hourly_rate' , name: 'ot_hourly_rate', orderable: true, searchable : true},
  {data: 'double_ot_hourly_rate' , name: 'double_ot_hourly_rate', orderable: true, searchable : true},
  {data: 'created_at' , name: 'created_at', orderable: true, searchable : true},
  {data: 'action' , name: 'action', orderable: false, searchable : false},
  ]
}

// function successHandler(form,data){
//   returnMessage('success',data.msg);
// }

$(function () {
 datatabel = $('.dataTable').DataTable(opt)
});

$('.dataTable').on( 'draw.dt', function () {
    // $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    //   checkboxClass: 'icheckbox_flat-green',
    //   radioClass   : 'iradio_flat-green'
    // })
});

/*function addClick(e){
  loadModal(resource);
}

function editClick(e){
  loadModal(resource,$(e).attr('data-id'));
}

function deleteClick(e){
  var delete_confirm = confirm("Please confirm delete");
  if(delete_confirm){
    deleteRow(resource + '/'+ $(e).attr('data-id'));
  }
}

function loadModal(resource,id = 0){
  var url = '';
  if(id == 0){
    url = resource+"/create";
  }else{
    url = resource+"/"+id+"/edit";
  }

  $.ajax({
    url: url,
    method: "get",
    data: {
      id:id
    },
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {
      setModelContent(data);
    },
    error: function(data){

    }
  });
}*/

// function setModelContent(data){
//   $('#formModal .modal-content').html(data);
//   $('#formModal').modal('show');
// }

// function successHandler(form,data){
//   $('#formModal').modal('hide');
//   datatabel.draw();
// }

function viewlabor(labourId){

    $.ajax({
      url: 'inhouse-labor/viewlabor',
      method: "post",
      data: {
        labourId:labourId,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {

        $('#labourDetails').html(data);
        
        $('#labourLogDetails').DataTable();

        $("#viewLabourModal").modal('show');
        
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
  });
}
