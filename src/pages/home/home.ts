/**
 * Home page class, defines actions for the home page
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */

import { Page } from '../page'
import { Request, Response } from 'express'

class HomePage extends Page {
    /** @inheritdoc */
    render(req: Request, res: Response) {
        res.render("pages/home/home.njk")
    }
}

/**
 * Export a single instance of the home page
 */
const homePage = new HomePage()
export { homePage }