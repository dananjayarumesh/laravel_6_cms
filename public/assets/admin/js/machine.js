var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'machine/data',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   }
 },
 columns:[
 {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
 {data: 'machine_no' , name: 'machine_no', orderable: true, searchable : true},
 {data: 'name' , name: 'name', orderable: true, searchable : true},
 {data: 'machinetype' , name: 'machinetype', orderable: true, searchable : true},
 {data: 'hourlyrate' , name: 'hourlyrate', orderable: true, searchable : true},
 {data: 'losthourlyrate' , name: 'losthourlyrate', orderable: true, searchable : true},
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
   // $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
   //   checkboxClass: 'icheckbox_flat-green',
   //   radioClass   : 'iradio_flat-green'
   // })
});

function viewMachine(machineId){

  $.ajax({
      url: 'machine/viewMachineDetails',
      method: "post",
      data: {
        machineId:machineId,
      },
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {

        $('#machineDetails').html(data);
        
        $('#machineLogDetails').DataTable();

        $("#viewMachineModal").modal('show');
        
        
      },
      error: function(data){
        notify.error('Something went wrong!');
      }
  });

}

