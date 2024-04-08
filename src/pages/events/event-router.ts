import express from 'express'

import  { icbdPage as icbdPageOld3 } from './icbd3/icbd-page'
import  { icbdPage as icbdPageOld4 } from './icbd4/icbd-page'
import  { icbdPage } from './icbd5/icbd-page'

const eventRouter = express.Router()

eventRouter.use("/", express.static("src/pages/events/assets/"))

eventRouter.use(["/icbd", "/icboostday", "/icbd5"], icbdPage.render)

eventRouter.use(["/icbd4"], icbdPageOld4.render)

eventRouter.use(["/icbd3"], icbdPageOld3.render)

export { eventRouter }
