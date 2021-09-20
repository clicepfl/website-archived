/**
 * Events page logic
 * CLIC website software
 *
 * @author Hugo El Guedj
 */
import { Page } from '../page'
import { Request, Response } from 'express'

/**
 * View model that binds the data to the template for the coaching page
 * Properties of this class are directly used in template {@link
 * events-page-view.njk}
 */
class EventsPageViewModel {
}

/**
 * Coaching page class, defines actions for the Coaching page
 */
class EventsPage extends Page {
    viewModel: EventsPageViewModel = new EventsPageViewModel()

    /** @inheritdoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/events/events-page-view.njk"

        res.render(template, this.viewModel)
    }
}

/**
 * Export a single instance of the ICBD page
 */
const eventsPage = new EventsPage()
export { eventsPage }
