/**
 * gulpfile
 * Defines all tasks to compile the server software
 * CLIC website software
 *
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

/**
 * Compile typescript
 * This compiles all .ts sources in src/ and compile them into dist/. The
 * typescript compiler is configured with the {@link tsconfig.json} file
 */
function typescript() {
    const gulpTsProject = gulpTs.createProject('tsconfig.json');
    return gulpTsProject.src()
        .pipe(gulpTsProject())
        .js.pipe(gulp.dest(DIST));
}

/**
 * Compile sass
 * This compiles style definitions in src/sass/style.sass (and imports) into
 * dist/static/style.css
 */
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