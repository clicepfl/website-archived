/**
 * About page logic
 * CLIC website software
 *
 * @author Alexandre CHAU
 */
import { Page } from '../page'
import { Request, Response } from 'express'
import { Sponsor, sponsorsComponent } from '../../components/sponsors/sponsors'

/**
 * View model that binds the data to the template for the about page
 * Properties of this class are directly used in template {@link
 * about-page-view.njk}
 */
class AboutPageViewModel {
    sponsorsList: Sponsor[] = sponsorsComponent.listValid()
}

/**
 * About page class, defines actions for the about page
 */
class AboutPage extends Page {
    viewModel: AboutPageViewModel = new AboutPageViewModel()

    /** @inheritdoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/about/about-page-view.njk"

        res.render(template, this.viewModel)
    }
}

/**
 * Export a single instance of the about page
 */
const aboutPage = new AboutPage()
export { aboutPage }