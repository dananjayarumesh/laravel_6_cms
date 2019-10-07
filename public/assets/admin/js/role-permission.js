 var SSPEnable = true;
 var opt = {
  responsive: true,
  processing: true,
  serverSide: true,
  ajax:{
    url:'permission/roleData',
    type:'POST',
    dataType: 'JSON',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization');
    },
    data: function(data){
      data.role = $('#role').val()
    }
  },
  columns:[
  {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
  {data: 'name' , name: 'name', orderable: true, searchable : true},
  {data: 'action' , name: 'action', orderable: false, searchable : false},
  ]
}

$(function () {
 datatabel = $('.dataTable').DataTable(opt)
});

 // clear filter input
 $('#role').change(function(event){
  datatabel.draw();
});

function successHandler(form,data){
	// keep this to replace default behavior
}