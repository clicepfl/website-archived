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
    time?: string
    place: any
    date: Date | string
    organizer: any
    image?: string
    shortText: string
    moreInfoUrl?: string
    cancelled: boolean

    constructor(title: string, time: string, date: Date, place: any, organizer: any, image: string, shortText: string, moreInfoUrl: string, cancelled: boolean) {
        this.title = title
        this.time = time
        this.place = place
        this.date = date
        this.organizer = organizer
        this.image = image
        this.shortText = shortText
        this.moreInfoUrl = moreInfoUrl
        this.cancelled = cancelled
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
                data.time,
                new Date(
                    data.date.year,
                    data.date.month - 1, // JS annoying month format
                    data.date.day,
                ),
                data.place,
                data.organizer,
                data.image,
                data.shortText,
                data.moreInfoUrl,
                data.cancelled
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
            data.time !== undefined && (data.time === null || typeof data.time === "string") &&
            data.place !== undefined && (
                data.place.name !== undefined && typeof data.place.name === "string" &&
                data.place.url !== undefined && (data.place.url === null || typeof data.place.url === "string")
            ) &&
            data.date !== undefined && (
                data.date.day !== undefined && typeof data.date.day === "number" &&
                data.date.month !== undefined && typeof data.date.month === "number" &&
                data.date.year !== undefined && typeof data.date.year === "number"
            ) &&
            data.organizer !== undefined && (
                data.organizer.name !== undefined && typeof data.organizer.name === "string" &&
                data.organizer.url !== undefined && (data.organizer.url === null || typeof data.organizer.url === "string")
            ) &&
            data.image !== undefined && (data.image === null || typeof data.image === "string") &&
            data.shortText !== undefined && typeof data.shortText === "string" &&
            data.moreInfoUrl !== undefined && (data.moreInfoUrl === null || typeof data.moreInfoUrl === "string") &&
            data.cancelled !== undefined && typeof data.cancelled === "boolean"
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
        // Small hack to avoid breaking the display
        if (this.listValid().length < n) {
            return Object.assign([], this.list().slice(-n))
        } else {
            return Object.assign([], this.listValid().slice(0, n))
        }
    }

    /**
     * Returns all events in fresh arrayreturn Object.assign([], this.listValid().slice(0, n))
     */
    list(): Array<Event> {
        let sortedEventsList = Object.assign([], this.eventsList)
        const now = new Date()
        return sortedEventsList.sort((e1, e2) => e1.date - e2.date).map((e) => {
            e.outdated = e.date < now
            return e
        });
    }

    listValid(): Array<Event> {
        const now = new Date()
        const valid = this.list().filter((event) =>
            event.date === null || event.date >= now)
        return Object.assign([], valid)
    }
}

/**
 * Export a single instance of the news component
 */
const eventsComponent = new EventsComponent()
export { Event, eventsComponent }
