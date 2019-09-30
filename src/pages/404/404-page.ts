/**
 * 404 page logic
 * CLIC website software
 *
 * @author Alexandre CHAU
 */
import { Page } from '../page'
import { Request, Response } from 'express'
import { News, newsComponent } from '../../components/news/news'

/**
 * View model that binds the data to the template for the 404 page
 * Properties of this class are directly used in template {@link
 * 404-view.njk}
 */
class NotFoundPageViewModel {
    newsList: News[] = newsComponent.getLast(3).map(n => n.withFormattedDate('fr'))
}

/**
 * 404 page class, defines actions for the 404 page
 */
class NotFoundPage extends Page {
    viewModel: NotFoundPageViewModel = new NotFoundPageViewModel()

    /** @inheritdoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/404/404-view.njk"

        res.status(404).render(template, this.viewModel)
    }
}

/**
 * Export a single instance of the 404 page
 */
const notFoundPage = new NotFoundPage()
export { notFoundPage }