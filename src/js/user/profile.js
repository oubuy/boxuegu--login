require('../common/header');
require('../common/aside');

//引擎模板的请求的后天数据
$.ajax({
    url: '/v6/teacher/profile',
    type: 'get',
    success: function(data) {
        if (data.code == 200) {
            $('.teacher-profile').html(template('tpl', data.result))
        }
    }
})