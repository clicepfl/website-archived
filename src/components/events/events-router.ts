import express from 'express'

/** Fresh router instance */
const eventsRouter = express.Router()

/**
 * Sponsors assets (such as logo images)
 * Local links relative to root of project
 * Mounts the sponsor assets in "src/components/sponsors/assets/" to URL
 * "/" relative to the mount point of this router
 *
 * @example
 * If the sponsorsRouter is mounted at "/sponsors" in the top-level router,
 * then the file "src/components/sponsors/assets/foo.png" will be available at
 * final URL route "/sponsors/foo.png"
 */
eventsRouter.use("/", express.static("src/components/events/assets/"))

/** Export sponsors router to mount in main router */
export { eventsRouter }
