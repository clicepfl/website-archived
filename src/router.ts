/**
 * Express main router, defines URL endpoints for modules
 * CLIC website software
 *
 * URL mount points are relative to the base URL (i.e. URL defined at
 * {@link config.ts} as config.url is root mount point "/")
 *
 * @author  Alexandre CHAU
 */

import express from 'express'
import sitemap from 'express-sitemap'
import { config } from './config'
import { homePage } from './pages/home/home'
import { sponsorsRouter } from './components/sponsors/sponsors-router'

/** Fresh router instance */
const router = express.Router()

/**
 * Homepage
 */
router.get('/', homePage.render)

/**
 * Sponsors router
 * Routes defined in {@link components/sponsors/sponsors-router.ts} will be
 * relative to the /sponsors mount point
 *
 * @example
 * Route defined at "/foo" in components/sponsors/sponsors-router.ts will be
 * mounted at final URL "/sponsors/foo"
 */
router.use("/sponsors", sponsorsRouter)

/**
/// IC Boost day
router.get(['/icbd', '/icboostday', '/events/icbd'], (req, res) => {
    res.sendFile('static/icbd.html', { root: config.root })
})
/// About page
router.get(['/about'], (req, res) => {
    res.sendFile('static/about.html', { root: config.root })
})
*/

/**
 * Compiled assets (styles, JS scripts, ...)
 * Local links relative to root of project
 * The following mounts generated assets in "dist/static" to "/static"
 *
 * @example
 * File "src/sass/style.sass" is compiled into "dist/static/style.css" and
 * hence mounted at URL "/static/style.css"
 */
router.use('/static', express.static('dist/static/'))

/**
 * Vendor libraries assets (downloaded distributable files)
 * Local links relative to root of project
 * The following mounts vendor assets in folder "vendor" to "/vendor"
 *
 * @example
 * Library file downloaded into "vendor/foo.js" is mounted at URL
 * "/vendor/foo.js"
 */
router.use('/vendor', express.static('vendor/'))

/**
 * Other static assets (images, files, general assets, ...)
 * Local links relative to root of project
 * The following mounts general assets in folder "assets/" to "/"
 *
 * @example
 * Asset "assets/foo.png" is mounted at URL "/foo.png"
 *
 * @warning "assets/img/logo.png" MUST be kept at URL "/img/logo.png" even if it
 * requires adding an additional routing rule to preserve it!
 */
router.use("/", express.static('assets/'))

/**
 * Sitemap automatic generation
 */
const sm = sitemap({
    generate: router,
    http: config.protocol,
    url: config.url,
    route: {
        '/': {
            changefreq: 'always',
            priority: 1.0
        }
    }
})
// Sitemap main route
router.get('/sitemap.xml', (req, res) => {
    sm.XMLtoWeb(res)
})
// Sitemap robots config route
router.get('/robots.txt', (req, res) => {
    sm.TXTtoWeb(res)
})

/**
 * 404 handle
 * MUST be at the end of the routing list !
 */
router.use((req, res, next) => {
    res.status(404).render('error-pages/404.njk')
})

/** Export router to mount in express server */
export { router }