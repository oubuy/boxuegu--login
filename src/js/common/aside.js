var userinfoStr = localStorage.getItem('usernifo');
//转对象
var usernifo = JSON.parse(userinfoStr);
//获取图片的属性
$('.aside img').attr('src', usernifo.tc_avatar);
$('.aside h4').text(usernifo.tc_name);
//点击下拉和显示
$('.navs a').on('click', function() {
    $(this).next('ul').slideToggle();
});
//聚标
var path = location.pathname;
//排他思想
$('.navs a').removeClass('active');
$('.navs a[href="' + path + '"]').addClass('active').parents().show();