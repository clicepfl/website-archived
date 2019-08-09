/**
 * gulpfile
 * Defines all tasks to compile the server software
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */
const gulp = require('gulp');
const gulpTs = require('gulp-typescript');
const gulpSass = require('gulp-sass')
gulpSass.compiler = require('node-sass')

const DIST = 'dist/'

/**
 * Define tasks as functions
 * (see https://gulpjs.com/)
 */

/// Compile typescript
function typescript() {
    const gulpTsProject = gulpTs.createProject('tsconfig.json');
    return gulpTsProject.src()
        .pipe(gulpTsProject())
        .js.pipe(gulp.dest(DIST));
}

/// Compile sass
function sass() {
    return gulp.src('src/sass/style.sass')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest(`${DIST}/static/`))
}

/**
 * Final definition to run all tasks
 * Add additional tasks functions as parameter
 */
const tasks = gulp.parallel(typescript, sass)

exports.default = tasks