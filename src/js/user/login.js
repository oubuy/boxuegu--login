// 当用户点击登陆按钮的时候，这个插件ajaxForm方法会自动监听submit事件
// 然后阻止浏览器默认的刷新提交，然后自动变成ajax的方式发送请求。
$('#form-data').ajaxForm({
    type: 'post',
    //用法和$.ajax用法一样的
    success: function(result) {
        //判断
        if (result.code == 200) {
            alert('登录成功');
            location.href = '/dist';
        } else {
            alert('登录失败');
        }
    },
    error: function() {
        alert('失败了')
    }
})

// $('#form-data').on('submit', function() {
//     $.ajax({
//         url: '/v6/login',
//         type: 'post',
//         data: $(this).serialize(),
//         success: function(result) {
//             if (result.code == 200) {
//                 alert('登录成功');
//             } else {
//                 alert('登录失败')
//             }

//         }
//     });
//     return false;

// })