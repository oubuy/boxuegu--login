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
})