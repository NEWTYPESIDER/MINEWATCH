const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('default', function() {
    // Execute The ESLint
    gulp.src( ['Sources/Server/ES6/**/*.js', 'Sources/Client/ES6/**/*.js'] )
        .pipe(eslint() )
        .pipe(eslint.format() );

    // Convert Server Sources
    gulp.src('Sources/Server/ES6/**/*.js')
        .pipe(babel() )
        .pipe(gulp.dest('Sources/Server/ES5') );

    // Convert Client Sources
    gulp.src('Sources/Client/ES6/**/*.js')
        .pipe(babel() )
        .pipe(gulp.dest('Sources/Client/ES5') );
} );