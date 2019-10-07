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
  {data: 'name' , name: 'name', orderable: true, searchable : true},
  {data: 'parent' , name: 'parent', orderable: true, searchable : true},
  // {data: 'subprocess' , name: 'subprocess', orderable: true, searchable : true},
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

function getSubProcessByMainProcess(){
  var main_process = $("#main_process").val();
  $.ajax({
    url: crud.resource +'/getSubProcessByMainProcess',
    method: "post",
    data: {
      main_process:main_process,
    },
    dataType: 'JSON',
    beforeSend: function () {
      $('#processes').prop('disabled',true);
    },
    complete: function () {
      $('#processes').prop('disabled',false);
    },
    success: function (data) {

      console.log(data);

      var options = '<option value="">--- Select Main Sub Process ---</option>';
      $.each( data, function( index, row ){
        options += '<option value="'+row.id+'">'+row.name+'</option>';
      });
      
      $('#main_sub_process').html(options);

    },
    error: function(data){
    }
  });
}

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
