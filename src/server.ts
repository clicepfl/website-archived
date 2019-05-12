/**
 * Main app entry point
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */

/**
 * Imports
 */
import express from 'express'
/** Express server instance */
const app = express()
/** Sitemap generator */
const sitemap = require('express-sitemap')

/**
 * Configuration
 */
/** General server config */
const config = {
    port: 8000,
    root: __dirname,
    protocol: 'https',
    url: 'clic.epfl.ch'
}

/**
 * Express routing
 */

// Homepage
app.get('/', (req, res) => {
    res.sendFile('static/index.html', { root: config.root })
})
// IC Boost day
app.get(['/icbd', '/icboostday', '/events/icbd'], (req, res) => {
    res.sendFile('static/icbd.html', { root: config.root })
})
// About page
app.get(['/about'], (req, res) => {
    res.sendFile('static/about.html', { root: config.root })
})
// Static assets
app.use(express.static('public/'))

/** 
 * Sitemap
 */
/** Sitemap automatic generation */
const sm = sitemap({
    generate: app,
    http: config.protocol,
    url: config.url,
    route: {
        '/': {
            changefreq: 'always',
            priority: 1.0
        }
    }
})
app.get('/sitemap.xml', (req, res) => {
    sm.XMLtoWeb(res)
})
app.get('/robots.txt', (req, res) => {
    sm.TXTtoWeb(res)
})

/**
 * 404 handle
 * Must be at the end of the routing list !
 */
app.use((req, res, next) => {
    res.status(404).sendFile('static/404.html', { root: config.root })
})

/**
 * Start express server
 */
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`)
})