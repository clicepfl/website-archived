/**
 * gulpfile
 * Defines all tasks to compile the server software
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */
const { exec } = require('child_process')
const gulp = require('gulp')
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
function typescript(callback) {
    /**
     * We are NOT using gulp-typescript because of a bug when using JSON
     * modules: the JSON module files are not copied to output dist directory
     * See https://github.com/ivogabe/gulp-typescript/issues/609
     */
    exec('npx tsc', (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
        callback(err)
    })
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