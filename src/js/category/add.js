require('../common/aside.js');
require('../common/header.js');

//动态渲染数据 发送请求从后台拿取数据来动态渲染
$.get('/v6/category/top', function(data) {
    var html = template('sle_tlp', data.result);
    $('#selectForm').html(html);
});
//创建表格提交
$('#category_add').ajaxForm({
    success: function(data) {
        if (data.code == 200) {
            alert('创建成功');
        }
    }
})