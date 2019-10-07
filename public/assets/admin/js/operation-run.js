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
  {data: 'operation_run_no' , name: 'operation_run_no', orderable: true, searchable : true},
  {data: 'book_name' , name: 'book_name', orderable: true, searchable : true},
  {data: 'start_date' , name: 'start_date', orderable: true, searchable : true},
  {data: 'end_date' , name: 'end_date', orderable: true, searchable : true},
  {data: 'status' , name: 'status', orderable: true, searchable : true},
  {data: 'created_by' , name: 'created_by', orderable: true, searchable : true},
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

function runStatusChange(run_id,status) {
 $.ajax({
  url: 'operation-run/changeRunStatus',
  method: 'POST',
  data: {
    id:run_id,
    status:status
  },
  beforeSend: function () {
  },
  complete: function () {
  },
  success: function (data) {
    notify.success(data.msg);
    datatabel.draw();
  },
  error: function (data) {
    notify.error('Something went wrong!');
  }
});
}

