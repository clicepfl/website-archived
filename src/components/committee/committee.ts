/**
 * This module defines committee members logic, datatypes and storage
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */
import data from './committee-list.json'
import { logger } from '../../logger'

/**
 * This class represents a committee member
 *
 * @member name The name of the staff
 * @member role The roel of the staff
 * @member imageURL The exposed URL of the staff's profile picture ex: /committee/jonhdoe.png
 * @member websiteURL The optional website of the staff
 */
class Staff {
    name: string
    role: string
    imageURL: string
    websiteURL?: string

    constructor(name: string, role: string, imageURL: string, websiteURL: string) {
        this.name = name
        this.role = role
        this.imageURL = imageURL
        this.websiteURL = websiteURL
    }

    /**
     * Builds a Staff from any Object that has the correct shape
     *
     * @param   data    Object to convert to Staff
     * @throws  erros if input data is not of the correct shape
     * @warning Modify this method if the properties of the class are changed!
     */
    static fromAny(data: any): Staff {
        if (!Staff.is(data)) {
            const message = `Cannot cast data to type Staff : wrong shape ${JSON.stringify(data)}`
            logger.log(message)
            throw new Error(message)
        } else {
            return new Staff(data.name, data.role, data.imageURL, data.websiteURL)
        }
    }

    /**
     * Check type of object to test if it is a valid staff
     *
     * @param data Object to check if of type Staff
     * @warning Modify this method if the properties of the class are changed!
     */
    static is(data: any): boolean {
        return (
            // check existence of object
            data !== undefined && data !== null &&
            // check has property name of type string
            data.name !== undefined && typeof data.name === "string" &&
            // check has property role of type string
            data.role !== undefined && typeof data.role === "string" &&
            // check has property imageURL of type string
            data.imageURL !== undefined && typeof data.imageURL === "string" &&
            // check has property website URL either null or of type string
            data.websiteURL !== undefined && (data.websiteURL === null || typeof data.websiteURL === "string")
        )
    }
}

/**
 * This component handles committee logic such as storage, serialization and
 * querying
 *
 * @member committeeList The list of all committee members defined in {@link committee-list.json}
 */
class CommitteeComponent {
    private readonly committeeList: Staff[] = data.map(Staff.fromAny)

    /**
     * Returns all committee staffs in a fresh array
     */
    list(): Staff[] {
        return Object.assign([], this.committeeList)
    }
}

/**
 * Export a single instance of the committee component
 */
const committeeComponent = new CommitteeComponent()
export { Staff, committeeComponent }