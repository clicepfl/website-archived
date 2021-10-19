import { Page } from '../page'
import { Request, Response } from 'express'
import { Icfriend } from './icfriend'

class IcfriendPageViewModel {
    icfriend: Icfriend

    constructor(icfriend: Icfriend) {
        this.icfriend = icfriend
    }
}

class IcfriendPage extends Page {
    viewModel:  IcfriendPageViewModel

    constructor(icfriend: Icfriend) {
        super()
        this.viewModel = new IcfriendPageViewModel(icfriend)
    }

    /** @inheritDoc */
    render = (req: Request, res: Response) => {
        const template = "pages/icfriends/icfriend-page-view.njk"

        res.render(template, this.viewModel)
    }
}

export { IcfriendPage }
