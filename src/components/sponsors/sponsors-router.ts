/**
 * Express router for the sponsors component, defines URL for this module
 * CLIC website software
 *
 * URL mount points are relative to the mount point of this router in the
 * top-level {@link ../../router.ts}. For instance, if the top-level router
 * mounts this router at "/sponsors", then "/foo" in this router will map to
 * the final URL "/sponsors/foo"
 *
 * @author Alexandre CHAU
 */
import express from 'express'

/** Fresh router instance */
const sponsorsRouter = express.Router()

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
sponsorsRouter.use("/", express.static("src/components/sponsors/assets/"))

/** Export sponsors router to mount in main router */
export { sponsorsRouter }