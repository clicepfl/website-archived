import { Page } from '../page'
import { Request, Response } from 'express'
import { Commission } from './commission'

class CommissionPageViewModel {
    commission: Commission

    constructor(commission: Commission) {
        this.commission = commission
    }
}

class CommissionPage extends Page {
    viewModel:  CommissionPageViewModel

    constructor(commission: Commission) {
        super()
        this.viewModel = new CommissionPageViewModel(commission)
    }

    /** @inheritDoc */
    render = (req: Request, res: Response) => {
        const template = "pages/commissions/commission-page-view.njk"

        res.render(template, this.viewModel)
    }
}

export { CommissionPage }