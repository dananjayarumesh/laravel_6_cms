$(document).ready(function(){

    // getRawMaterialCost();
    // getCoverWastageCost();
    // getSignatureWastageCost();
    // getGatherWastageCost();
    // getBookWastageCost();
    // getOtherWastageCost();
  
  });
  
  var SSPEnable = true;
  var opt = {
   responsive: true,
   processing: true,
   serverSide: true,
   ajax:{
     url:'wastageLogList',
     type:'POST',
     dataType: 'JSON',
     beforeSend: function (xhr) {
       xhr.setRequestHeader('Authorization');
     },
     data: function(d){
      d.start_date = $('#fromDatepicker').val()
      d.end_date = $('#toDatepicker').val()
      d.operation = $('#operation_Run').val()
      d.wastage_type = $('#wastage_types').val()
    },
   },
   columns:[
      {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
      {data: 'operation' , name: 'operation', orderable: true, searchable : true},
      {data: 'main_process' , name: 'operation', orderable: true, searchable : true},
      {data: 'section_process' , name: 'operation', orderable: true, searchable : true},
      {data: 'wastage_type' , name: 'wastage_type', orderable: true, searchable : true},
      // {data: 'stock_item' , name: 'stock_item', orderable: true, searchable : true},
      {data: 'qty' , name: 'qty', orderable: true, searchable : true},
      {data: 'total_price' , name: 'total_price', orderable: true, searchable : true},
      {data: 'date' , name: 'date', orderable: false, searchable : false},
      {data: 'created_by' , name: 'created_by', orderable: false, searchable : false},
      {data: 'note' , name: 'note', orderable: false, searchable : false},
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
    var operation = $('#operation_Run').val()
    var wastage_type = $('#wastage_types').val()
    getRawMaterialCost(start_date,end_date,operation,wastage_type);
    getCoverWastageCost(start_date,end_date,operation,wastage_type);
    getSignatureWastageCost(start_date,end_date,operation,wastage_type);
    getGatherWastageCost(start_date,end_date,operation,wastage_type);
    getBookWastageCost(start_date,end_date,operation,wastage_type);
    getOtherWastageCost(start_date,end_date,operation,wastage_type);
    datatabel.draw();
  });
  
  function getRawMaterialCost(start_date = null,end_date = null,operation = null,wastage_type = null){
    
    $.ajax({
      url: 'getRawMaterialCost',
      method: "post",
      data: {
        start_date:start_date,
        end_date : end_date,
        operation: operation,
        wastage_type:wastage_type,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {
  
        $('#rawmaterialwastage').html(data);
        
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
    });
  }
  function getCoverWastageCost(start_date = null,end_date = null ,operation = null,wastage_type = null){
    
    $.ajax({
      url: 'getCoverWastageCost',
      method: "post",
      data: {
        start_date:start_date,
        end_date : end_date,
        operation: operation,
        wastage_type:wastage_type,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {
  
        $('#coverwastage').html(data);
        
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
    });
  }
  function getSignatureWastageCost(start_date = null,end_date = null ,operation = null,wastage_type = null){
    
    $.ajax({
      url: 'getSignatureWastageCost',
      method: "post",
      data: {
        start_date:start_date,
        end_date : end_date,
        operation: operation,
        wastage_type:wastage_type,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {
  
        $('#signaturewastage').html(data);
        
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
    });
  }
  function getGatherWastageCost(start_date = null,end_date = null ,operation = null,wastage_type = null){
    
    $.ajax({
      url: 'getGatherWastageCost',
      method: "post",
      data: {
        start_date:start_date,
        end_date : end_date,
        operation: operation,
        wastage_type:wastage_type,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {
  
        $('#gatherwastage').html(data);
        
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
    });
  }
  function getBookWastageCost(start_date = null,end_date = null ,operation = null,wastage_type = null){
    
    $.ajax({
      url: 'getBookWastageCost',
      method: "post",
      data: {
        start_date:start_date,
        end_date : end_date,
        operation: operation,
        wastage_type:wastage_type,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {
  
        $('#bookwastage').html(data);
        
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
    });
  }
  function getOtherWastageCost(start_date = null,end_date = null ,operation = null,wastage_type = null){
    
    $.ajax({
      url: 'getOtherWastageCost',
      method: "post",
      data: {
        start_date:start_date,
        end_date : end_date,
        operation: operation,
        wastage_type:wastage_type,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {
  
        $('#otherwastage').html(data);
        
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
    });
  }

  function deleteWastageLog(log_id){
    
    $.ajax({
      url: 'deleteWastageLog',
      method: "post",
      data: {
        log_id:log_id,
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


  
  