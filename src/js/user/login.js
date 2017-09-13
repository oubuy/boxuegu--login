//获取本地储存的值
var loginStr = localStorage.getItem('usernifo') || {};
var loginData = JSON.parse(loginStr);
var loginV = loginData.tc_avatar || '/public/img/default.png';
$('.avatar img').attr('src', loginV);

// 当用户点击登陆按钮的时候，这个插件ajaxForm方法会自动监听submit事件
// 然后阻止浏览器默认的刷新提交，然后自动变成ajax的方式发送请求。
$('#form-data').ajaxForm({
    //用法和$.ajax用法一样的
    success: function(data) {
        //判断
        if (data.code == 200) {
            // alert('登录成功');
            location.href = '/dist';
            //使用本地存储方法：储存数据:参数只能是字符串
            //使用json.stringify()
            localStorage.setItem('usernifo', JSON.stringify(data.result));
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