/**
 * Logging service to broadcast and store global debug messages
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */
class Logger {
    /**
     * Initializes the logging service
     */
    init() {
        // TODO: initialize a logging library here
        // may need to pass the express instance as parameter
    }

    /**
     * Log a global message
     */
    log(message: String) {
        console.log(message)
        // TODO: forward to logging library
    }
}

/**
 * Export a single instance of the logger service
 */
export default new Logger()