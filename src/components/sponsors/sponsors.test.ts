import sponsorsList from './sponsors-list.json'
import { Sponsor } from './sponsors'

test('all sponsors are well-formatted', () => {
    expect(Array.isArray(sponsorsList))
    sponsorsList.forEach(elem => {
        expect(Sponsor.is(elem)).toEqual(true)
    })
})