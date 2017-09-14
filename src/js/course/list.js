require('../common/aside');
require('../common/header');
require('../common/loading.js');
require('../common/common.js');
//动态渲染
$.get('/v6/course', function(data) {
    var html = template('course_list_tpl', data.result);
    $('#course_List').html(html);
});