/**
 * Server configuration
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */

const config = {
    port: 8000,
    root: __dirname,
    protocol: 'https',
    url: 'clic.epfl.ch',
    production: process.env.NODE_ENV === 'production',
}

export { config }