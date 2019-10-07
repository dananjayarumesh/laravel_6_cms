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

            var printTitle = 'Dialy Employee Allocation for Job';

            return printTitle
              
          }, className: 'btn btn-primary datatable-print-btn' },
      { extend: 'pdf', 

        title: function(){

            var printTitle = 'Dialy Employee Allocation for Job';

            return printTitle
          
      }, 
        className: 'btn btn-primary datatable-print-btn' },

      { extend: 'print', 
        title: function(){

            var printTitle = 'Dialy Employee Allocation for Job';

            return printTitle
            
        },
        className: 'btn btn-primary datatable-print-btn' }
    ]
   },
 ajax:{
   url:'dailyLaborAllocationList',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   },
   data: function(d){
    d.start_date = $('#fromDatepicker').val()
    d.end_date = $('#toDatepicker').val()
    d.operation = $('#operation').val()
  },
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'operation_no' , name: 'operation_no', orderable: true, searchable : true},
    {data: 'labor' , name: 'labor', orderable: true, searchable : true},
    {data: 'main_process' , name: 'main_process', orderable: true, searchable : true},
    {data: 'section_process' , name: 'section_process', orderable: true, searchable : true},
    {data: 'date' , name: 'date', orderable: true, searchable : true},
    {data: 'start' , name: 'start', orderable: true, searchable : true},
    {data: 'end' , name: 'end', orderable: true, searchable : true},
    {data: 'ot_minutes' , name: 'ot_minutes', orderable: true, searchable : true},
    {data: 'double_ot_minutes' , name: 'double_ot_minutes', orderable: true, searchable : true},
    {data: 'normal_hour' , name: 'normal_hour', orderable: true, searchable : true},
    {data: 'total_cost' , name: 'total_cost', orderable: true, searchable : true},
    {data: 'created_by' , name: 'created_by', orderable: false, searchable : false},
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
  // getLaborCost(start_date,end_date);
  datatabel.draw();
});