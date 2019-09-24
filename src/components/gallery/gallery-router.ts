/**
 * Express router for the gallery component, defines URL for this module
 * CLIC website software
 *
 * URL mount points are relative to the mount point of this router in the
 * top-level {@link ../../router.ts}. For instance, if the top-level router
 * mounts this router at "/gallery", then "/foo" in this router will map to
 * final URL "/gallery/foo"
 *
 * @author  Alexandre CHAU
 */
import express from 'express'
import { galleryComponent } from './gallery'

/** Fresh router instance */
const galleryRouter = express.Router()

/**
 * Gallery assets (images)
 * Local links relative to root of project
 * Mounts the gallery assets in "src/components/gallery/assets/" to URL "/"
 * relative to the mount point of this router
 *
 * @example
 * If the galleryRouter is mounted at "/gallery" in the top-level router,
 * then the file "src/components/gallery/assets/foo.png" will be available at
 * final URL route "/gallery/foo.png"
 */
galleryRouter.use('/', express.static("src/components/gallery/assets"))

/** Export gallery router to mount in main folder */
export { galleryRouter }