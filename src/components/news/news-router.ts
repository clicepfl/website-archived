/**
 * Express router for the news component, defines URL for this module
 * CLIC website software
 *
 * URL mount points are relative to the mount point of this router in the
 * top-level {@link ../../router.ts}. For instance, if the top-level router
 * mounts this router at "/news", then "/foo" in this router will map to
 * the final URL "/news/foo"
 *
 * @author Alexandre CHAU
 */
import express from 'express'
import { newsComponent } from './news'
import { NewsPage } from '../../pages/article-page/article-page'

/** News data */
const news = newsComponent.list()

/** Fresh router instance */
const newsRouter = express.Router()

/**
 * News pages
 * Mounts all news pages to URLs "/{newsID}/"
 */
news.forEach(news => {
    newsRouter.get(`/${news.id}`, new NewsPage(news).render)
})

/**
 * News assets (such as images)
 * Local links relative to root of project
 * Mounts the news assets in "src/components/news/content/{newsID}/assets"
 * to URL "/{newsID}/" relative to the mount point of this router
 *
 * @example
 * If the newsRouter is mounted at "/news" in the top-level router,
 * then the file "src/components/news/content/01/foo.png" will be available
 * at final URL route "/news/01/foo.png"
 */
news.forEach(news => {
    newsRouter.use(`/${news.id}`, express.static(`src/components/news/content/${news.id}/assets`))
})

/** Export committe router to mount in main router */
export { newsRouter }