import express from 'express'
import  { icbdPage as icbdPageOld } from './icbd2/icbd-page'
import  { icbdPage } from './icbd3/icbd-page'

const eventRouter = express.Router()

eventRouter.use("/", express.static("src/pages/events/assets/"))

eventRouter.use(["/icbd", "/icboostday", "/icbd3"], icbdPage.render)

eventRouter.use(["/icbd2"], icbdPageOld.render)

export { eventRouter }
