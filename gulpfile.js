var gulp = require('gulp');
var eslint = require('gulp-eslint');

var src = [
    'src/*.js'
];

gulp.task('lint', function() {
    return gulp.src(src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint']);
