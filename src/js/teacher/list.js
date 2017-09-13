//加载请求
require('../common/header');
require('../common/aside');
//展示列表
$.ajax({
    url: '/v6/teacher',
    type: 'get',
    success: function(data) {
        $('#tableT').append(template('teacherList', data.result))
    }
});

//查看讲师信息
//使用事件委托去做
$(document).on('click', '.btn_wacth', function() {

    //获取当前的id
    var data = $(this).attr('data-id');


    //发送请求
    $.get('/v6/teacher/view', { tc_id: data }, function(data) { //传参记得是json格式
        console.log(data.result.tc_introduce)
        var html = template('wacthTeacher', data.result);
        $('#table_intr').html(html);
    })
});
//启用和注销事件
$(document).on('click', '.btn_ban', function() {
    //获取当前的id和状态
    var data_id = $(this).attr('data-id');
    var status = $(this).attr('data-status');
    //储存当前的this
    $_this = $(this);
    //发送请求
    $.post('/v6/teacher/handle', { tc_id: data_id, tc_status: status }, function(data) {
        //获取返还的状态做对比
        var newStatus = data.result.tc_status;
        var newStatusValue = newStatus == 0 ? '注销' : '启用';
        //赋值
        $_this.text(newStatusValue);
        $_this.attr('data-status', newStatus)
    })

})