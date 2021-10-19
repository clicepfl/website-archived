import { Page } from '../page'
import { Icfriend, icfriendComponent } from './icfriend'
import { Request, Response } from 'express'


class IcfriendsPageViewModel {
    icfriendsList: Commission[] = icfriendComponent.list()
}

class IcfriendsPage extends Page {
    viewModel: IcfriendsPageViewModel = new IcfriendsPageViewModel()

    /** @inheritDoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/icfriends/icfriends-page-view.njk"

        res.render(template, this.viewModel)
    }
}

const icfriendsPage = new IcfriendsPage()
export { icfriendsPage }
