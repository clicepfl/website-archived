/**
 * Express main router : defines endpoints for modules
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */

import express from 'express'
import sitemap from 'express-sitemap'
import { config } from './config'

/// Create new router
const router = express.Router()

/// Homepage
router.get('/', (req, res) => {
    res.render('index.njk')
})

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

/// Static assets
/// ! Relative to root of project !
router.use(express.static('dist/static/'))
router.use(express.static('assets/'))

/// Sitemap automatic generation
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
/// Sitemap main route
router.get('/sitemap.xml', (req, res) => {
    sm.XMLtoWeb(res)
})
/// Sitemap robots config route
router.get('/robots.txt', (req, res) => {
    sm.TXTtoWeb(res)
})

/// 404 handle
/// Must be at the end of the routing list !
router.use((req, res, next) => {
    res.status(404).render('error-pages/404.njk')
})

export { router }