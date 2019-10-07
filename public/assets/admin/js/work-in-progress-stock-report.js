$(document).ready(function(){

    getWorkProgressFullValue();
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

            var printTitle = 'Work in Progress Report';

            return printTitle
              
          }, className: 'btn btn-primary datatable-print-btn' },
      { extend: 'pdf', 

        title: function(){

            var printTitle = 'Work in Progress Report';

            return printTitle
          
      }, 
        className: 'btn btn-primary datatable-print-btn' },

      { extend: 'print', 
        title: function(){

          var printTitle = 'Work in Progress Report';

          return printTitle
            
        },
        className: 'btn btn-primary datatable-print-btn' }
    ]
   },
   ajax:{
     url:'workProgressstockReportsList',
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
        {data: 'usedOperation' , name: 'usedOperation', orderable: true, searchable : true},
        {data: 'section' , name: 'section', orderable: true, searchable : true},
        {data: 'sub_section' , name: 'sub_section', orderable: true, searchable : true},
        {data: 'isbn_no' , name: 'isbn_no', orderable: true, searchable : true},
        {data: 'production_type' , name: 'production_type', orderable: true, searchable : true},
        {data: 'qty' , name: 'qty', orderable: true, searchable : true},
        {data: 'total_price' , name: 'total_price', orderable: true, searchable : true},
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

    datatabel = $('.dataTable').DataTable()

    getWorkProgressFullValue(start_date,end_date)
    datatabel.draw();
  });

  function getWorkProgressFullValue(start_date = null,end_date = null){
  
    $.ajax({
      url: 'getWorkProgressFullValue',
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

        $('#tileName').html('Work in Progress Full Total');
        $('#allstocktotal').html(data);
  
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
    });
  }
  
  
