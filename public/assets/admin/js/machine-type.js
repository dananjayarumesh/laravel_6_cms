var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'machine-type/machineTypeList',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   }
 },
 columns:[
 {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
 {data: 'machine_type_no' , name: 'machine_type_no', orderable: true, searchable : true},
 {data: 'name' , name: 'name', orderable: true, searchable : true},
 {data: 'created_at' , name: 'created_at', orderable: true, searchable : true},
 {data: 'action' , name: 'action', orderable: false, searchable : false},
 ]
}


$(function () {
datatabel = $('.dataTable').DataTable(opt)
});

$('.dataTable').on( 'draw.dt', function () {

});