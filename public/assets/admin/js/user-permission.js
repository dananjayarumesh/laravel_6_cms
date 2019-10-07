var SSPEnable = true;
var opt = {
  responsive: true,
  processing: true,
  serverSide: true,
  ajax: {
    url: 'permission/userData',
    type: 'POST',
    dataType: 'JSON',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization');
    },
    data: function (data) {
      data.user = $('#user').val()
    }
  },
  columns: [
    { data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: true },
    { data: 'name', name: 'name', orderable: true, searchable: true },
    { data: 'action', name: 'action', orderable: false, searchable: false },
  ]
}

// function successHandler(form,data){
//   returnMessage('success',data.msg);
// }

$(function () {
  datatabel = $('.dataTable').DataTable(opt)
});

// clear filter input
$('#user').change(function (event) {
  datatabel.draw();
});

function assignPermission(element) {

  let permission = $(element).val();

  if ($(element).prop('checked')) {

  }
}

function successHandler(form, data) {
  // keep this to replace default behavior
}