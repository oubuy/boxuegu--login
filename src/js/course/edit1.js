require('../common/header');
require('../common/aside');
require('../common/loading.js');
require('../common/common.js');
var util = require('../common/util.js');



//获取cs_id
var cs_id = util.getSearch('cs_id'); //cs_id是一个键
//数据动态渲染
$.get('/v6/course/basic', { cs_id: cs_id }, function(data) {
    if (data.code == 200) {
        //自定义设置是第几步
        data.result.editIndex = 1;
        var html = template('edit1_one', data.result);
        $('#edit1_form').append(html);
    }
});


/**
+ * 学科二级联动：
+ * 1、因为整个数据回显是动态构建的，所以通过委托的方式监听父级学科select的change事件
+ * 2、事件发生时获取所选顶级学科cg_id，调用接口获取对应的子级学科列表
+ * 3、拿到数据后动态生成新的子级option进行替换
+ * */
$(document).on('change', "#category-top-select", function() {
    //先获取顶级学科的id
    var topCgid = $(this).val();
    //利用顶级cg_id获取对应的子级的学科列表
    $.get('/v6/category/child', { cs_id: topCgid }, function(data) {
        var childList = data.result;
        //拼接字符串
        var html = '';
        if (data.code == 200) {
            //遍历childList数组找到对应的子级
            for (var i = 0; i < childList.length; i++) {
                html += '<option value="' + childList[i].cg_id + '">' + childList[i].cg_name + '</option>'
            }
        };
        //进行内容替换
        $('#category-child-select').html(html);
    })
});
//提交
$('#course-edit1-form').ajaxForm({
    delegation: true,
    success: function(data) {
        if (data.code == 200) {
            alert('第一步成功');
            location.href = '/dist/html/course/edit2.html?cs_id=' + cs_id;
        }
    }
})