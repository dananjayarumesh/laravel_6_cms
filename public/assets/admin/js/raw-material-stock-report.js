$(document).ready(function(){

  getRawMaterialValue();
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

            var printTitle = 'Raw Material Report';

            return printTitle
              
          }, className: 'btn btn-primary datatable-print-btn' },
      { extend: 'pdf', 

        title: function(){

        var printTitle = 'Raw Material Report';

        return printTitle
          
      }, 
        className: 'btn btn-primary datatable-print-btn' },

      { extend: 'print', 
        title: function(){

            var printTitle = 'Raw Material Report';

            return printTitle
            
        },
        className: 'btn btn-primary datatable-print-btn' }
    ]
   },
   ajax:{
     url:'rawMaterialStockReportsList',
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
        {data: 'grn_detail_no' , name: 'grn_detail_no', orderable: true, searchable : true},
        {data: 'srockItemno' , name: 'srockItemno', orderable: true, searchable : true},
        {data: 'srockItem' , name: 'srockItem', orderable: true, searchable : true},
        {data: 'grn_no' , name: 'grn_no', orderable: true, searchable : true},
        {data: 'qty' , name: 'qty', orderable: true, searchable : true},
        {data: 'unit_price' , name: 'unit_price', orderable: true, searchable : true},
        {data: 'total_price' , name: 'total_price', orderable: true, searchable : true},
        {data: 'created_at' , name: 'created_at', orderable: true, searchable : true},
   ]
  }
  
  
  $(function () {

    datatabel = $('.dataTable').DataTable(opt);
    
  });
  
  $('.dataTable').on( 'draw.dt', function () {
     
  });

  $('#filterForm').submit(function(e){
    e.preventDefault();

    var start_date = $('#fromDatepicker').val();
    var end_date = $('#toDatepicker').val();

    datatabel = $('.dataTable').DataTable();

    getRawMaterialValue(start_date,end_date)
    datatabel.draw();
  });

  function getRawMaterialValue(start_date = null,end_date = null){
  
    $.ajax({
      url: 'getRawMaterialValue',
      method: "post",
      data: {
        start_date:start_date,
        end_date:end_date,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {

        $('#tileName').html('Raw Material Full Total');
        $('#allstocktotal').html(data);
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
    });
  }
  
  
