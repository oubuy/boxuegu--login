require('../common/aside.js');
require('../common/header.js');

require('../common/loading.js');
require('../common/common.js');
var util = require('../common/util');


/*功能点：
+ * 1、数据回显，需要确定你编辑的是那个学科
+ * 2、表单提交*/
//获取id
var cg_id = util.getSearch('cg_id');
$.get('/v6/category/edit', { cg_id: cg_id }, function(data) {
    console.log(11)
    if (data.code == 200) {
        //动态渲染数据
        var html = template('list-form', data.result);
        $('.category-edit').html(html);
    }
});
//动态渲染都要使用事件委托来实现事件
$('#editForm').ajaxForm({ //提交数据
    delegation: true, //是事件委托
    success: function(data) {
        if (data.code == 200) {
            alert('修改成功');
        }
    }

})