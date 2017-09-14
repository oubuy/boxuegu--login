require('../common/header');
require('../common/aside');

require('../common/loading.js');
require('../common/common.js');
//获取对应的id
var util = require('../common/util.js');
var cs_id = util.getSearch('cs_id');
//定义一个变量用来存储lesson数据
var lessons;

//页面渲染
$.get('/v6/course/lesson', { cs_id: cs_id }, function(data) {
    if (data.code == 200) {
        //返回值中result对象中一个lessons数组 在Network查看
        lessons = data.result.lessons;

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
    //成功回调时，判断
    beforeSubmit: function(arrData, $form, options) { //这几个参数，插件会自动传给后台处理
        arrData.push({
                name: 'ct_is_free',
                value: $('#ct_is_free').prop('checked') ? 1 : 0
            })
            // console.log(arrData)
    },
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
    //添加成功后，并要重置表单
    if (data.result) {
        alert('添加成功');
        //必须在重置前调用，否则会被清空内容
        upLessons(data.result); //得到的是ct_id---》章节id
        $('#edit3_Form')[0].reset();
    } else {
        //修改成功
        alert('修改成功');
        upLessons();
    }
};
/**
 + * 更新章节列表：
 + * lessons: [ {ct_id:"1", "ct_name":"介绍", "ct_video_duration":"3:12"}
 + *                {ct_id:"2", "ct_name":"定位和浮动", "ct_video_duration":"08:14"} ]
 + * 1、获取表单中的章节名称、分钟、秒三个字段，还要获取ct_id字段
 + * 2、其中ct_id编辑和添加章节获取的方式不一样
 + *    2.1、如果是编辑直接从表单中获取即可
 + *    2.2、如果是添加则需要用户传入ct_id
 + * 3、把得到的数据拼成lessons里面的对象的样子
 + * 4、如果是添加章节那么直接把对象push进入即可，如果是编辑找到章节的下标进行splice替换
 + * 5、最后按新的lessons数据重新渲染
 + * */
function upLessons(ct_id) {
    var formData = getFormData();

    var lessonData = {
        ct_id: formData.ct_id || ct_id, // 编辑时候ct_id来自表单，添加时候ct_id来自后端返回值
        ct_name: formData.ct_name,
        ct_video_duration: formData.ct_minutes + ':' + formData.ct_seconds
    };
    //如果是添加章节，直接push到lessons  通过是否有ct_id
    if (ct_id) {
        lessons.push(lessonData); //添加
    } else { //编辑
        var index = getLessonIndex(formData.ct_id); //获取下标ct_id
        lessons.splice(index, 1, lessonData);

    };
    // console.log(lessons);
    $('#lesson-list').html(template('lesson-list-tpl', lessons));
};
/**
 + * 返回模态框form数据构成的对象：
 + * 1、先通过JQ的方法获取一个数组
 + * 2、然后遍历数组中的值重新组织成{ key: val, key: val }的数据形式
 + * */
function getFormData() {
    var formArrData = $('#edit3_Form').serializeArray(); //返回一个数组包含对象形式
    var formData = {};
    //遍历
    for (var i = 0; i < formArrData.length; i++) {
        //赋值  自带属性name 和value
        formData[formArrData[i].name] = formArrData[i].value;
    };
    //返回
    return formData;

};
/**
 + * 通过ct_id返回它在lessons中的下标：
 + * */
function getLessonIndex(ct_id) {
    for (var i = 0; i < lessons.length; i++) {
        //判断章节是否相等
        if (lessons[i].ct_id == ct_id) {
            return i; //返还下标

        }

    }
}