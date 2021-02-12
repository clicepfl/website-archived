import express from 'express'
import { commissionComponent } from './commission'
import { commissionsPage } from './commissions-page'

const commissionRouter = express.Router()

commissionRouter.use("/", express.static("src/pages/commissions/assets/"))

commissionRouter.use("/", commissionsPage.render)

commissionComponent.list().forEach(commission => {
    commissionRouter.use(commission.slug, new CommissionPage(commission).render)
})

export { commissionRouter }