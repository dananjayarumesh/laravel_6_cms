var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'bookLogList',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   },
   data: function(d){
    d.start_date = $('#fromDatepicker').val()
    d.end_date = $('#toDatepicker').val()
  },
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'operation' , name: 'operation', orderable: true, searchable : true},
    {data: 'qty' , name: 'qty', orderable: true, searchable : true},
    {data: 'date' , name: 'date', orderable: true, searchable : true},
    {data: 'book_log_status' , name: 'book_log_status', orderable: true, searchable : true},
    {data: 'created_at' , name: 'created_at', orderable: true, searchable : true},
    {data: 'created_by' , name: 'created_by', orderable: false, searchable : false},
    {data: 'action' , name: 'action', orderable: false, searchable : false},
 ]
}


$(function () {
datatabel = $('.dataTable').DataTable(opt)
});

$('.dataTable').on( 'draw.dt', function () {

});

$('#filterForm').submit(function(e){
  e.preventDefault();
  
  datatabel.draw();
});

function deleteBookLog(book_log_id){
  
  $.ajax({
    url: 'deleteBookLog',
    method: "post",
    data: {
      book_log_id:book_log_id,
    },
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {

      notify.success(data.msg);
      datatabel.draw();
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}
