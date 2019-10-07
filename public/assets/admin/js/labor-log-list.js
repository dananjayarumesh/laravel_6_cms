$(document).ready(function(){

  getLaborCost();

});

var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'laborLogList',
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
    {data: 'start' , name: 'start', orderable: true, searchable : true},
    {data: 'end' , name: 'end', orderable: true, searchable : true},
    {data: 'ot_minutes' , name: 'ot_minutes', orderable: true, searchable : true},
    {data: 'double_ot_minutes' , name: 'double_ot_minutes', orderable: true, searchable : true},
    {data: 'normal_hour' , name: 'normal_hour', orderable: true, searchable : true},
    {data: 'total_cost' , name: 'total_cost', orderable: true, searchable : true},
    {data: 'created_by' , name: 'created_by', orderable: false, searchable : false},
    {data: 'action' , name: 'action', orderable: false, searchable : false},
 ]
}

var opt2 = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'generalLaborLogList',
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
    {data: 'labor' , name: 'labor', orderable: true, searchable : true},
    {data: 'date' , name: 'date', orderable: true, searchable : true},
    {data: 'start' , name: 'start', orderable: true, searchable : true},
    {data: 'end' , name: 'end', orderable: true, searchable : true},
    {data: 'ot_minutes' , name: 'ot_minutes', orderable: true, searchable : true},
    {data: 'double_ot_minutes' , name: 'double_ot_minutes', orderable: true, searchable : true},
    {data: 'normal_hour' , name: 'normal_hour', orderable: true, searchable : true},
    {data: 'total_cost' , name: 'total_cost', orderable: true, searchable : true},
    {data: 'note' , name: 'note', orderable: true, searchable : true},
    {data: 'created_by' , name: 'created_by', orderable: false, searchable : false},
    {data: 'action' , name: 'action', orderable: false, searchable : false},
 ]
}


$(function () {
datatabel = $('.dataTable').DataTable(opt)
datatabel_2 = $('.general_labor_log').DataTable(opt2)
});

$('.dataTable').on( 'draw.dt', function () {

});

$('.general_labor_log').on( 'draw.dt', function () {

});

$('#filterForm').submit(function(e){
  e.preventDefault();
  var start_date = $('#fromDatepicker').val();
  var end_date =  $('#toDatepicker').val();
  getLaborCost(start_date,end_date);
  datatabel.draw();
  datatabel_2.draw();
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

function deleteLaborLog(labor_log_id){
  
  $.ajax({
    url: 'deleteLaborLog',
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
      datatabel_2.draw();
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}

