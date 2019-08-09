/**
 * Express main router : defines endpoints for modules
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */

import express from 'express'

/// Create new router
const router = express.Router()

// Homepage
router.get('/', (req, res) => {
    res.render('index.html')
})

/**
// IC Boost day
router.get(['/icbd', '/icboostday', '/events/icbd'], (req, res) => {
    res.sendFile('static/icbd.html', { root: config.root })
})
// About page
router.get(['/about'], (req, res) => {
    res.sendFile('static/about.html', { root: config.root })
})
// Static assets
router.use(express.static('public/'))
*/

/// 404 handle
/// Must be at the end of the routing list !
router.use((req, res, next) => {
    res.status(404).render('error-pages/404.html')
})

export { router }