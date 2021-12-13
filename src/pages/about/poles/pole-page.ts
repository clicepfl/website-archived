import { Page } from '../../page'
import { Request, Response } from 'express'
import { Pole } from './pole'

class PolePageViewModel {
    pole: Pole

    constructor(pole: Pole) {
        this.pole = pole
    }
}

class PolePage extends Page {
    viewModel:  PolePageViewModel

    constructor(pole: Pole) {
        super()
        this.viewModel = new PolePageViewModel(pole)
    }

    /** @inheritDoc */
    render = (req: Request, res: Response) => {
        const template = "pages/about/poles/pole-page-view.njk"

        res.render(template, this.viewModel)
    }
}

export { PolePage }
