/**
 * 添加页面的进度条：
 * 1.首先调用进度条的start方法
 * 2。然后监听window的load事件，触发时候调用进度条的done方法
 */
NProgress.start();
window.onload = function() {
    NProgress.done();
}


/**
 *  登陆权限校验：
 * 1、我们先在前端拿到本地的cookie，看看其中有没有PHPSESSID这一项
 *      有：就认为用户已登陆;
 * 2.判断是否在登录页面
 */
var isLogin = !!$.cookie('PHPSESSID'); //是否已登录  双!号表示转布尔值
var isLoginPage = location.pathname == '/dist/html/user/login.html'; //用户是否在登录页面


//如果用户打开登录页面时，已经登录，那么自动转到首页
if (isLogin && isLoginPage) {
    location.href = '/dist';
} else if (!isLogin && !isLoginPage) {
    location.href = '/dist/html/user/login.html';
}