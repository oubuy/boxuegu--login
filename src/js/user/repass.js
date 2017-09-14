require('../common/aside');
require('../common/header');

require('../common/loading.js');
require('../common/common.js');
//修改密码
$('#re_pass').on('submit', function() {
    //判断新和确认密码是否一致
    if ($('#new_pass').val() != $('#confi_pass').val()) {
        alert('密码不对');
        return false; //阻止事件跳转

    }
    // 这个方法只负责获取表单中的值，发送ajax请求，并不负责表单事件的监听与阻止，
    // 即时调即时发送请求，调用这个方法就相当于调用$.ajax
    // 之前的那个方法比较强大，但是不灵活，这个相对弱一点，但是比较灵活。
    // $('#re_pass').ajaxSubmit({
    //     success: function(result) {
    //         console.log(result);
    //     }
    // })
    $.ajax({
        url: '/v6/teacher/repass',
        type: 'post',
        data: $(this).serialize(),
        success: function(result) {
            alert(result)
            console.log(result);
        }
    })
    return false;
})