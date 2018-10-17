var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('scss', function() {
	return gulp.src(['src/css/*.scss', 'src/css/*.css'])
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false
	});
});

gulp.task('html', function() {
  return gulp.src(['src/*.html'])
		.pipe(gulp.dest('build'))
		.pipe(browserSync.reload({stream: true}));
})

gulp.task('images', function() {
  return gulp.src(['src/img/*.png', 'src/img/*.jpg', 'src/img/*.svg'])
		.pipe(gulp.dest('build/img'))
		.pipe(browserSync.reload({ stream: true }));
})

gulp.task('build', ['scss', 'html', 'images'])

gulp.task('watch', ['browser-sync', 'scss', 'html'], function() {
	gulp.watch(['src/css/*.scss'], ['scss']); 
	gulp.watch('src/*.html', ['html']);
	gulp.watch(['src/img/*.png', 'src/img/*.jpg', 'src/img/*.svg'], ['images']);
});

gulp.task('default', ['watch']);