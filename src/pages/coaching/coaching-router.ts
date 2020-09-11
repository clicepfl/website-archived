/**
 * Express router for the coaching web page, defines URL for this module
 * CLIC website software
 *
 * URL mount points are relative to the mount point of this router in the
 * top-level {@link ../../router.ts}. For instance, if the top-level router
 * mounts this router at "/committee", then "/foo" in this router will map to
 * the final URL "/committee/foo"
 *
 * @author Hugo El Guedj
 */
import express from 'express'

/** Fresh router instance */
const coachingListRouter = express.Router()

/**
 * Committee assets (such as profile pictures)
 * Local links relative to root of project
 * Mounts the committee assets in "src/components/committee/assets/" to URL
 * "/" relative to the mount point of this router
 *
 * @example
 * If the committeeRouter is mounted at "/committee" in the top-level router,
 * then the file "src/components/committee/assets/foo.png" will be available at
 * final URL route "/committee/foo.png"
 */
coachingListRouter.use("/", express.static("src/pages/coaching/assets/"))

/** Export committe router to mount in main router */
export { coachingListRouter }
