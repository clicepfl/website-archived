import fs from 'fs'
import path from 'path'
import showdown from 'showdown'
import { News } from './news'

const CONTENT_PATH = path.resolve(__dirname, './content')

const newsSources = fs.readdirSync(CONTENT_PATH, { withFileTypes: true })

test('all news have the correct file structure', () => {
    newsSources.forEach(src => {
        expect(src.isDirectory())

        const newsDir = fs.readdirSync(path.resolve(CONTENT_PATH, src.name), { withFileTypes: true })

        expect(newsDir.map(e => e.name)).toEqual(expect.arrayContaining(['body.md', 'meta.json']))
        expect(newsDir.find(e => e.name === 'body.md').isDirectory()).toEqual(false)
        expect(newsDir.find(e => e.name === 'meta.json').isDirectory()).toEqual(false)

        const maybeAssets = newsDir.find(e => e.name === 'assets')
        if (maybeAssets !== undefined) {
            expect(maybeAssets.isDirectory()).toEqual(true)
        }
    })
})

test('all news are well-formatted', () => {
    newsSources.forEach(src => {
        const news = require(path.resolve(CONTENT_PATH, src.name, 'meta.json'))

        const md = fs.readFileSync(path.resolve(CONTENT_PATH, src.name, 'body.md'), { encoding: 'utf8' })

        const converter = new showdown.Converter()
        news.body = converter.makeHtml(md)

        expect(News.is(news)).toEqual(true)
    })
})