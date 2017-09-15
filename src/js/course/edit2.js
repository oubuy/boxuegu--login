require('../common/header');
require('../common/aside');
require('../common/loading.js');
require('../common/common.js');

//请求获取id号
var util = require('../common/util.js');
var cs_id = util.getSearch('cs_id'); //因为是键值对形式，直接穿个键名，就可以获取对应的值
//动态渲染数据展示信息
$.get('/v6/course/picture', { cs_id: cs_id }, function(data) {
    if (data.code == 200) {
        //自定义设置是第几步
        data.result.editIndex = 2;
        var html = template('edit2_two', data.result);
        $('#edit2_step').append(html);
        initPlugin();
    }
});

function initPlugin() {
    $('#uploadify').uploadify({
        swf: '/lib/jquery-uploadify/uploadify.swf', // 这个是flash脚本，必须引入，不然无法选择文件
        uploader: '/v6/uploader/cover', // 这个是上传图片的接口
        fileTypeExts: '*.gif; *.jpg; *.png', // 这个用来限制上传图片的类型
        fileObjName: 'cs_cover_original', // 这个用来设置提交给后端时，文件数据对应的name,stream 类型课程图片
        formData: { // 如果接口需要额外的数据，通过这个配置来添加
            cs_id: cs_id
        },
        buttonText: '上传',
        buttonClass: 'btn btn-success btn-sm', //按钮的类  引入样式
        onUploadSuccess: function(file, dataStr) {
            //成功回调，动态渲染图片，dataStr是返还的结果，不过是字符串
            var data = JSON.parse(dataStr);
            $('.preview img').attr('src', data.result.path);

        }

    })
}