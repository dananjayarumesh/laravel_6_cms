var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'customer/data',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   },
   data: function(d){
    
  },
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'customer_no' , name: 'customer_no', orderable: true, searchable : true},
    {data: 'name' , name: 'name', orderable: true, searchable : true},
    {data: 'email' , name: 'email', orderable: true, searchable : true},
    {data: 'contact' , name: 'contact', orderable: true, searchable : true},
    {data: 'address' , name: 'address', orderable: true, searchable : true},
    {data: 'created_by' , name: 'created_by', orderable: true, searchable : true},
    {data: 'created_at' , name: 'created_at', orderable: true, searchable : true},
    {data: 'action' , name: 'action', orderable: false, searchable : false},
 ]
}

// function successHandler(form,data){
//   returnMessage('success',data.msg);
// }

$(function () {
datatabel = $('.dataTable').DataTable(opt)
});

$('.dataTable').on( 'draw.dt', function () {

});

$('#filterForm').submit(function(e){
  e.preventDefault();
  
  datatabel.draw();
});




