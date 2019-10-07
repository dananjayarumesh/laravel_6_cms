$(document).ready(function(){

  getLaborCost();

});

var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'dailyLaborLogList',
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
    {data: 'labor' , name: 'labor', orderable: true, searchable : true},
    {data: 'main_process' , name: 'main_process', orderable: true, searchable : true},
    {data: 'section_process' , name: 'section_process', orderable: true, searchable : true},
    {data: 'date' , name: 'date', orderable: true, searchable : true},
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
  var start_date = $('#fromDatepicker').val();
  var end_date =  $('#toDatepicker').val();
  // getLaborCost(start_date,end_date);
  datatabel.draw();
});

function getLaborCost(start_date = null,end_date = null){
  
  $.ajax({
    url: 'getLaborCost',
    method: "post",
    data: {
      start_date:start_date,
      end_date : end_date
    },
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {

      $('#laborCost').html(data);
      
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}

function deleteDailyLaborLog(labor_log_id){
  
  $.ajax({
    url: 'deleteDailyLaborLog',
    method: "post",
    data: {
      labor_log_id:labor_log_id,
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

