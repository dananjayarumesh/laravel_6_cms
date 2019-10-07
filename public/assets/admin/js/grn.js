var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'grn/data',
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
    {data: 'stock_grn_no' , name: 'stock_grn_no', orderable: true, searchable : true},
    {data: 'stockItem' , name: 'stockItem', orderable: true, searchable : true},
    {data: 'note' , name: 'note', orderable: true, searchable : true},
    {data: 'supplier' , name: 'supplier', orderable: true, searchable : true},
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

$('#filterForm').submit(function(e){
  e.preventDefault();
  
  datatabel.draw();
});

function addRepRow(){ 
  $('#templateRow').clone().appendTo("#repRows");

  //Using this, stop duplicating select2 when i use clone function

  $('#grnlistadd').find('span.select2').remove();
  $('#grnlistadd').find('select').removeClass('select2-hidden-accessible');
  $('#grnlistadd').find('select').removeAttr('data-select2-id');

  $('#grnlistadd').find('.select2').select2();
}

function removeRep(e){
  $(e).parent().parent().remove();
}


function viewStockItem(grn_id){

    $.ajax({
      url: 'grn/viewStockItem',
      method: "post",
      data: {
        grn_id:grn_id,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {

        $('#grnDetails').html(data);
        
        $('#grnDetailsTbl').DataTable();

        $("#viewGrnDetailsModal").modal('show');

      },
      error: function(data){
        notify.error('Something went wrong!');
      }
  });
}



