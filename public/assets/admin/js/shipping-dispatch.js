var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'shipping-dispatch/data',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   },
   data: function(d){
    
  },
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'operation_run' , name: 'operation_run', orderable: true, searchable : true},
    {data: 'customer' , name: 'customer', orderable: true, searchable : true},
    {data: 'created_by' , name: 'contact', orderable: true, searchable : true},
    {data: 'date' , name: 'date', orderable: true, searchable : true},
    {data: 'created_at' , name: 'created_at', orderable: true, searchable : true},
    {data: 'description' , name: 'description', orderable: true, searchable : true},
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

});

$('#filterForm').submit(function(e){
  e.preventDefault();
  
  datatabel.draw();
});


function removeRep(e){
    $(e).parent().parent().remove();
  }
  
  function addRepRow(){ 
    $('#templateRow').clone().appendTo("#repRows");
    //Using this, stop duplicating select2 when i use clone function
  
    $('#stock_dispatch_tbl').find('span.select2').remove();
    $('#stock_dispatch_tbl').find('select').removeClass('select2-hidden-accessible');
    $('#stock_dispatch_tbl').find('select').removeAttr('data-select2-id');
  
    $('#stock_dispatch_tbl').find('.select2').select2();
  }
  
  function removeRep(e){
    $(e).parent().parent().remove();
  }

  function viewDispatchDetails(dispatch_id) {

    $.ajax({
        url: 'shipping-dispatch/viewDispatchDetails',
        method: "post",
        data: {
          dispatch_id:dispatch_id,
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
    
          $('#shipping_dispatch_details').html(data);
          
          $('#dispatch_details_tbl').DataTable();
    
          $("#viewShippingDispatchModal").modal('show');
    
        },
        error: function(data){
          notify.error('Something went wrong!');
        }
    });
    
  }