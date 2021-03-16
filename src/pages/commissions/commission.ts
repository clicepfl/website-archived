import fs from 'fs'
import path from 'path'
import showdown from 'showdown'
import data from './commission-list.json'
import { logger } from '../../logger'
import { fstat } from 'fs'

/**
 * Commission content path
 * Must correct to src/ folder since this will be compiled in dist
 */
const CONTENT_PATH = path.resolve(__dirname, "../../../src/pages/commissions/assets/")

class CommissionMember {
    name: string
    imageURL: string
    websiteURL?: string
    role: string

    constructor(name: string, imageURL: string, websiteURL: string, role: string) {
        this.name = name
        this.imageURL = imageURL
        this.websiteURL = websiteURL
        this.role = role
    }

    /**
     * Builds a CommissionMember from any Object that has the correct shape
     *
     * @param   data    Object to convert to CommissionMember
     * @throws  errors if input data is not of the correct shape
     * @warning Modify this method if the properties of the class are changed!
     */
    static fromAny(data: any): CommissionMember {
        if (!CommissionMember.is(data)) {
            const message = `Cannot cast data to type CommissionMember : wrong shape ${JSON.stringify(data)}`
            logger.log(message)
            throw new Error(message)
        } else {
            return new CommissionMember(data.name, data.imageURL, data.websiteURL, data.role)
        }
    }

    /**
     * Check type of object to test if it is a valid coach
     *
     * @param data Object to check if of type CommissionMember
     * @warning Modify this method if the properties of the class are changed!
     */
    static is(data: any): boolean {
        return (
            // check existence of object
            data !== undefined && data !== null &&
            // check has property name of type string
            data.name !== undefined && typeof data.name === "string" &&
            // check has property imageURL of type string
            data.imageURL !== undefined && typeof data.imageURL === "string" &&
            // check has property website URL either null or of type string
            data.websiteURL !== undefined && (data.websiteURL === null || typeof data.websiteURL === "string") &&
            // check has property role of type string
            data.role !== undefined && typeof data.role === "string"
        )
    }
}

class Commission {
    name: string
    slug: string
    imageURL: string
    shortDescription: string
    pageBody: string
    catchPhrase: string
    members: CommissionMember[]
    social: { string: string }

    constructor(name: string, slug: string, imageURL: string, shortDescription: string, pageBody: string, catchPhrase: string, members: CommissionMember[], social: { string: string }) {
        this.name = name
        this.slug = slug
        this.imageURL = imageURL
        this.shortDescription = shortDescription
        this.pageBody = pageBody
        this.catchPhrase = catchPhrase
        this.members = members
        this.social = social
    }

    static fromAny(data: any): Commission {
        if (!Commission.is(data)) {
            const message = `Cannot cast data to type Commission : wrong shape ${JSON.stringify(data)}`
            logger.log(message)
            throw new Error(message)
        } else {
            return new Commission(data.name, data.slug, data.imageURL, data.shortDescription, data.pageBody, data.catchPhrase, data.members, data.social)
        }
    }

    static is(data: any): boolean {
        return (
            data !== undefined && data !== null &&
            data.name !== undefined && typeof data.name === "string" &&
            data.slug !== undefined && typeof data.slug === "string" &&
            data.imageURL !== undefined && typeof data.imageURL === "string" &&
            data.shortDescription !== undefined && typeof data.shortDescription === "string" &&
            data.pageBody !== undefined && typeof data.pageBody === "string" &&
            data.catchPhrase !== undefined && typeof data.catchPhrase === "string" &&
            data.members !== undefined && Array.isArray(data.members) && data.members.every((e: any) => CommissionMember.is(e)) &&
            data.social !== undefined && data.social != null && Object.entries(data.social).every(pair => {
                const [key, value] = pair
                return typeof key === "string" && typeof value === "string"
            })
        )
    }
}


class CommissionComponent {
    private readonly commissionList: Commission[] = data.map(jsonData => {
        const builder: any = jsonData

        const pageBodyMdPath = path.resolve(CONTENT_PATH, builder.pageBodyPath)
        if (!fs.existsSync(pageBodyMdPath)) {
            const msg = `Markdown body file missing for commission ${builder.name} at ${pageBodyMdPath}`
            logger.log(msg)
            throw new Error(msg)
        }
        const pageBodyMd = fs.readFileSync(pageBodyMdPath, { encoding: 'utf8' })

        // convert markdown
        const converter = new showdown.Converter()
        builder.pageBody = converter.makeHtml(pageBodyMd)

        return Commission.fromAny(builder)
    })

    list(): Commission[] {
        return Object.assign([], this.commissionList)
    }
}

const commissionComponent = new CommissionComponent()
export { Commission, commissionComponent }