const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('default', function() {
    gulp.src( ['Sources/Server/ES6/**/*.js', 'Sources/Client/ES6/**/*.js'] )
        .pipe(eslint() )
        .pipe(eslint.format() );

    gulp.src('Sources/Server/ES6/**/*.js')
        .pipe(babel() )
        .pipe(gulp.dest('Sources/Server/ES5') );

    gulp.src('Sources/Client/ES6/**/*.js')
        .pipe(babel() )
        .pipe(gulp.dest('Sources/Client/ES5') );
} );