import express from 'express'
import  { icbdPage } from './icbd/icbd-page'

const eventRouter = express.Router()

eventRouter.use("/", express.static("src/pages/events/assets/"))

eventRouter.use(["/icbd", "/icboostday"], icbdPage.render)

export { eventRouter }
