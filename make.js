/**
 * Main build script
 * CLIC website software
 *
 * This script should implement all steps (as promises) required to
 * compile a production version of the software into the {@link dist/}
 * folder. This script should be executed with node (from the root
 * folder of the project) whenever a new version of the software is
 * compiled. It should be called automatically when running
 * `npm install` as it should be registered inside {@link package.json}
 * as a "postinstall" hook.
 *
 * @file This is the main build script for compiling the server software
 * @author Alexandre CHAU
 */

// Dependencies
const del = require('del')
const fs = require('fs')
const sass = require('node-sass')
Promise.sequential = require('promise-sequential')

// Build pipeline definition
clean()
    .then(setup)
    .then(compileSass)
    .catch((err) => {
        console.log(err.message ? err.message : err)
    })


// Function definitions of each step
// Each of the functions should return a promise

/**
 * Cleans previous versions
 * @returns promise with the list of deleted paths
 */
function clean() {
    return del("dist/")
}

/**
 * Setup file structure (dist folder)
 * @returns empty promise
 */
function setup() {
    paths = [
        'dist/',
        'dist/public/'
    ]
    promises = paths.map(path => {
        return () => new Promise((resolve, reject) => {
            fs.mkdir(path, (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    })
    return Promise.sequential(promises)
}

/**
 * Compiles the main sass style into its css file
 * @returns empty promise
 */
function compileSass() {
    return new Promise((resolve, reject) => {
        sass.render({
            file: 'src/sass/style.sass',
            outputStyle: 'compressed'
        }, (err, res) => {
            if (err) reject(err)
            else {
                fs.writeFile('dist/public/style.css', res.css, (errw) => {
                    if (errw) reject(errw)
                    else resolve()
                })
            }
        })
    })
}