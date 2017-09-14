require('../common/aside');
require('../common/header');
require('../common/loading.js');
require('../common/common.js');

$.get('/v6/category', function(data) { //相当于成功请求返回的数值
    $('.table-bordered').append(template('category_list', data.result))
})