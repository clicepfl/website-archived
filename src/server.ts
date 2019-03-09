/**
 * Main app entry point
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */

import express from 'express'

/**
 * Initialize express server
 */
const app = express()

/**
 * Server config
 */
const config = {
    port: 8000
}

/**
 * Express routing
 */
app.get('/', (req, res) => {
    res.sendFile('static/index.html', { root: __dirname })
})
//expose static assets
app.use(express.static('/vendor/'))
app.use(express.static('/public/'))
app.use(express.static('/static/'))

/**
 * Start express server
 */
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`)
})