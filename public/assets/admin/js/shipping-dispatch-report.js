$(document).ready(function(){

    // getCost();
  });
  
  var SSPEnable = true;
  var opt = {
   responsive: true,
   processing: true,
   serverSide: true,
   dom: 'Bflrtip',
   responsive: true,
   buttons: {
    buttons: [
      { extend: 'csv', 
          title: function(){

            var start_date = $('#fromDatepicker').val();
            var end_date = $('#toDatepicker').val();

            var printTitle = 'Shipping Dispatch From '+  start_date +' To '+end_date;

            return printTitle
              
          }, className: 'btn btn-primary datatable-print-btn' },
      { extend: 'pdf', 

        title: function(){

            var start_date = $('#fromDatepicker').val();
            var end_date = $('#toDatepicker').val();

            var printTitle = 'Shipping Dispatch From '+  start_date +' To '+end_date;

            return printTitle
          
      }, 
        className: 'btn btn-primary datatable-print-btn' },

      { extend: 'print', 
        title: function(){

            var start_date = $('#fromDatepicker').val();
            var end_date = $('#toDatepicker').val();

            var printTitle = 'Shipping Dispatch From '+  start_date +' To '+end_date;

            return printTitle
            
        },
        className: 'btn btn-primary datatable-print-btn' }
    ]
   },
   ajax:{
     url:'shippingDispatchReportList',
     type:'POST',
     dataType: 'JSON',
     beforeSend: function (xhr) {
       xhr.setRequestHeader('Authorization');
     },
     data: function(d){

      d.start_date = $('#fromDatepicker').val();
      d.end_date = $('#toDatepicker').val();
    },

   },
   columns:[
        {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
        {data: 'shipping_dispatch_no' , name: 'shipping_dispatch_no', orderable: true, searchable : true},
        {data: 'usedOperation' , name: 'usedOperation', orderable: true, searchable : true},
        {data: 'isbn_no' , name: 'isbn_no', orderable: true, searchable : true},
        {data: 'customer' , name: 'customer', orderable: true, searchable : true},
        {data: 'country' , name: 'customer', orderable: true, searchable : true},
        {data: 'dispatch_qty' , name: 'dispatch_qty', orderable: true, searchable : true},
        {data: 'total_qty' , name: 'total_qty', orderable: true, searchable : true},
        {data: 'description' , name: 'description', orderable: true, searchable : true},
   ]
  }
  
  
  $(function () {

    datatabel = $('.dataTable').DataTable(opt);
    
  });
  
  $('.dataTable').on( 'draw.dt', function () {
     
  });

  $('#filterForm').submit(function(e){
    e.preventDefault();
    var stock_level = $('#stock_level').val()

    var start_date = $('#fromDatepicker').val();
    var end_date = $('#toDatepicker').val();

    datatabel = $('.dataTable').DataTable()

    // getCost(stock_level,start_date,end_date)
    datatabel.draw();
  });