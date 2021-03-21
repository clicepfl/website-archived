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
import { News, newsComponent } from '../../components/news/news'
import { galleryComponent } from '../../components/gallery/gallery'

/**
 * View model that binds the data to the template for the home page
 * Properties of this class are directly used in template {@link home-view.njk}
 */
class HomeViewModel {
    sponsorsList: Sponsor[] = sponsorsComponent.listValid()
    sponsorsByTier: Map<string, Sponsor[]> = sponsorsComponent.listValidByTier()
    committeeList: Staff[] = committeeComponent.list()
    lastNewsList: News[] = newsComponent.getLast(3).map(news => news.withFormattedDate('fr'))
    galleryPhotos: string[] = galleryComponent.list()
}

/**
 * Home page class, defines actions for the home page
 */
class HomePage extends Page {
    /** @inheritdoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/home/home-page-view.njk"
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
