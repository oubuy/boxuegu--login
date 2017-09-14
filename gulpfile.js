//加载打包框架
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream'); //这个包可以吧普通的数据流转为vinyl对象文件格式
// var buffer = require('vinyl-buffer');
var buffer = require('vinyl-buffer') //这个包用于将vinyl流转化为buffered vinyl文件
    //提取公共样式的插件
var htmlReplace = require('gulp-html-replace');
//html处理
gulp.task('html', function() {
    // gulp.src(['src/html/**/*.html', 'index.html'])
    gulp.src(['src/**/*.html', 'index.html'])
        .pipe(htmlReplace({ //代替相同的部分
            style: gulp.src('./src/html/common/style.html'),
            aside: gulp.src('src/html/common/aside.html'),
            header: gulp.src('src/html/common/header.html'),
            courseEditHeader: gulp.src('src/html/common/course/header.html'),
            courseEditaside: gulp.src('src/html/common/course/aside.html'),

        }))
        .pipe(htmlmin({ //还有四句代码
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist'))
});

//less处理
gulp.task('less', function() {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
});
//处理js

//配置要打包的第三包路径
//引入第三包，使用数组，方便
var jsLibs = [
    'node_modules/art-template/lib/template-web.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/jquery-form/dist/jquery.form.min.js',
    'node_modules/jquery.cookie/jquery.cookie.js',
    'node_modules/nprogress/nprogress.js',
];
//合并所有的第三方包为一个js
gulp.task('jsLib', function() {
    gulp.src(jsLibs)
        .pipe(concat('libra.js')) //合并到lib.js文件中
        .pipe(gulp.dest('dist/js'))
});

//打包commonjs模块----->只针对js代码打包
/***其中src/js/commom目录下的文件不需要打包，因为将来哪个页面脚本需要他require就可以了
 * 只要require了，就自动打包了对应的页面脚本
 * 2.剩下其他目录的js都要打包，这些都是对应一个html页面，他们时这些页面
 * 入口文件。但是browserify不支持通配符写法，只能一个一个写，
 * 所以我们采用一个循环结构来处理，高循环结构。
 * 通常要有一个对象或数组，我们使用一个储存所有要打包的js路径数组，然后遍历打包
 */

//因为js代码必须要经过 预编译（打包处理），浏览器才能打开；
//数组
var jsModules = [
    // 首页
    'src/js/index.js',
    // 用户
    'src/js/user/login.js',
    'src/js/user/repass.js',
    'src/js/user/profile.js',
    // 讲师
    'src/js/teacher/add.js',
    'src/js/teacher/edit.js',
    'src/js/teacher/list.js',
    // 课程
    'src/js/course/add.js',
    'src/js/course/edit1.js',
    'src/js/course/edit2.js',
    'src/js/course/edit3.js',
    'src/js/course/list.js',
    // 学科分类
    'src/js/category/add.js',
    'src/js/category/edit.js',
    'src/js/category/list.js'
];
//通常要有一个对象或数组，我们使用一个储存所有要打包的js路径数组，然后遍历打包
// //数组使用foreach()遍历方便取值
gulp.task('js', function() {
    //遍历数组
    jsModules.forEach(function(valuePath) {
        //将字符串分割成数组
        var arrPath = valuePath.split('/');
        //截取最后一个
        var lastValue = arrPath.pop();
        //截取第一个
        arrPath.shift();
        //commonJS打包js模块，并运行， //js经过commonJS转换才能在浏览器执行
        browserify(valuePath, { debug: true }).bundle() //打包js
            .pipe(source(lastValue)) // 把结果转换为Stream的vinyl对象，还需进一步转换为Buffer的vinyl对象,就是处理兼容，因为他读取不了gulp,所以要转换
            .pipe(buffer()) //转换后与gulp的src方法返回类型一致，这样就可以继续调用gulp方法与gulp插件了
            //压缩js
            // .pipe(uglify())
            //写在文件夹中
            .pipe(gulp.dest('dist/' + arrPath.join('/')))

    })
})

//例子：
// //通常要有一个对象或数组，我们使用一个储存所有要打包的js路径数组，然后遍历打包
// //数组使用foreach()遍历方便取值
// var arrPath = ['aa/js/index.js', 'bb/c/js/user.js', 'cc/naf/name/js/page.js'];
// gulp.task('js', function() {
//         arrPath.forEach(function(valuePath) {
//             //先把数组中每一个值（字符串）转换成数组
//             var pathArr = valuePath.split('/') //把字符串分割成数组
//                 //截取最后一个值
//             var lastValue = pathArr.pop();
//             //截取第一个字符串值
//             pathArr.shift();

//             browserify(valuePath).bundle() //打包index.js---->browserify只能打包js
//                 .pipe(source(lastValue)) // 把结果转换为Stream的vinyl对象，还需进一步转换为Buffer的vinyl对象,就是处理兼容，因为他读取不了gulp,所以要转换
//                 .pipe(buffer()) // 转换后与gulp的src方法返回类型一致，这样就可以继续调用gulp方法与gulp插件了，他也是，同理
//                 // .pipe(uglify())
//                 .pipe(gulp.dest('dist/' + pathArr.join('/')))

//         });
//     })
//统一打包任务
gulp.task('build', function() {
    //调用以上的任务
    gulp.run(['html', 'less', 'js']);
});
//监听变化，自动修改
gulp.task('default', function() {
    //监听代码变化必须要运行以上的代码，才能知道变化花
    gulp.run('build');
    //html
    gulp.watch(['src/**/*.html', 'index.html'], function() {
        gulp.run('html');
    });
    //监听js  **/代表任意文件夹---》然后再去找*.js文件
    gulp.watch(['src/**/*.js'], function() {
        gulp.run('js')
    });
    //监听less
    gulp.watch(['src/**/*.less'], function() {
        gulp.run('less')
    })
})