/**
 * News page logic
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */

import { Page } from '../page'
import { Request, Response } from 'express'
import { News, newsComponent } from '../../components/news/news'

/**
 * View model that binds the data to the template for the news page
 * Properties of this class are directly used in template {@link
 * news-page-view.njk}
 */
class NewsPageViewModel {
    newsList: News[] = newsComponent.list().map(n => n.withFormattedDate('fr'))
}

/**
 * News page class, defines actions for the news pages
 */
class NewsPage extends Page {
    viewModel: NewsPageViewModel

    constructor() {
        super()
        this.viewModel = new NewsPageViewModel()
    }

    /** @inheritdoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/news/news-page-view.njk"

        res.render(template, this.viewModel)
    }
}

/** Export a single instance of the news page */
const newsPage = new NewsPage()
export { newsPage }