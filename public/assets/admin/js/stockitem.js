var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'stock-item/data',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   }
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'stock_item_no' , name: 'stock_item_no', orderable: true, searchable : true},
    {data: 'name' , name: 'name', orderable: true, searchable : true},
    {data: 'stockType' , name: 'stockType', orderable: true, searchable : true},
    {data: 'remainingQty' , name: 'remainingQty', orderable: true, searchable : true},
    // {data: 'unitprice' , name: 'unitprice', orderable: true, searchable : true},
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

function viewStoreDetails(itemId){

    $.ajax({
      url: 'stock-item/viewStoreDetails',
      method: "post",
      data: {
        itemId:itemId,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {

        $('#storeDetails').html(data);
        
        $('#storeItemGrnDetails').DataTable();

        $('#storeItemGdnDetails').DataTable();

        $("#viewStoreItemModal").modal('show');

      },
      error: function(data){
        notify.error('Something went wrong!');
      }
  });
}

