import express from 'express'
import { commissionComponent } from './commission'
import  { CommissionPage } from './commission-page'

const commissionRouter = express.Router()

commissionRouter.use("/", express.static("src/pages/commissions/assets/"))

commissionComponent.list().forEach(commission => {
    commissionRouter.get("/" + commission.slug, new CommissionPage(commission).render)
})

export { commissionRouter }