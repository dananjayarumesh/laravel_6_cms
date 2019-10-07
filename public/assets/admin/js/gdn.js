var SSPEnable = true;
var opt = {
 responsive: true,
 processing: true,
 serverSide: true,
 ajax:{
   url:'gdn/data',
   type:'POST',
   dataType: 'JSON',
   beforeSend: function (xhr) {
     xhr.setRequestHeader('Authorization');
   },
   data: function(d){
    d.start_date = $('#fromDatepicker').val()
    d.end_date = $('#toDatepicker').val()
  },
 },
 columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'isssuto' , name: 'isssuto',orderable: true},
    {data: 'stock_gdn_no' , name: 'stock_gdn_no', orderable: true, searchable : true},
    {data: 'stockItem' , name: 'stockItem', orderable: true, searchable : true},
    // {data: 'qty' , name: 'qty', orderable: true, searchable : true},
    {data: 'note' , name: 'note', orderable: true, searchable : true},
    {data: 'created_by' , name: 'created_by', orderable: true, searchable : true},
    {data: 'createdDate' , name: 'createdDate', orderable: true, searchable : true},
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

function removeRep(e){
  $(e).parent().parent().remove();
}

function addRepRow(){ 
  $('#templateRow').clone().appendTo("#repRows");
  //Using this, stop duplicating select2 when i use clone function

  $('#gdnlistadd').find('span.select2').remove();
  $('#gdnlistadd').find('select').removeClass('select2-hidden-accessible');
  $('#gdnlistadd').find('select').removeAttr('data-select2-id');

  $('#gdnlistadd').find('.select2').select2();
}

function removeRep(e){
  $(e).parent().parent().remove();
}

$('#filterForm').submit(function(e){
  e.preventDefault();
  
  datatabel.draw();
});

function viewStockItem(grn_id){

  $.ajax({
    url: 'gdn/viewStockItem',
    method: "post",
    data: {
      grn_id:grn_id,
    },
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {

      $('#gdnDetails').html(data);
      
      $('#gdnDetailsTbl').DataTable();

      $("#viewGdnDetailsModal").modal('show');

    },
    error: function(data){
      notify.error('Something went wrong!');
    }
});
}

function getStockByItem(element){
  var stock_item = element.value;
  $.ajax({
    url: 'gdn/getStockByItem',
    method: "post",
    data: {
      stock_item:stock_item,
    },
    dataType: 'JSON',
    beforeSend: function () {},
    complete: function () {},
    success: function (data) {

      console.log(data);

      var options = '<option value="">--- Select Stock ---</option>';
      $.each( data, function( qtyindex, qtyrow ){
        $.each(qtyrow.grn_stock, function( stockindex, stockrow ){
          options += '<option value="'+stockrow.id+'">'+stockrow.grn_detail_no+' - '+qtyrow.exsit_qty[stockindex]+' - '+stockrow.unit_price.toFixed(2)+'</option>';
        });
        
      });

      $(element).parent().parent().find('.stock-items').html(options);

    },
    error: function(data){
    }
  });
}

function getSection(){
  var operation_id = $("#operation_id").val();
  $.ajax({
    url: 'gdn/getSection',
    method: "post",
    data: {
      operation_id:operation_id,
    },
    dataType: 'JSON',
    beforeSend: function () {},
    complete: function () {},
    success: function (data) {

      console.log(data);
      

      var options = '<option value="">--- Select Sections ---</option>';
      $.each( data, function( index, row ){
        $.each(row.run_section, function( secindex, secrow ){
          
          if(secrow.section.parent_id){
            options += '<option value="'+secrow.id+'">'+row.parent_name[secindex]+' ( '+secrow.section.name+')</option>';
          }else{
            options += '<option value="'+secrow.id+'">'+row.parent_name[secindex]+'</option>';
          }
          
        });
      });
      
      $('#section_id').html(options);

    },
    error: function(data){
    }
  });
}

function getSectionStock(){
  var section_id = $("#section_id").val();
  $.ajax({
    url: 'gdn/getSectionStock',
    method: "post",
    data: {
      section_id:section_id,
    },
    // dataType: 'JSON',
    beforeSend: function () {},
    complete: function () {},
    success: function (data) {

      $('#allocated_item').html(data);
      $('#planned_stock_tbl').DataTable();
      $('#direct_stock_tbl').DataTable();

    },
    error: function(data){
    }
  });
}

function operationList(){
    var issue_status = $("#issues_type").val();
    if(issue_status == 2){
      $('#operation_div').show();
    }else{
      $('#operation_div').hide();
    }
}

