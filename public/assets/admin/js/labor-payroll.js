var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url: crud.resource + '/payRoll',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   }
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'emp_no' , name: 'emp_no', orderable: true, searchable : true},
    {data: 'etf_no' , name: 'etf_no', orderable: true, searchable : true},
    {data: 'name' , name: 'name', orderable: true, searchable : true},
    {data: 'labor_type' , name: 'labor_type'},
    {data: 'normal_hour' , name: 'normal_hour', orderable: true, searchable : true},
    {data: 'hourly_rate' , name: 'hourly_rate', orderable: true, searchable : true},
    {data: 'ot_hour' , name: 'ot_hour', orderable: true, searchable : true},
    {data: 'ot_hourly_rate' , name: 'ot_hourly_rate', orderable: true, searchable : true},
    {data: 'normal_amount' , name: 'normal_amount', orderable: true, searchable : true},
    {data: 'ot_amount' , name: 'ot_amount', orderable: true, searchable : true},
    {data: 'total_amount' , name: 'total_amount', orderable: true, searchable : true},
    {data: 'full_hour' , name: 'full_hour', orderable: true, searchable : true},
 ]
}


$(function () {
datatabel = $('.dataTable').DataTable(opt)
});

$('.dataTable').on( 'draw.dt', function () {
   
});

