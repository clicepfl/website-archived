/**
 * This module defines sponsors logic, datatypes and storage
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */
import data from './sponsors-list.json'
import { logger } from '../../logger'

/**
 * This class represents a Sponsor data type
 *
 * @member name The name of the sponsor
 * @member websiteURL The website of the sponsor
 * @member imageURL The exposed URL of the sponsor's logo ex: /sponsors/logo.png
 * @member imageStyles Inline CSS to apply to the logo image
 * @member expiration The optional expiration date for this sponsorship contract
 */
class Sponsor {
    name: string
    websiteURL: string
    imageURL: string
    imageStyles?: string
    tier?: string
    expiration?: Date

    constructor(name: string, websiteURL: string, imageURL: string,
        imageStyles: string, tier?: string, expiration?: Date) {
        this.name = name
        this.websiteURL = websiteURL
        this.imageURL = imageURL
        this.imageStyles = imageStyles
        this.tier = tier
        this.expiration = expiration
    }

    /**
     * Builds a Sponsor from any Object that has the correct shape
     *
     * @param   data    Object to convert to a Sponsor
     * @throws  errors if input data is not of the correct shape
     * @warning Modify this method if the properties of the class are changed!
     */
    static fromAny(data: any): Sponsor {
        if (!Sponsor.is(data)) {
            const message = `Cannot cast data to type Sponsor : wrong shape ${JSON.stringify(data)}`
            logger.log(message)
            throw new Error(message)
        } else {
            return new Sponsor(data.name, data.websiteURL, data.imageURL, data.imageStyles, data.tier, data.expiration === null ?
                null : new Date(
                    data.expiration.year,
                    data.expiration.month - 1, // JS's annoying month format
                    data.expiration.day,
                )
            )
        }
    }

    /**
     * Check type of object to test if it is a valid Sponsor
     *
     * @param data Object to check if of type Sponsor
     * @warning Modify this method if the properties of the class are changed!
     */
    static is(data: any): boolean {
        return (
            // check existence of object
            data !== undefined && data !== null &&
            // check has property name of type string
            data.name !== undefined && typeof data.name === "string" &&
            // check has property websiteURL of type string
            data.websiteURL !== undefined && typeof data.websiteURL === "string" &&
            // check has property imageURL of type string
            data.imageURL !== undefined && typeof data.imageURL === "string" &&
            // check has property imageStyles, either null or of type string
            data.imageStyles !== undefined && (data.imageStyles === null || typeof data.imageStyles === "string") &&
            // check has property tier, either null or of type string
            data.tier !== undefined && (data.tier === null || typeof data.tier === "string") &&
            // check has property expiration
            data.expiration !== undefined && (
                // check expiration can be null
                data.expiration === null || (
                    // otherwise check has sub-property day of type number
                    data.expiration.day !== undefined && typeof data.expiration.day === "number" &&
                    // check has sub-property month of type number
                    data.expiration.month !== undefined && typeof
                    data.expiration.month === "number" &&
                    // check has sub-property year of type number
                    data.expiration.year !== undefined && typeof
                    data.expiration.year === "number"
                )
            )
        )
    }
}

/**
 * This component handles sponsors logic such as storage, serialization and
 * querying
 *
 * @member sponsorsList The list of all sponsors defined in
 * {@link sponsors-list.json}
 */
class SponsorsComponent {
    private readonly sponsorsList: Sponsor[] = data.map(Sponsor.fromAny)

    /**
     * Returns all sponsors (including expired) in a fresh array
     */
    list(): Sponsor[] {
        return Object.assign([], this.sponsorsList)
    }

    /**
     * Returns all sponsors (not expired) with the given tier
     *
     * @param tier Tier to get the sponsors from
     */
    listValidFromTier(tier: string): Sponsor[] {
        return Object.assign([], this.listValid().filter((sponsor) =>
            sponsor.tier === tier))
    }

    /**
     * Returns all sponsors (not expired) grouped by tiers
     */
    listValidByTier(): Map<string, Sponsor[]> {
        var groupedBy: Map<string, Sponsor[]> = new Map()
        for (let tier of ["platinum", "gold", "silver", "bronze", "subventions"]) {
            var fromTier: Sponsor[] = this.listValidFromTier(tier)
            if (fromTier.length > 0) {
                groupedBy.set(tier, fromTier)
            }
        }
        return groupedBy
    }

    /**
     * Returns all valid sponsors (not expired) in a fresh array
     */
    listValid(): Sponsor[] {
        const now = new Date()
        const valid = this.sponsorsList.filter((sponsor) =>
            sponsor.expiration == null || sponsor.expiration > now)
        return Object.assign([], valid)
    }
}

/**
 * Export a single instance of the sponsors component
 */
const sponsorsComponent = new SponsorsComponent()
export { Sponsor, sponsorsComponent }
