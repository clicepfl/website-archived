import express from 'express'
import { icfriendComponent } from './icfriend'
import { coachingPage } from './coaching/coaching-page'
import { coachingListRouter} from './coaching/coaching-router'
import  { IcfriendPage } from './icfriend-page'

const icfriendRouter = express.Router()

icfriendRouter.use("/", express.static("src/pages/icfriends/assets/"))

icfriendRouter.get("/coaching", coachingPage.render)

icfriendRouter.use("/coaching", coachingListRouter)

icfriendComponent.list().forEach(icfriend => {
    icfriendRouter.get("/" + icfriend.slug, new IcfriendPage(icfriend).render)
})

export { icfriendRouter }
