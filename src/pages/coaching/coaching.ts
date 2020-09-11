/**
 * This module defines committee members logic, datatypes and storage
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */
import data from './coaching-list.json'
import { logger } from '../../logger'

/**
 * This class represents a coach
 *
 * @member name The name of the coach
 * @member imageURL The exposed URL of the coach's profile picture ex: /coaching/jonhdoe.png
 * @member websiteURL The optional website of the coach
 */
class Coach {
    name: string
    imageURL: string
    websiteURL?: string

    constructor(name: string, imageURL: string, websiteURL: string) {
        this.name = name
        this.imageURL = imageURL
        this.websiteURL = websiteURL
    }

    /**
     * Builds a Coach from any Object that has the correct shape
     *
     * @param   data    Object to convert to Coach
     * @throws  errors if input data is not of the correct shape
     * @warning Modify this method if the properties of the class are changed!
     */
    static fromAny(data: any): Coach {
        if (!Coach.is(data)) {
            const message = `Cannot cast data to type Coach : wrong shape ${JSON.stringify(data)}`
            logger.log(message)
            throw new Error(message)
        } else {
            return new Coach(data.name, data.imageURL, data.websiteURL)
        }
    }

    /**
     * Check type of object to test if it is a valid coach
     *
     * @param data Object to check if of type Coach
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
            data.websiteURL !== undefined && (data.websiteURL === null || typeof data.websiteURL === "string")
        )
    }
}

/**
 * This is not really a component (yet?), but behaves like one. It handles coaching list logic such as storage, serialization and
 * querying
 *
 * @member coachingList The list of all coaches defined in {@link coaching-list.json}
 */
class CoachingComponent {
    private readonly coachingList: Coach[] = data.map(Coach.fromAny)

    /**
     * Returns all coaches in a fresh array
     */
    list(): Coach[] {
        return Object.assign([], this.coachingList)
    }
}

/**
 * Export a single instance of the coaching component
 */
const coachingComponent = new CoachingComponent()
export { Coach, coachingComponent }
