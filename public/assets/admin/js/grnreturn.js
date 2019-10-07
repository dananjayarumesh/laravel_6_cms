var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'grn-return/getGrnReturn',
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
    {data: 'grn_return_no' , name: 'grn_return_no', orderable: true, searchable : true},
    {data: 'grn_no' , name: 'grn_no', orderable: true, searchable : true},
    {data: 'stockItem' , name: 'stockItem', orderable: true, searchable : true},
    {data: 'qty' , name: 'qty', orderable: true, searchable : true},
    {data: 'createdDate' , name: 'createdDate', orderable: true, searchable : true},
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

function getStockByGrn(){

  var grn = $("#grn").val();

  $.ajax({
    url: 'grn-return/getStockByGrn',
    method: "post",
    data: {
      grn:grn,
    },
    dataType: 'JSON',
    beforeSend: function () {},
    complete: function () {},
    success: function (data) {

      console.log(data);

      var options = '<option value="">--- Select Stock ---</option>';
      $.each( data, function( qtyindex, qtyrow ){
        $.each(qtyrow.grn_stock, function( stockindex, stockrow ){
          options += '<option value="'+stockrow.id+'|'+stockrow.srock_item.id+'">'+stockrow.grn_detail_no+' - '+stockrow.srock_item.name+' - '+qtyrow.exsit_qty[stockindex]+' - '+stockrow.unit_price.toFixed(2)+'</option>';
        });
        
      });
      
      $('#grn_sock_id').html(options);

    },
    error: function(data){
    }
  });
}