var SSPEnable = true;
var opt = {
  responsive: true,
  processing: true,
  serverSide: true,
  dom: 'Bflrtip',
  responsive: true,
  buttons: {
    buttons: [
      { extend: 'csv', title: 'Operation Run Report', className: 'btn btn-primary datatable-print-btn' },
      { extend: 'pdf', title: 'Operation Run Report', className: 'btn btn-primary datatable-print-btn' },
      { extend: 'print', title: 'Operation Run Report', className: 'btn btn-primary datatable-print-btn' }
    ]
  },
  ajax: {
    url: 'operationReportsList',
    type: 'POST',
    dataType: 'JSON',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization');
    },
    data: function (d) {
      d.filtering_option = $('#filtering_option').val(),
      d.start_date = $('#fromDatepicker').val()
      d.end_date = $('#toDatepicker').val()
    },

  },
  columns: [
    { data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: true },
    { data: 'operation_run_no', name: 'operation_run_no', orderable: true, searchable: true },
    { data: 'book_name', name: 'book_name', orderable: true, searchable: true },
    { data: 'start_date', name: 'start_date', orderable: true, searchable: true },
    { data: 'end_date', name: 'end_date', orderable: true, searchable: true },
    { data: 'status', name: 'status', orderable: true, searchable: true },
    { data: 'total_book_count', name: 'total_book_count', orderable: true, searchable: true },
    { data: 'stock_cost', name: 'stock_cost', orderable: true, searchable: true },
    { data: 'machine_cost', name: 'machine_cost', orderable: true, searchable: true },
    { data: 'labor_cost', name: 'labor_cost', orderable: true, searchable: true },
    { data: 'wastage_cost', name: 'wastage_cost', orderable: true, searchable: true },
    { data: 'total_cost', name: 'total_cost', orderable: true, searchable: true },
    { data: 'created_at', name: 'created_at', orderable: true, searchable: true },
  ]
}


$(function () {
  datatabel = $('.dataTable').DataTable(opt)

});

$('.dataTable').on('draw.dt', function () {

});

$('#filterForm').submit(function (e) {
  e.preventDefault();
  datatabel.draw();
});



