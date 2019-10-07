$(document).ready(function(){
    $('#operationDetails').DataTable();
    loadOperation();
});

function loadOperation(){

    $.ajax({
        url: 'loadOperation',
        method: "post",
        data: {},
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
  
            $("#latest_operation").html(data);
  
        },
        error: function(data){
          notify.error('Something went wrong!');
        }
    });    
}