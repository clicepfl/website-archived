/**
 * Home page logic
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */

import { Page } from '../page'
import { Request, Response } from 'express'

/**
 * View model that binds the data to the template for the home page
 * Properties of this class are directly used in template {@link home.njk}
 */
class HomeViewModel {

}

/**
 * Home page class, defines actions for the home page
 */
class HomePage extends Page {
    // template path is relative to src/ as defined in web.ts
    template = "pages/home/home.njk"
    viewModel = new HomeViewModel()

    /** @inheritdoc */
    render(req: Request, res: Response) {
        res.render(this.template, this.viewModel)
    }
}

/**
 * Export a single instance of the home page
 */
const homePage = new HomePage()
export { homePage }