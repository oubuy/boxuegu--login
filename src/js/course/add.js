require('../common/aside');
require('../common/header');
//添加
$('#course_Add').ajaxForm(function(data) {
    if (data.code == 200) {
        console.log(data.result.cs_id)
        alert('创建成功');
        location.href = '/dist/html/course/edit1.html?cs_id=' + data.result.cs_id; //可以让每一页获取对应的Id号
    }
})