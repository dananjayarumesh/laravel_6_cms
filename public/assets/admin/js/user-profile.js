function editUserprofile(){

    $.ajax({
      url: 'profile/profile-edit',
      method: "post",
      data: $('#user_profile').serialize(),
      beforeSend: function () {
      },
      complete: function () {
      },
      success: function (data) {

        notify.success(data.msg);

        location.reload();

      },
      error: function(data){
        $.each( data.responseJSON, function(index, row ){
					notify.error(row);
				});
      }
  });
}

