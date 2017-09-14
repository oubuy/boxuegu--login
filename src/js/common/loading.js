/**
 + * ajax添加loading：
 + * 1、我们通过js的方式拼写loading的html片段，把它添加到body里
 + * 2、在ajax发送请求时让loading展示
 + * 3、ajax请求完毕时让loading隐藏
 + * */
//进度条是由样式控制的
var loadingHTML = '<div class="overlay">' + '<img src="/public/img/loading.gif"/>' + '</div>';
$('body').append(loadingHTML);

//第一个请求就开始展示loading   ajax事件都是在document上
$(document).on('ajaxStart', function() {
        $('.overlay').show();
    })
    // 最后一个请求结束时隐藏loading
$(document).on('ajaxStop', function() {
    $('.overlay').hide();
});