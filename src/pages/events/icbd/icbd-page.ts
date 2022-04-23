/**
 * ICBD page logic
 * CLIC website software
 *
 * @author Alexandre CHAU
 */
import { Page } from '../../page'
import { Request, Response } from 'express'
import { Staff } from '../../../components/committee/committee'
import data_speaker_alumni from './icbd-speakers.json'
import data_speaker_labos from './icbd-labos.json'

/**
 * View model that binds the data to the template for the icbd page
 * Properties of this class are directly used in template {@link
 * icbd-page-view.njk}
 */
class IcbdPageViewModel {
    speakersAlumniList: Staff[] = data_speaker_alumni.map(Staff.fromAny)
    speakersLabosList: Staff[] = data_speaker_labos.map(Staff.fromAny)
}

/**
 * ICBD page class, defines actions for the ICBD page
 */
class IcbdPage extends Page {
    viewModel: IcbdPageViewModel = new IcbdPageViewModel()

    /** @inheritdoc */
    render = (req: Request, res: Response) => {
        // template path is relative to src/ as defined in web.ts
        const template = "pages/events/icbd/icbd-page-view.njk"

        res.render(template, this.viewModel)
    }
}

/**
 * Export a single instance of the ICBD page
 */
const icbdPage = new IcbdPage()
export { icbdPage }
