import express from 'express'
import { poleComponent } from './pole'
import  { PolePage } from './pole-page'

const poleRouter = express.Router()

poleRouter.use("/", express.static("src/pages/about/poles/assets/"))

poleComponent.list().forEach(pole => {
    poleRouter.get("/" + pole.slug, new PolePage(pole).render)
})

export { poleRouter }
