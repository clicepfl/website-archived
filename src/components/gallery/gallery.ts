/**
 * This module defines gallery logic, datatypes and storage
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */
import path from 'path'
import fs from 'fs'

/**
 * Gallery content path
 * Must correct to src/ folder since this will be compiled in dist
 */
const CONTENT_PATH = path.resolve(__dirname, "../../../src/components/gallery/")

class GalleryComponent {
    /**
     * @member The list of all images URL in gallery
     */
    private static readonly images: string[] = GalleryComponent._load()

    /**
     * Returns all images URLs in a fresh array
     */
    list(): string[] {
        return Object.assign([], GalleryComponent.images)
    }

    /**
     * Retrieves all images URLs from storage
     */
    private static _load(): string[] {
        // list from storage (bind to src folder, not dist folder)
        const contentPath = path.resolve(CONTENT_PATH, "assets/")
        const imageNames = fs.readdirSync(contentPath)
        return imageNames
    }
}

/**
 * Export a single instance of the gallery component
 */
const galleryComponent = new GalleryComponent()
export { galleryComponent }