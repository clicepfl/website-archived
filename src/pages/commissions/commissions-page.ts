import { Page } from '../page'
import { Commission, commissionComponent } from './commission'
import { Request, Response } from 'express'


class CommissionsPageViewModel {
    commissionsList: Commission[] = commissionComponent.list()
}

class CommissionsPage extends Page {
    viewModel: CommissionsPageViewModel = new CommissionsPageViewModel()

    /** @inheritDoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/commissions/commissions-page-view.njk"

        res.render(template, this.viewModel)
    }
}

const commissionsPage = new CommissionsPage()
export { commissionsPage }