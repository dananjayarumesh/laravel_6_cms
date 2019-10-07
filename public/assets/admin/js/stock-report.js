$(document).ready(function(){

    getCost();
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
            var stock_level = $('#stock_level').val()

            if(stock_level == 1){

              var printTitle = 'Raw Material Report';

              return printTitle
            }else if(stock_level == 2){

              var printTitle = 'Work in Progress Report';

              return printTitle
            }else if(stock_level == 3){

              var printTitle = 'Finished Goods Report';

              return printTitle
            }
              
          }, className: 'btn btn-primary datatable-print-btn' },
      { extend: 'pdf', 

        title: function(){

        var stock_level = $('#stock_level').val()

        if(stock_level == 1){

          var printTitle = 'Raw Material Report';

          return printTitle
        }else if(stock_level == 2){

          var printTitle = 'Work in Progress Report';

          return printTitle
        }else if(stock_level == 3){

          var printTitle = 'Finished Goods Report';

          return printTitle
        }
          
      }, 
        className: 'btn btn-primary datatable-print-btn' },

      { extend: 'print', 
        title: function(){
          var stock_level = $('#stock_level').val()

          if(stock_level == 1){

            var printTitle = 'Raw Material Report';

            return printTitle
          }else if(stock_level == 2){

            var printTitle = 'Work in Progress Report';

            return printTitle
          }else if(stock_level == 3){

            var printTitle = 'Finished Goods Report';

            return printTitle
          }
            
        },
        className: 'btn btn-primary datatable-print-btn' }
    ]
   },
   ajax:{
     url:'stockReportsList',
     type:'POST',
     dataType: 'JSON',
     beforeSend: function (xhr) {
       xhr.setRequestHeader('Authorization');
     },
     data: function(d){
      d.stock_level = $('#stock_level').val();
      d.start_date = $('#fromDatepicker').val();
      d.end_date = $('#toDatepicker').val();
    },

   },
   columns:[
        {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
        {data: 'usedOperation' , name: 'usedOperation', orderable: true, searchable : true},
        {data: 'section' , name: 'section', orderable: true, searchable : true},
        {data: 'sub_section' , name: 'sub_section', orderable: true, searchable : true},
        {data: 'isbn_no' , name: 'isbn_no', orderable: true, searchable : true},
        {data: 'grn_detail_no' , name: 'grn_detail_no', orderable: true, searchable : true},
        {data: 'srockItemno' , name: 'srockItemno', orderable: true, searchable : true},
        {data: 'srockItem' , name: 'srockItem', orderable: true, searchable : true},
        {data: 'grn_no' , name: 'grn_no', orderable: true, searchable : true},
        {data: 'qty' , name: 'qty', orderable: true, searchable : true},
        {data: 'unit_price' , name: 'unit_price', orderable: true, searchable : true},
        {data: 'production_type' , name: 'production_type', orderable: true, searchable : true},
        {data: 'total_price' , name: 'total_price', orderable: true, searchable : true},
        {data: 'created_at' , name: 'created_at', orderable: true, searchable : true},
   ]
  }
  
  
  $(function () {

    datatabel = $('.dataTable').DataTable(opt)

    datatabel.column(1).visible(false);
    datatabel.column(2).visible(false);
    datatabel.column(3).visible(false);
    datatabel.column(4).visible(false);
    datatabel.column(11).visible(false);
    
    
  });
  
  $('.dataTable').on( 'draw.dt', function () {
     
  });

  $('#filterForm').submit(function(e){
    e.preventDefault();
    var stock_level = $('#stock_level').val()

    var start_date = $('#fromDatepicker').val();
    var end_date = $('#toDatepicker').val();

    datatabel = $('.dataTable').DataTable()

    if(stock_level == 2){
      
      datatabel.column(1).visible(true);
      datatabel.column(2).visible(true);
      datatabel.column(3).visible(true);
      datatabel.column(4).visible(false);
      datatabel.column(5).visible(false);
      datatabel.column(6).visible(false);
      datatabel.column(7).visible(false);
      datatabel.column(8).visible(false);
      datatabel.column(9).visible(true);
      datatabel.column(10).visible(false);
      datatabel.column(11).visible(true);
      datatabel.column(12).visible(true);
      datatabel.column(13).visible(false);

    }else if(stock_level == 3){

        datatabel.column(1).visible(true);
        datatabel.column(2).visible(false);
        datatabel.column(3).visible(false);
        datatabel.column(4).visible(true);
        datatabel.column(5).visible(false);
        datatabel.column(6).visible(false);
        datatabel.column(7).visible(false);
        datatabel.column(8).visible(false);
        datatabel.column(9).visible(true);
        datatabel.column(10).visible(false);
        datatabel.column(11).visible(false);
        datatabel.column(12).visible(false);
        datatabel.column(13).visible(false);
      
    }else{
      datatabel.column(1).visible(false);
      datatabel.column(2).visible(false);
      datatabel.column(3).visible(false);
      datatabel.column(4).visible(false);
      datatabel.column(5).visible(true);
      datatabel.column(6).visible(true);
      datatabel.column(7).visible(true);
      datatabel.column(8).visible(true);
      datatabel.column(9).visible(true);
      datatabel.column(10).visible(true);
      datatabel.column(11).visible(false);
      datatabel.column(12).visible(true);
      datatabel.column(13).visible(true);

    }

    getCost(stock_level,start_date,end_date)
    datatabel.draw();
  });

  function getCost(stock_level = null,start_date = null,end_date = null){
  
    $.ajax({
      url: 'getCost',
      method: "post",
      data: {
        stock_level:stock_level,
        start_date:start_date,
        end_date:end_date,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {

        if(stock_level == null || stock_level == 1){
          $('#tileName').html('Raw Material Full Total');
          $('#allstocktotal').html(data);
          $('#total_tile_div').show();
        }else if(stock_level == 2){
          // $('#tileName').html('Work in Progress Full Total');
          // $('#allstocktotal').html(data);
          $('#total_tile_div').hide();
        }else if(stock_level == 3){
          $('#tileName').html('Finished Goods Full Quantity');
          $('#allstocktotal').html(data);
          $('#total_tile_div').show();
        }
  
        
        
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
    });
  }
  
  
