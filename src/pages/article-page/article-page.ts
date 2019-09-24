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
class ArticlePageViewModel {
    news: News

    constructor(news: News) {
        this.news = news
    }
}

/**
 * News page class, defines actions for the news pages
 */
class ArticlePage extends Page {
    news: News
    viewModel: ArticlePageViewModel

    constructor(news: News) {
        super()
        this.news = news.withFormattedDate('fr')
        this.viewModel = new ArticlePageViewModel(this.news)
    }

    /** @inheritdoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/article-page/article-page-view.njk"

        res.render(template, this.viewModel)
    }
}

export { ArticlePage as NewsPage }