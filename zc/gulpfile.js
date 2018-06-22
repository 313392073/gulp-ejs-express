var gulp = require('gulp');
var js = require("gulp-uglify");
var minify = require('gulp-clean-css');
var less = require("gulp-less");
var htmlmin = require('gulp-htmlmin');
var path = require('path');
var cssBase64 = require('gulp-base64');
var del = require('del');
var css = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
// 删除文件
gulp.task('clean', function(cb) {
    del('./dist')
});
//压缩js
gulp.task('js', function () {
    gulp.src('public/js/**/*.js') // 要压缩的js文件
    .pipe(js())  //使用uglify进行压缩,更多配置请参考：
    .pipe(gulp.dest('dist/js')); //压缩后的路径
});
//编译并压缩less
gulp.task('less', function () {
    return gulp.src('public/style/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssBase64())
        .pipe(minify())
        .pipe(gulp.dest('dist/style/'));
});

//压缩css
gulp.task('css',function () {
    return gulp.src('public/style/*.css')
        .pipe(css({compatibility: 'ie6'}))
        .pipe(minify())
        .pipe(gulp.dest('dist/style/'));
})

//样式工具
gulp.task('ctool',function () {
    return gulp.src('public/style/tool/**/*')
        .pipe(gulp.dest('dist/style/tool'));
})

//公用less
gulp.task('cshare',function () {
    return gulp.src('public/style/share/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssBase64())
        .pipe(minify())
        .pipe(gulp.dest('dist/style/share/'));
})

//压缩图片
gulp.task('img',function () {
   return gulp.src('public/images/*.{jpg,png,gif,ico}')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/img/'))
})

//字体
gulp.task('font', function () {
    return gulp.src('public/font/**/*')
        .pipe(gulp.dest('dist/font/'));
});

// 压缩ejs
gulp.task('ejs', function() {
  return gulp.src('views/**/*.ejs')
   .pipe(htmlmin({collapseWhitespace: true}))
   .pipe(gulp.dest('dist/views/'));
});

// 引用文件
gulp.task('tool', function () {
    return gulp.src('public/tool/**/*')
        .pipe(gulp.dest('dist/tool/'));
});

//监听
gulp.task('build',['less','css','ctool','cshare','js','img','font','ejs'],function(){
	gulp.watch('public/style/**/*',['less']);
	gulp.watch('public/style/**/*',['css']);
	gulp.watch('public/style/tool/**/*',['ctool']);
	gulp.watch('public/style/share/**/*',['cshare']);
	gulp.watch('public/js/**/*',['js']);
	gulp.watch('public/images/**/*',['img']);
	gulp.watch('public/font/**/*',['font']);
	gulp.watch('public/tool/**/*',['tool']);
	gulp.watch('views/**/**/*',['ejs']);
})

gulp.task('default',['build']);