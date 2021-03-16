/**
 * Coaching page logic
 * CLIC website software
 *
 * @author Hugo El Guedj
 */
import { Page } from '../page'
import { Request, Response } from 'express'
import { Coach, coachingComponent } from './coaching'

/**
 * View model that binds the data to the template for the coaching page
 * Properties of this class are directly used in template {@link
 * coaching-page-view.njk}
 */
class CoachingPageViewModel {
    coachingList: Coach[] = coachingComponent.list()
}

/**
 * Coaching page class, defines actions for the Coaching page
 */
class CoachingPage extends Page {
    viewModel: CoachingPageViewModel = new CoachingPageViewModel()

    /** @inheritdoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/coaching/coaching-page-view.njk"

        res.render(template, this.viewModel)
    }
}

/**
 * Export a single instance of the ICBD page
 */
const coachingPage = new CoachingPage()
export { coachingPage }
