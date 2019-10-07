$(document).ready(function(){

  getDebitTotal();
  getCreditTotal();
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

          var printTitle = 'Trial Balance From '+start_date+' To '+ end_date;

          return printTitle
            
        }, className: 'btn btn-primary datatable-print-btn' },
    { extend: 'pdf', 

      title: function(){

        var start_date = $('#fromDatepicker').val()
        var end_date = $('#toDatepicker').val()

        var printTitle = 'Trial Balance From '+start_date+' To '+ end_date;

        return printTitle
        
    }, 
      className: 'btn btn-primary datatable-print-btn' },

    { extend: 'print', 
      title: function(){
        var start_date = $('#fromDatepicker').val()
        var end_date = $('#toDatepicker').val()

        var printTitle = 'Trial Balance From '+start_date+' To '+ end_date;

        return printTitle
          
      },
      className: 'btn btn-primary datatable-print-btn' }
  ]
  },
ajax:{
   url:'account-summary/data',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   },
   data: function(d){
    d.start_date = $('#fromDatepicker').val()
    d.end_date = $('#toDatepicker').val()
  },
  // success: function (data) {
    
  // },
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'code' , name: 'code', orderable: true, searchable : true},
    {data: 'name' , name: 'name', orderable: true, searchable : true},
    {data: 'account_debit_amount' , name: 'account_debit_amount', orderable: true, searchable : true},
    {data: 'account_credit_amount' , name: 'account_credit_amount', orderable: true, searchable : true},
    {data: 'ending_balance' , name: 'ending_balance', orderable: true, searchable : true},
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
  getDebitTotal(start_date,end_date);
  getCreditTotal(start_date,end_date);
  datatabel.draw();
});

function getDebitTotal(start_date = null,end_date = null){
  
  $.ajax({
    url: 'account-summary/getDebitTotal',
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

      $('#debitTotal').html(data);
      
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}

function getCreditTotal(start_date = null,end_date = null){
  
  $.ajax({
    url: 'account-summary/getCreditTotal',
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

      $('#creditTotal').html(data);
      
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}

