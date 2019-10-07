var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'supplier/getSupplier',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   }
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'supplier_no' , name: 'supplier_no', orderable: true, searchable : true},
    {data: 'name' , name: 'name', orderable: true, searchable : true},
    {data: 'phone' , name: 'phone', orderable: true, searchable : true},
    {data: 'email' , name: 'email', orderable: true, searchable : true},
    {data: 'address' , name: 'address', orderable: true, searchable : true},
    {data: 'createdDate' , name: 'createdDate', orderable: true, searchable : true},
    {data: 'action' , name: 'action', orderable: false, searchable : false},
 ]
}

$(function () {
datatabel = $('.dataTable').DataTable(opt)
});

$('.dataTable').on( 'draw.dt', function () {
   
});