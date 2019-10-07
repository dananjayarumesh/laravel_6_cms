 var SSPEnable = true;
      var opt = {
        responsive: true,
        processing: true,
        serverSide: true,
        ajax:{
          url: resource + '/data',
          type:'POST',
          dataType: 'JSON',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization');
          }
        },
        columns:[
        {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
        // {data: 'id' , name: 'id', orderable: true},
        {data: 'name' , name: 'name', orderable: true, searchable : true},
        {data: 'service_type' , name: 'service_type', orderable: true, searchable : true},
        {data: 'due_percentage' , name: 'due_percentage', orderable: true, searchable : true},
        {data: 'description' , name: 'description', orderable: true, searchable : true},
        {data: 'action' , name: 'action', orderable: false, searchable : false},
        ]
      }


       function successHandler(form,data){
        returnMessage('success',data.msg);
      }



       $(function () {
       datatabel = $('.dataTable').DataTable(opt)
     });

     function addClick(e){
      loadModal(resource);
    }

    function editClick(e){
      loadModal(resource,$(e).attr('data-id'));
    }

    function deleteClick(e){
      var delete_confirm = confirm("Please confirm delete");
      if(delete_confirm){
        deleteRow(resource + '/'+ $(e).attr('data-id'));
      }
    }
    
    function loadModal(resource,id = 0){
      var url = '';
      if(id == 0){
        url = resource+"/create";
      }else{
        url = resource+"/"+id+"/edit";
      }

      $.ajax({
        url: url,
        method: "get",
        data: {
          id:id
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
          setModelContent(data);
        },
        error: function(data){

        }
      });
    }

    function setModelContent(data){
      $('#formModal .modal-content').html(data);
      $('#formModal').modal('show');
    }

    function successHandler(form,data){
      $('#formModal').modal('hide');
      datatabel.draw();
    }