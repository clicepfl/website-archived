import data from './coaching-list.json'
import { logger } from '../../logger'

class Coach {
    name: string
    imageURL: string
    websiteURL?: string

    constructor(name: string, imageURL: string, websiteURL: string) {
        this.name = name
        this.imageURL = imageURL
        this.websiteURL = websiteURL
    }

    static fromAny(data: any): Coach {
        if (!Coach.is(data)) {
            const message = `Cannot cast data to type Coach: wrong shape ${JSON.stringify(data)}`
            logger.log(message)
            throw new Error(message)
        } else {
            return new Coach(data.name, data.imageURL, data.websiteURL)
        }
    }

    static is(data: any): boolean {
        return (
            // check existence of object
            data !== undefined && data !== null &&
            // check has property name of type string
            data.name !== undefined && typeof data.name === "string" &&
            // check has property imageURL of type string
            data.imageURL !== undefined && typeof data.imageURL === "string" &&
            // check has property website URL either null or of type string
            data.websiteURL !== undefined && (data.websiteURL === null || typeof data.websiteURL === "string")
        )
    }
}


class SpecialCoach extends Coach {
    role: string

    constructor(name: string, imageURL: string, websiteURL: string, role: string) {
        super(name, imageURL, websiteURL)
        this.role = role
    }

    static fromAny(data: any) {
        if (!SpecialCoach.is(data)) {
            const message = `Cannot cast data to type SpecialCoach: wrong shape ${JSON.stringify(data)}`
            logger.log(message)
            throw new Error(message)
        } else {
            return new SpecialCoach(data.name, data.imageURL, data.websiteURL, data.role)
        }
    }

    static is(data: any) {
        return Coach.is(data) && data.role !== undefined && typeof data.role === "string"
    }
}

class CoachingComponent {
    private readonly coachingList: Coach[] = data.coaches.map(Coach.fromAny)
    private readonly specialCoachingList: SpecialCoach[] = data.specialCoaches.map(SpecialCoach.fromAny)

    /**
     * Returns all coaches in a fresh array
     */
    getCoachingList(): Coach[] {
        return Object.assign([], this.coachingList)
    }

    getSpecialCoachingList(): SpecialCoach[] {
        return Object.assign([], this.specialCoachingList)
    }
}

/**
 * Export a single instance of the coaching component
 */
const coachingComponent = new CoachingComponent()
export { Coach, SpecialCoach, coachingComponent }
