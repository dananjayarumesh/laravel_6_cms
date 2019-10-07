  var SSPEnable = true;
  var opt = {
  	responsive: true,
  	processing: true,
  	serverSide: true,
  	ajax:{
  		url:'menu/data',
  		type:'POST',
  		dataType: 'JSON',
  		beforeSend: function (xhr) {
  			xhr.setRequestHeader('Authorization');
  		},
      data: function(data){
        data.main_menu = $('#filterMainMenu').val()
        data.sub_menu = $('#filterSubMenu').val()
      }
    },
    columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true,searchable : false},
    {data: 'title' , name: 'title', orderable: true},
    {data: 'icon' , name: 'icon', orderable: true},
    {data: 'url' , name: 'url', orderable: true},
    {data: 'level' , name: 'level', orderable: true},
    {data: 'parents' , name: 'parents', orderable: true},
    {data: 'priority' , name: 'priority', orderable: true},
    {data: 'created_at' , name: 'created_at', orderable: true},
    {data: 'action' , name: 'action', orderable: false, searchable : false},
    ]
  }


  $(function () {
  	datatabel = $('.dataTable').DataTable(opt)
  });

  $('.filter').on('change',function(event) {
    event.preventDefault();
    datatabel.draw();
  });


  function loadSubLevelParents(main_parent,selector) {
  	$.ajax({
  		url: 'menu/getSubMenus',
  		method: 'post',
  		dataType: 'json',
  		data: {
  			'main_parent_id':$(main_parent).val()
  		},
  		beforeSend: function (){
  			$(main_parent).prop('disabled',true);
        $(selector).prop('disabled',true);
      },
      success: function (data) {
       var options = '<option value="">'+$(selector+" option:first").html()+'</option>';
       $.each( data, function( index, row ){
        options += '<option value="'+row.id+'">'+row.title+'</option>';
      });
       $(selector).html(options);
       $(main_parent).prop('disabled',false);
       $(selector).prop('disabled',false);
     },
     error: function(data){
     }
   });
  }

  