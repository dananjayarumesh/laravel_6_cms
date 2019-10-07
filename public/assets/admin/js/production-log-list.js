var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'productionLogList',
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
    {data: 'operation_no' , name: 'operation_no', orderable: true, searchable : true},
    {data: 'main_process' , name: 'main_process', orderable: true, searchable : true},
    {data: 'section_process' , name: 'section_process', orderable: true, searchable : true},
    {data: 'production_type' , name: 'production_type', orderable: true, searchable : true},
    {data: 'qty' , name: 'qty', orderable: true, searchable : true},
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

function deleteProductionLog(pro_log_id){
  
  $.ajax({
    url: 'deleteProductionLog',
    method: "post",
    data: {
      pro_log_id:pro_log_id,
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

function viewProductionLogDetails(pro_log_id){
  
  $.ajax({
    url: 'viewProductionLogDetails',
    method: "post",
    data: {
      pro_log_id:pro_log_id,
    },
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {

      $('#pro_stock_details').html(data);
      $('#viewProductionStockDetailsModal').modal('show');
      $('#progress_stock_tbl').DataTable();
      $('#raw_stock_tbl').DataTable();
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}