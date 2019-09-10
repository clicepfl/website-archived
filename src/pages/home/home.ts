/**
 * Home page logic
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */

import { Page } from '../page'
import { Request, Response } from 'express'
import { Sponsor, sponsorsComponent } from '../../components/sponsors/sponsors'
import { Staff, committeeComponent } from '../../components/committee/committee'

/**
 * View model that binds the data to the template for the home page
 * Properties of this class are directly used in template {@link home-view.njk}
 */
class HomeViewModel {
    sponsorsList: Sponsor[] = sponsorsComponent.listValid()
    committeeList: Staff[] = committeeComponent.list()
}

/**
 * Home page class, defines actions for the home page
 */
class HomePage extends Page {
    /** @inheritdoc */
    render(req: Request, res: Response) {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/home/home-view.njk"
        // must re-generate viewmodel for every request (may change over time)
        const viewModel = new HomeViewModel()

        res.render(template, viewModel)
    }
}

/**
 * Export a single instance of the home page
 */
const homePage = new HomePage()
export { homePage }