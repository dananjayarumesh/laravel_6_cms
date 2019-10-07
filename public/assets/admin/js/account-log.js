var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'account-log/data',
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
    {data: 'account_log_no' , name: 'account_log_no', orderable: true, searchable : true},
    // {data: 'creditaccount' , name: 'creditaccount', orderable: true, searchable : true},
    // {data: 'bebitaccount' , name: 'bebitaccount', orderable: true, searchable : true},
    {data: 'payment_way' , name: 'payment_way', orderable: true, searchable : true},
    {data: 'payment_method_no' , name: 'payment_method_no', orderable: true, searchable : true},
    {data: 'credit_amount' , name: 'credit_amount', orderable: true, searchable : true},
    {data: 'debit_amount' , name: 'debit_amount', orderable: true, searchable : true},
    {data: 'loggedDate' , name: 'loggedDate', orderable: true, searchable : true},
    {data: 'createdDate' , name: 'createdDate', orderable: true, searchable : true},
    {data: 'narration' , name: 'narration', orderable: true, searchable : true},
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

function successHandler(form,data){
	datatabel.draw();
}

function paymentway(){
  var payement = $('#paymeny_way').val();

  if(payement == 1){
    $('#paymeny_way_details').show();
    $('#cheque').show();
    $('#cash_voucher').hide();
  }else if(payement == 2){
    $('#paymeny_way_details').show();
    $('#cheque').hide();
    $('#cash_voucher').show();
  }else{
    $('#paymeny_way_details').hide();
  }
}

function addCreditRow(){ 
  $('#templateRow').clone().appendTo("#repRows");

  //Using this, stop duplicating select2 when i use clone function

  $('#credit_account_loglistadd').find('span.select2').remove();
  $('#credit_account_loglistadd').find('select').removeClass('select2-hidden-accessible');
  $('#credit_account_loglistadd').find('select').removeAttr('data-select2-id');

  $('#credit_account_loglistadd').find('.select2').select2();
}

function addDebitRow(){ 

  $('#debit_templateRow').clone().appendTo("#debit_repRows");

  //Using this, stop duplicating select2 when i use clone function

  $('#debit_account_loglistadd').find('span.select2').remove();
  $('#debit_account_loglistadd').find('select').removeClass('select2-hidden-accessible');
  $('#debit_account_loglistadd').find('select').removeAttr('data-select2-id');

  $('#debit_account_loglistadd').find('.select2').select2();
}

function removeRep(e){
  $(e).parent().parent().remove();
}

function viewAccountDetails(log_id){

  $.ajax({
    url: 'account-log/viewAccountDetails',
    method: "post",
    data: {
      log_id:log_id,
    },
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {

      $('#account_log_div').html(data);
      
      // $('#storeItemGrnDetails').DataTable();

      // $('#storeItemGdnDetails').DataTable();

      $("#account_view_modal").modal('show');

    },
    error: function(data){
      notify.error('Something went wrong!');
    }
  });
}

function duplicateAmount() {
  alert($(":input[name='debit_account_amount[]']").length);
}
