require('../common/aside.js');
require('../common/header.js');

require('../common/loading.js');
require('../common/common.js');
//请求加载切割字符串获取id的封装函数
var util = require('../common/util.js');
//获取id
var tc_id = util.getSearch('tc_id');
// console.log(tc_id)
// 获取后台数据渲染
$.get('/v6/teacher/edit', { tc_id: tc_id }, function(data) { //回调函数就是响应成功了
    var html = template('edit_T', data.result);
    // console.log(html)
    $('.teacher_A').html(html);
});
//提交
$('#teacher_Form').ajaxForm({
    delegation: true,
    success: function(data) {
        if (data.code == 200) {
            alert('修改成功');
        }
    }
})