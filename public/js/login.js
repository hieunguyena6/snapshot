function isEmail(inputEmail) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(inputEmail);
}
function validatePassword(inputPassword) {
	return inputPassword.length > 4;
}

$(document).ready(function(){
    $('#email').change(function(){
        var email = $(this).val().trim();
        if(!isEmail(email)) {
            $(".emailError").html("Email không đúng định dạng");
        } else {
            $(".emailError").html("");
        }
    });
    $('#password').change(function(){
        var password = $(this).val();
        if(!validatePassword(password)) {
			$(".error").text("Mật khẩu phải lớn hơn 5 ký tự");
		} else {
			$(".passwordError").html("");
		}
    });
});

$(function(){
			//on keypress
			$('#confpass').keyup(function(e){
				//get values
				var pass = $('#pass').val();
				var confpass = $(this).val();
				//check the strings
				if(pass == confpass && pass.length > 5){
					//if both are same remove the error and allow to submit
					$('.error').text('');
					$('#register').prop('disabled', false);
				}else {
					//if not matching show error and not allow to submit
					$('.error').text('Mật khẩu nhập lại không đúng hoặc không đủ 6 ký tự.');
					$('#register').prop('disabled', true);
				}
			});
		});
