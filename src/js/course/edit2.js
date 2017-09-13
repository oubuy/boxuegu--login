require('../common/header');
require('../common/aside');


//请求获取id号
var util = require('../common/util.js');
var cs_id = util.getSearch('cs_id'); //因为是键值对形式，直接穿个键名，就可以获取对应的值
//动态渲染数据展示信息
$.get('/v6/course/picture', { cs_id: cs_id }, function(data) {
    var html = template('edit2_two', data.result);
    $('#edit2_step').append(html);
})