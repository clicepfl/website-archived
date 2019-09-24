/**
 * News page logic
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */

import { Page } from '../page'
import { Request, Response } from 'express'
import { News } from '../../components/news/news'

/**
 * View model that binds the data to the template for the news page
 * Properties of this class are directly used in template {@link
 * news-page-view.njk}
 */
class NewsViewModel {
    news: News

    constructor(news: News) {
        this.news = news
    }
}

/**
 * News page class, defines actions for the news pages
 */
class NewsPage extends Page {
    news: News
    viewModel: NewsViewModel

    constructor(news: News) {
        super()
        this.news = news
        this.viewModel = new NewsViewModel(news)
    }

    /** @inheritdoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/news-page/news-page-view.njk"

        res.render(template, this.viewModel)
    }
}

export { NewsPage }