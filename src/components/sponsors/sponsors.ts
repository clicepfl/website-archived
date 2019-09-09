/**
 * Defines sponsors logic, datatypes and storage
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */

/**
 * This class represents a Sponsor data type
 *
 * @member name The name of the sponsor
 * @member url  The website of the sponsor
 * @member expiration The optional expiration date for this sponsorship contract
 */
class Sponsor {
    name: string
    url: string
    expiration?: Date
}