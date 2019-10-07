var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'license/getLicenses',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   }
 },
 columns:[
 {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
 {data: 'license_key' , name: 'license_key', orderable: true, searchable : true},
 {data: 'exp_date' , name: 'exp_date', orderable: true, searchable : true},
 {data: 'created_by' , name: 'created_by', orderable: true, searchable : true},
 {data: 'created_at' , name: 'created_at', orderable: true, searchable : true},
 ]
}


$(function () {
datatabel = $('.dataTable').DataTable(opt)
});

$('.dataTable').on( 'draw.dt', function () {
   
});
