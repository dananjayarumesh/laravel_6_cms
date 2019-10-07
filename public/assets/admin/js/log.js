var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'log/data',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   }
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'description' , name: 'description', orderable: true, searchable : true},
    {data: 'created_by' , name: 'created_by', orderable: true, searchable : true},
    {data: 'reference' , name: 'reference', orderable: true, searchable : true},
    {data: 'ip' , name: 'ip', orderable: true, searchable : true},
    {data: 'created_at' , name: 'created_at', orderable: true, searchable : true},
 ]
}

$(function () {
datatabel = $('.dataTable').DataTable(opt)
});

$('.dataTable').on( 'draw.dt', function () {
   
});