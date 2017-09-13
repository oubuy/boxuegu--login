require('../common/header');
require('../common/aside');
//获取对应的id
var util = require('../common/util.js');
var cs_id = util.getSearch('cs_id');
$.get('/v6/course/lesson', { cs_id: cs_id }, function(data) {
    if (data.code == 200) {
        //自定义第三步----自定义属性
        data.result.editIndex = 3;
        var html = template('edit3_three', data.result);
        //追加内容
        $('#edit3_tlp').append(html);
    }
});

/**
 + * 编辑章节_数据回显：
 + * 1、因为章节列表是动态生成的，所以需要通过委托的方式给编辑按钮绑定click事件
 + * 2、事件触发时获取按钮身上自定义属性记录的ct_id，用来请求接口获取数据
 + * 3、数据渲染模态框模版，插入到页面中
 + * */
$(document).on('click', '.btn-lesson-edit', function() {
    //获取当前的章节id tc_id
    var data = {
        ct_id: $(this).attr('data-id')
    };
    console.log(data)　
    $.get('/v6/course/chapter/edit', data, function(data) {
        if (data.code == 200) {
            //获取当前id返还的对应的值，用来渲染
            $('#chapterModal').html(template('edit3_modal', data.result))
        }
    })
})