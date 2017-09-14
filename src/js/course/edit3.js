require('../common/header');
require('../common/aside');

require('../common/common.js');
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

 cs_id	number	课程id
ct_id	number	章节id
ct_cs_id	number	章节所属课程
 + * */
$(document).on('click', '.btn-lesson-edit', function() {
    //获取当前的章节id ct_id
    var data = {
        ct_id: $(this).attr('data-id')
    };
    // console.log(data)　
    $.get('/v6/course/chapter/edit', data, function(data) {
        if (data.code == 200) {
            //自定义一个ct_id属性的值   后端需要这个值来区分修改的章节属于那个课程
            data.result.cs_id = cs_id;
            //获取当前id返还的对应的值，用来渲染
            $('#chapterModal').html(template('edit3_modal', data.result))
        }
    })
});
//提交模态框数据
$('#edit3_Form').ajaxForm({
    delegation: true,
    success: lessonSuccess
});


/**
 + * 添加章节：
 + * 1、因为表单要数据回显是动态生成的，所以使用委托的方式给添加按钮绑定click事件
 + * 2、事件触发时使用一个空对象渲染模态框模版，插入到页面中
 + * */
$(document).on('click', '#btn-lesson-add', function() {
    var html = template('edit3_modal', { cs_id: cs_id }); //cs_id必须要传,对应93行value的值
    $('#chapterModal').html(html);
});

/**
 + * 修改或添加章节成功后的处理回调：
 + * 1、如果服务器返回的数据中有result那么证明是添加章节成功了，否则就是修改成功了
 + * 2、不同的情况给出不同的用户提示，然后添加章节成功后清空表单
 + * */


function lessonSuccess(data) {

    if (data.result) {
        alert('添加成功');
        $('#edit3_Form')[0].reset();
    } else {
        alert('修改成功');
    }
}