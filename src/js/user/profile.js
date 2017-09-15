require('../common/header');
require('../common/aside');

require('../common/loading.js');
require('../common/common.js');
//引擎模板的请求的后天数据
// $.ajax({
//     url: '/v6/teacher/profile',
//     type: 'get',
//     success: function(data) {
//         if (data.code == 200) {
//             $('.teacher-profile').html(template('tpl', data.result));
//             //成功渲染后才能获取到标签，所以使用函数封装调用
//             initPlugin();
//         }
//     }
// });

$.get('/v6/teacher/profile', function(data) {

        if (data.code == 200) {
            $('.teacher-profile').html(template('tpl', data.result));
            //成功渲染后才能获取到标签，所以使用函数封装调用
            initPlugin();
        }

    })
    //数据提交
    // 因为引擎模板是在请求发送成功后才能生成，所以后面的获取id元素，是获取不到的，必须要使用事件委托
$('#teacher_form').ajaxForm({ //这个插件会自动帮我们发送请求
    delegation: true, //是使用事件委托了
    success: function(data) {
        if (data.code == 200) {
            alert('提交成功')

        }
    }


});

//封装时间
function initPlugin() {
    //日期插件
    $('input[name=tc_birthday]').datepicker({
        language: 'zh-CN',
        format: 'yy-mm-dd',
        endDate: new Date('2010-01-01')
    });
    $('input[name=tc_join_date]').datepicker({
        language: 'zn-CN',
        format: 'yy-mm-dd',
        endDate: new Date('2050-07-01')
    });
    //三级联动插件
    $('#region-container').region({
        url: '/lib/jquery-region/region.json'
    });


    // 富文本编辑器
    window.edit = CKEDITOR.replace('introduce', {
        width: 800,
        skin: 'moono-lisa'
    });

}