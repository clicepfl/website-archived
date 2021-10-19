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
import { homePage } from './pages/home/home-page'
import { sponsorsRouter } from './components/sponsors/sponsors-router'
import { committeeRouter } from './components/committee/committee-router'
import { newsRouter } from './components/news/news-router'
import { galleryRouter } from './components/gallery/gallery-router'
import { newsPage } from './pages/news/news-page'
import { aboutPage } from './pages/about/about-page'
import { coachingPage } from './pages/coaching/coaching-page'
import { coachingListRouter } from './pages/coaching/coaching-router'
import { notFoundPage } from './pages/404/404-page'
import { commissionRouter } from './pages/commissions/commission-router'
import { commissionsPage } from './pages/commissions/commissions-page'
import { poleRouter } from './pages/about/poles/pole-router'
import { eventRouter } from './pages/events/event-router'
import { eventsPage } from './pages/events/events-page'
import { icfriends } from './pages/icfriends/icfriend-router'
import { icfriends } from './pages/icfriends/icfriends-page'

/** Fresh router instance */
const router = express.Router()

/**
 * Homepage
 */
router.get('/', homePage.render)

/**
 * About page
 */
router.get('/about', aboutPage.render)

/**
 * News page
 */
router.get('/news', newsPage.render)

/**
 * IC Boost day
 */
router.get('/events', eventsPage.render)



/**
 * Commissions page
 */
router.get('/commissions', commissionsPage.render)

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
 * Committee router
 * Routes defined in {@link components/committee/committee-router.ts} will be
 * relative to the /committee mount point
 *
 * @example
 * Route defined at "/foo" in components/committee/committee-router.ts will be
 * mounted at final URL "/committee/foo"
 */
router.use("/committee", committeeRouter)

/**
 * News router
 * Routes defined in {@link components/news/news-router.ts} will be relative
 * to the /news mount point
 *
 * @example
 * Route defined at "/foo" in components/news/news-router.ts will be mounted
 * at final URL "/news/foo"
 */
router.use("/news", newsRouter)

/**
 * Gallery router
 * Routes defined in {@link components/gallery/gallery-router.ts} will be
 * relative to the /gallery mount point
 *
 * @example
 * Route defined at "/foo" in components/gallery/gallery-router.ts will be
 * mounted at final URL "/gallery/foo"
 */
router.use("/gallery", galleryRouter)

router.use("/coaching", coachingListRouter)

router.use("/commissions", commissionRouter)

router.use("/about", poleRouter)

router.use("/events", eventRouter)

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

// Don't ask
router.get('/demission', (req, res) => {
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
})

/**
 * 404 handle
 * MUST be at the end of the routing list !
 */
router.use(notFoundPage.render)

/** Export router to mount in express server */
export { router }
