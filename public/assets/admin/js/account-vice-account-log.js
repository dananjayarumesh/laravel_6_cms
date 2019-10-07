$(document).ready(function(){

  var start_date = $('#fromDatepicker').val();
  var end_date =  $('#toDatepicker').val();
  var account_id =  $('#account_id').val();

  getOpeningBalance(start_date,end_date,account_id);
  getEndingBalance(start_date,end_date,account_id);

});

var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 "pageLength": 100,
 dom: 'Bflrtip',
  responsive: true,
  buttons: {
  buttons: [
    { extend: 'csv', 
        title: function(){

          var start_date = $('#fromDatepicker').val()
          var end_date = $('#toDatepicker').val()
          var account = $('#account_name').val()

          var printTitle = account +' From '+start_date+' To '+ end_date;

          return printTitle
            
        }, className: 'btn btn-primary datatable-print-btn' },
    { extend: 'pdf', 

      title: function(){

        var start_date = $('#fromDatepicker').val()
        var end_date = $('#toDatepicker').val()
        var account = $('#account_name').val()

        var printTitle = account + ' From '+start_date+' To '+ end_date;

        return printTitle
        
    }, 
      className: 'btn btn-primary datatable-print-btn' },

    { extend: 'print', 
      title: function(){
        var start_date = $('#fromDatepicker').val()
        var end_date = $('#toDatepicker').val()
        var account = $('#account_name').val()

        var printTitle = account + ' From '+start_date+' To '+ end_date;

        return printTitle
          
      },
      className: 'btn btn-primary datatable-print-btn' }
  ]
  },
 ajax:{
   url:'accountView',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   },
   data: function(d){
    d.start_date = $('#fromDatepicker').val()
    d.end_date = $('#toDatepicker').val()
    d.account_id = $('#account_id').val()
  },
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'log_no' , name: 'log_no', orderable: true, searchable : true},
    {data: 'amount' , name: 'amount', orderable: true, searchable : true},
    {data: 'payment_method' , name: 'payment_method', orderable: true, searchable : true},
    {data: 'method_no' , name: 'method_no', orderable: true, searchable : true},
    {data: 'narration' , name: 'narration', orderable: true, searchable : true},
    {data: 'date' , name: 'date', orderable: true, searchable : true},
    {data: 'debit_credit' , name: 'debit_credit', orderable: true, searchable : true},
    // {data: 'narration' , name: 'narration', orderable: true, searchable : true},
    // {data: 'action' , name: 'action', orderable: false, searchable : false},
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
  var account_id =  $('#account_id').val();
  getOpeningBalance(start_date,end_date,account_id);
  getEndingBalance(start_date,end_date,account_id);
  datatabel.draw();
});

function getOpeningBalance(start_date,end_date,account_id){
  
  $.ajax({
    url: 'getOpeningBalance',
    method: "post",
    data: {
      start_date:start_date,
      end_date : end_date,
      account_id:account_id
    },
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {

      $('#opening_balance').html(data);
      
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}

function getEndingBalance(start_date,end_date,account_id){
  
  $.ajax({
    url: 'getEndingBalance',
    method: "post",
    data: {
      start_date:start_date,
      end_date : end_date,
      account_id:account_id
    },
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {

      $('#ending_balnce').html(data);
      
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}