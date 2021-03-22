import committeeList from './committee-list.json'
import { Staff } from './committee'

test('all committee members are well-formatted', () => {
    expect(Array.isArray(committeeList))
    committeeList.forEach(elem => {
        expect(Staff.is(elem)).toEqual(true)
    })
})