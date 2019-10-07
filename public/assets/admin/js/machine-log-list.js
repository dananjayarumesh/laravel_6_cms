$(document).ready(function(){

  getMachineCost();

});

var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'machineLogList',
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
    {data: 'machine' , name: 'machine', orderable: true, searchable : true},
    {data: 'main_process' , name: 'main_process', orderable: true, searchable : true},
    {data: 'section_process' , name: 'section_process', orderable: true, searchable : true},
    {data: 'date' , name: 'date', orderable: true, searchable : true},
    {data: 'start' , name: 'start', orderable: true, searchable : true},
    {data: 'end' , name: 'end', orderable: true, searchable : true},
    {data: 'work_hour' , name: 'work_hour', orderable: true, searchable : true},
    {data: 'lost_time_hour' , name: 'lost_time_hour', orderable: true, searchable : true},
    {data: 'machine_cost' , name: 'machine_cost', orderable: true, searchable : true},
    {data: 'production' , name: 'production', orderable: true, searchable : true},
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
  getMachineCost(start_date,end_date);
  datatabel.draw();
});

function getMachineCost(start_date = null,end_date = null){
  
  $.ajax({
    url: 'getMachineCost',
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

      $('#machineCost').html(data);
      
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}

function deleteMachineLog(machine_log_id){
  
  $.ajax({
    url: 'deleteMachineLog',
    method: "post",
    data: {
      machine_log_id:machine_log_id,
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