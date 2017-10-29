var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var src = 'public';

var paths = {
	js: src + '/js/*.js',
	scss: src + '/css/sass/*.scss'
};
//...

gulp.task('combine-js', [], function () {
	return gulp.src([
        'public/js/*.js',
        '!public/js/combine.js',
        '!public/js/jquery-1.11.2.min.js',
        '!public/js/TweenLite.min.js',
        '!public/js/chat.js',
        '!public/js/poker.js',
        '!public/js/socket.io.js'
    ])
	.pipe(concat('combine.js'))
    .pipe(uglify())
	.pipe(gulp.dest('public/js'));
});

gulp.task('complie-sass', function () {
	return gulp.src([paths.scss])
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
	.pipe(gulp.dest('public/css'));
});


gulp.task('watch',function(){
    gulp.watch(paths.js, ['combine-js']);
    gulp.watch(paths.scss, ['complie-sass']);
});


//...

gulp.task('default', ['watch']);
