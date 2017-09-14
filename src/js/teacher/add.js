require('../common/aside.js');
require('../common/header.js');

require('../common/loading.js');
require('../common/common.js');
//添加讲师

$('#teacherAdd').on('submit', function() {
    console.log(2222)
        //一种方法
    $.ajax({
        url: '/v6/teacher/add',
        type: 'post',
        data: $(this).serialize(),
        success: function(data) {
            alert('修改成功');
        }

    });
    //两种方法
    // $('#teacherAdd').ajaxSubmit({
    //     success: function(result) {
    //         console.log(result);
    //     }
    // })
    return false;

})

//三种方法
// $("#teacherAdd").ajaxForm(function(data) {
//     alert("添加成功")
// })