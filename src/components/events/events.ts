/**
 * This module defines the news component
 * CLIC website software
 *
 * @author  Hugo El Guedj
 */
import data from './events-list.json'
import moment from 'moment'
import { logger } from '../../logger'

/**
 * Event data type
 *
 * @member id Unique identifier
 * @member title Title of the news
 * @member date Date of publication
 * @member author Name of the author
 * @member image Main image cover URL
 * @member shortText Short version of the news (one-sentence)
 * @member body HTML main content
 */
class Event {
    title: string
    shortName: string
    date: Date | string
    organizer: string
    image?: string
    shortText: string
    newsId?: number

    constructor(title: string, shortName: string, date: Date, organizer: string, image: string, shortText: string, newsId: number) {
        this.title = title
        this.shortName = shortName
        this.date = date
        this.organizer = organizer
        this.image = image
        this.shortText = shortText
        this.newsId = newsId
    }

    /**
     * Builds an event from any Object that has the correct shape
     *
     * @param data Object to convert to News
     * @throws errors if input data is not of the correct shape
     * @warning Modify this method if the properties of the class are changed!
     */
    static fromAny(data: any): Event {
        if (!Event.is(data)) {
            const message = `Cannot cast data to type Event : wrong shape ${JSON.stringify(data)}`
            logger.log(message)
            throw new Error(message)
        } else {
            return new Event(
                data.title,
                data.shortName,
                new Date(
                    data.date.year,
                    data.date.month - 1, // JS annoying month format
                    data.date.day,
                ),
                data.organizer,
                data.image,
                data.shortText,
                data.newsId
            )
        }
    }

    /**
     * Check type of object to test if it is a valid news
     *
     * @param data Object to check if of type News
     * @warning Modify this method if the properties of the class are changed!
     */
    static is(data: any): boolean {
        return (
            data !== undefined && data !== null &&
            data.title !== undefined && typeof data.title === "string" &&
            data.shortName !== undefined && typeof data.shortName === "string" &&
            data.date !== undefined && (
                data.date.day !== undefined && typeof data.date.day === "number" &&
                data.date.month !== undefined && typeof data.date.month === "number" &&
                data.date.year !== undefined && typeof data.date.year === "number"
            ) &&
            data.organizer !== undefined && typeof data.organizer === "string" &&
            data.image !== undefined && (data.image === null || typeof data.image === "string") &&
            data.shortText !== undefined && typeof data.shortText === "string" &&
            data.newsId !== undefined && (data.newsId === null || typeof data.newsId === "number")
        )
    }

    /**
     * Returns an event with a formatted date by tranforming its date property
     * @param locale Locale
     */
    withFormattedDate(locale: string): Event {
        const mod = Object.assign({}, this)
        mod.date = moment(this.date).locale(locale).format("LL")
        return mod
    }
}

/**
 * This component handles events logic such as storage, serialization and
 * querying
 */
class EventsComponent {
    /** hold events data in memory */
    private readonly eventsList: Array<Event> = data.map(Event.fromAny)

    /**
     * Queries the next n events in the calendar (handy for compact display)
     * @param n Integer number of events
     */
    getNextValid(n: number): Array<Event> {
        return Object.assign([], this.listValid().slice(0, n))
    }

    /**
     * Returns all events in fresh array
     */
    list(): Array<Event> {
        return Object.assign([], this.eventsList)
    }

    listValid(): Array<Event> {
        const now = new Date()
        const valid = this.eventsList.filter((event) => {
            event.date === null || event.date > now
        })
        return Object.assign([], valid)
    }
}

/**
 * Export a single instance of the news component
 */
const eventsComponent = new EventsComponent()
export { Event, eventsComponent }
