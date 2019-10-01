/**
 * Global configuration settings for the server
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */
const config = {
    port: 8000,
    root: __dirname,
    protocol: 'https',
    url: 'clic.epfl.ch',
    production: process.env.NODE_ENV === 'production',
}

/** Export global server config settings */
export { config }