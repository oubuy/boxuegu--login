$('#logOut').on('click', function() {
    $.ajax({
        url: '/v6/logout',
        type: 'post',
        //退出不需要数据
        success: function(result) {
            if (result.code == 200) {
                // alert('退出成功');
                //跳回首页
                location.href = '/dist/html/user/login.html'

            }
        }
    })
})