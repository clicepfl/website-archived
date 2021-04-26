import { Page } from '../page'
import { Pole, poleComponent } from './pole'
import { Request, Response } from 'express'


class PolesPageViewModel {
    polesList: Pole[] = poleComponent.list()
}

class PolesPage extends Page {
    viewModel: PolesPageViewModel = new PolesPageViewModel()

    /** @inheritDoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/poles/poles-page-view.njk"

        res.render(template, this.viewModel)
    }
}

const polesPage = new PolesPage()
export { polesPage }
