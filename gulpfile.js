/***********插件**************/
var gulp = require("gulp");
//压缩img（jpg/png/svg/gif）
var imagemin = require("gulp-imagemin");
//检测已压缩，防止重复压缩
var newer = require("gulp-newer");
//HTML代码压缩
var htmlClean = require("gulp-htmlclean");
//js压缩
var jsUglify = require("gulp-uglify");
//js去掉断点语句（debug）
var debug = require("gulp-strip-debug");
//js合成一个文件
var jsConcat = require("gulp-concat");
//less转css
var less = require("gulp-less");
//autoprefixer&cssnano插件使用平台
var postcss = require("gulp-postcss");
//自动补全css3前缀
var autoprefixer = require("autoprefixer");
//压缩css
var cssnano = require("cssnano");
//虚拟服务器
var connect = require("gulp-connect");


//判断是否为开发模式（需要在cmd内 set NODE_ENV=development）
var devMode = process.env.NODE_ENV == "development";
console.log(devMode);



/**********路径********/
var folder = {
    src: "./src/",//引入
    out : './out/'//输出
}


/***********任务***********/
//流读取文件 task running grunt
//task创建images任务
gulp.task("images",function(){
    gulp.src(folder.src + 'images/*')//路径设置（*表全部）
        .pipe(newer(folder.out + 'images'))//监听哪个文件
        .pipe(imagemin())
    //流读取文件（node上的方法） //输出文位置
        .pipe(gulp.dest(folder.out + 'images'))     
});
                //依赖，先执行 [] 内的任务
gulp.task("html",function(){
    var page = gulp.src(folder.src + 'html/*')
    .pipe(connect.reload());
    if(!devMode) {
        page.pipe(htmlClean())
    }
        page.pipe(gulp.dest(folder.out + 'html'))
});

gulp.task("js",function(){
    var page = gulp.src(folder.src + 'js/*')
    .pipe(connect.reload());
    if(!devMode) {
        page.pipe(debug())
            .pipe(jsUglify())
    } 
        page.pipe(gulp.dest(folder.out + 'js'))
});

gulp.task('css',function(){
    var options = [autoprefixer(),cssnano()]
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less())
        .pipe(connect.reload());
        if(!devMode) {
            page.pipe(postcss(options))
        }
        page.pipe(gulp.dest(folder.out + 'css'))
})

gulp.task("watch",function(){
    gulp.watch(folder.src + 'html/*',["html"]);//监听文件  后执行html任务
    gulp.watch(folder.src + 'css/*',["css"]);
    gulp.watch(folder.src + 'images/*',["images"]);
    gulp.watch(folder.src + 'js/*',["js"]);
})

gulp.task("server",function() {
    connect.server({
        port:"8090",//修改端口
        livereload: true//自动刷新页面
    })
})

//gulp默认任务（cmd直接执行gulp）
gulp.task("default",["html","images","js","css","watch","server"]);
