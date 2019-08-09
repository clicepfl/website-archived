/**
 * Express server definition and setup
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */

import express from 'express'
import sitemap from 'express-sitemap'
import nunjucks from 'nunjucks'
import { config } from './config'
import { router } from './router'

/// Express server instance
const app = express()

/// Setup template engine
nunjucks.configure('src/views/', {
    autoescape: true,
    express: app,
})

/// Mount main router
app.use('/', router)

/// Sitemap automatic generation
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
/// Sitemap main route
app.get('/sitemap.xml', (req, res) => {
    sm.XMLtoWeb(res)
})
/// Sitemap robots config route
app.get('/robots.txt', (req, res) => {
    sm.TXTtoWeb(res)
})

export { app }