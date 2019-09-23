/**
 * This module defines the news component
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */
import fs from 'fs'
import path from 'path'
import moment from 'moment'
import showdown from 'showdown'
import { logger } from '../../logger'

/**
 * News data type
 *
 * @member id Unique identifier
 * @member title Title of the news
 * @member date Date of publication
 * @member author Name of the author
 * @member image Main image cover URL
 * @member shortText Short version of the news (one-sentence)
 * @member body HTML main content
 */
class News {
    id: string
    title: string
    date: Date | string
    author: string
    image: string
    shortText: string
    body: string

    constructor(id: string, title: string, date: Date, author: string, image: string, shortText: string, body: string) {
        this.id = id
        this.title = title
        this.date = date
        this.author = author
        this.image = image
        this.shortText = shortText
        this.body = body
    }

    /**
     * Builds a news from any Object that has the correct shape
     *
     * @param data Object to convert to News
     * @throws errors if input data is not of the correct shape
     * @warning Modify this method if the properties of the class are changed!
     */
    static fromAny(data: any): News {
        if (!News.is(data)) {
            const message = `Cannot cast data to type News : wrong shape ${JSON.stringify(data)}`
            logger.log(message)
            throw new Error(message)
        } else {
            return new News(
                data.id,
                data.title,
                new Date(
                    data.date.year,
                    data.date.month - 1, // JS annoying month format
                    data.date.day,
                ),
                data.author,
                data.image,
                data.shortText,
                data.body
            )
        }
    }

    /**
     * Check type of object to test if it is a valid news
     *
     * @param data Object to check if of type News
     * @warning Modify this method if the properties of the class are changed!
     */
    static is(data: any): boolean {
        return (
            data !== undefined && data !== null &&
            data.id !== undefined && typeof data.id === "string" &&
            data.title !== undefined && typeof data.title === "string" &&
            data.date !== undefined && (
                data.date.day !== undefined && typeof data.date.day === "number" &&
                data.date.month !== undefined && typeof data.date.month === "number" &&
                data.date.year !== undefined && typeof data.date.year === "number"
            ) &&
            data.author !== undefined && typeof data.author === "string" &&
            data.image !== undefined && typeof data.image === "string" &&
            data.shortText !== undefined && typeof data.shortText === "string" &&
            data.body !== undefined && typeof data.body === "string"
        )
    }

    /**
     * Returns a news with a formatted date by tranforming its date property
     * @param locale Locale
     */
    withFormattedDate(locale: string): News {
        const mod = Object.assign({}, this)
        mod.date = moment(this.date).locale(locale).format("LL")
        return mod
    }
}

/**
 * This component handles news logic such as storage, serialization and
 * querying
 */
class NewsComponent {
    /** list of all news IDs */
    private static readonly newsIDs: Array<string> = NewsComponent._loadIDs()
    /** hold news data in memory */
    private static readonly news: Array<News> = NewsComponent._loadNews()

    /**
     * Queries the n most recent news
     * @param n Integer number of news
     */
    getLast(n: number): Array<News> {
        return Object.assign([], NewsComponent.news.slice(0, n))
    }

    /**
     * Returns all news in fresh array
     */
    list(): Array<News> {
        return Object.assign([], NewsComponent.news)
    }

    /**
     * Retrieves all news IDs from storage in content/ folder
     */
    private static _loadIDs(): Array<string> {
        // list from storage
        const contentPath = path.resolve(__dirname, "content/")
        const newsIDs = fs.readdirSync(contentPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
        return newsIDs.sort()
    }

    /**
     * Retrieves all news from storage
     * @requires newsIDs!=null
     */
    private static _loadNews(): Array<News> {
        return NewsComponent.newsIDs.map(newsID => {
            // read meta file
            const metaPath = path.resolve(__dirname, `content/${newsID}/meta.json`)
            if (!fs.existsSync(metaPath)) {
                const msg = `meta file missing for news ${newsID} at ${metaPath}`
                logger.log(msg)
                throw new Error(msg)
            }
            // load meta into fresh builder
            const builder: any = require(metaPath)
            builder.id = newsID

            // read Markdown file
            const mdPath = path.resolve(__dirname, `content/${newsID}/body.md`)
            if (!fs.existsSync(mdPath)) {
                const msg = `Markdown body file missing for news ${newsID} at ${mdPath}`
                logger.log(msg)
                throw new Error(msg)
            }
            const md = fs.readFileSync(mdPath, { encoding: 'utf8' })

            // convert markdown and assign to builder
            const converter = new showdown.Converter()
            builder.body = converter.makeHtml(md)

            // create new News data view
            return News.fromAny(builder)
        })
    }
}

/**
 * Export a single instance of the news component
 */
const newsComponent = new NewsComponent()
export { News, newsComponent }