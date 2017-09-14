/**
 * 
 */
var isLogin = !!$.cookie('PHPSESSID'); //是否已登录  双!号表示转布尔值
var isLoginPage = location.pathname == '/dist/html/user/login.html'; //用户是否在登录页面


//如果用户打开登录页面时，已经登录，那么自动转到首页
if (isLogin && isLoginPage) {
    location.href = '/dist';
} else if (!isLogin && !isLoginPage) {
    location.href = '/dist/html/user/login.html';
}