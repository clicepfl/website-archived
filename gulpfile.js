/**
 * gulpfile
 * Defines all tasks to compile the server software
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */
const gulp = require('gulp');
const gulp_ts = require('gulp-typescript');
const tsProject = gulp_ts.createProject('tsconfig.json');

/**
 * Define tasks as functions
 * (see https://gulpjs.com/)
 */

/// Compile typescript
function typescript() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
}

/**
 * Final definition to run all tasks
 * Add additional tasks functions as parameter
 */
const tasks = gulp.parallel(typescript)

exports.default = tasks