 var SSPEnable = true;
 var opt = {
  responsive: true,
  processing: true,
  serverSide: true,
  ajax:{
    url:'company/data',
    type:'POST',
    dataType: 'JSON',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization');
    }
  },
  columns:[
  {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
  {data: 'name' , name: 'name', orderable: true, searchable : true},
  {data: 'address' , name: 'address', orderable: true, searchable : true},
  {data: 'contact_no' , name: 'contact_no', orderable: true, searchable : true},
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

function viewcompany(companyId){

  $.ajax({
    url: 'company/viewcompany',
    method: "post",
    data: {
      companyId:companyId,
    },
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {

      $('#companyDetails').html(data);
      
      $('#companyDetailsTable').DataTable();

      $("#viewCompanyModal").modal('show');
      
      
    },
    error: function(data){
      notify.error('Something went wrong!');
    }
});
}
