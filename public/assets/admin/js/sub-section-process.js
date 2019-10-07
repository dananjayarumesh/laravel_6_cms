var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url: crud.resource + '/data',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   }
 },
 columns:[
 {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
 {data: 'name' , name: 'name', orderable: true, searchable : true},
 {data: 'parent' , name: 'parent', orderable: true, searchable : true},
 // {data: 'subprocess' , name: 'subprocess', orderable: true, searchable : true},
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

function getSubProcessByMainProcess(){
  var main_process = $("#main_process").val();
  $.ajax({
    url: crud.resource +'/getSubProcessByMainProcess',
    method: "post",
    data: {
      main_process:main_process,
    },
    dataType: 'JSON',
    beforeSend: function () {},
    complete: function () {},
    success: function (data) {

      console.log(data);

      var options = '<option value="">--- Select Sub Process (Level 1) ---</option>';
      $.each( data, function( index, row ){
        options += '<option value="'+row.id+'">'+row.name+'</option>';
      });
      
      $('#sub_process').html(options);

    },
    error: function(data){
    }
  });
}


