 var SSPEnable = true;
 var opt = {
  responsive: true,
  processing: true,
  serverSide: true,
  ajax:{
    url:'user/data',
    type:'POST',
    dataType: 'JSON',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization');
    }
  },
  columns:[
  {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
  {data: 'name' , name: 'name', orderable: true, searchable : true},
  {data: 'email' , name: 'email', orderable: true, searchable : true},
  {data: 'roles' , name: 'roles', orderable: true, searchable : true},
  // {data: 'permissions' , name: 'permissions', orderable: true, searchable : true},
  {data: 'active' , name: 'active', orderable: true, searchable : true},
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

// $('input').on('ifChecked', function(event){
//   alert(event.type + ' callback');
// });


function viewPermission(id){

  $.ajax({
      url: 'user/viewPermission',
      method: "post",
      data: {
        id:id,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {

        $('#permission_list').html(data);

        $('#userPrmissionList').DataTable();

        $('#permissionModal').modal('show');

      },
      error: function(data){
        $.each( data.responseJSON, function(index, row ){
          notify.error(row);
        });
      }
  });
  
}

// function submitPermission(){

//   var userid = $('#userid').val();
//   var permission = $('#permission').val();
//   alert( permission);

//   $.ajax({
//     url: 'user/permission',
//     method: "post",
//     data: {
//       userid:userid,
//       permission:permission,
//     },
//     beforeSend: function () {
//     },
//     complete: function () {
//     },
//     success: function (data) {
//       $('#permissionModal').modal('hide');
//     },
//     error: function(data){
//     }
//   });

// }


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
}

function setModelContent(data){
  $('#formModal .modal-content').html(data);
  $('#formModal').modal('show');
}

function successHandler(form,data){
  $('#formModal').modal('hide');
  datatabel.draw();
}*/
