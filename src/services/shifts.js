const db = require('../db/connection')
const { GET_ALL, GET_SHIFT_BY_ID } = require('../db/queries/shifts')
const { SHIFT_OVERLAP_THRESHOLD } = require('../constants')
const { getMinutesDifference, getFullDateTime } = require('../helpers/date')

class Shifts {
    getAll = async () => {
        try {
            const shifts = await db.query(GET_ALL)
            return shifts.rows
        }
        catch(error) {
            console.error('Error getting shifts data ', error)
            throw new Error(error)
        }
    }
    getShiftById = async (shiftId) => {
        try {
            const shift = await db.query(GET_SHIFT_BY_ID, [shiftId])
            if(shift.rows.length) {
                return shift.rows[0]
            }
            else {
                throw new Error(`Shift ${shiftId} not found`)
            }
        }
        catch(error) {
            console.error('Error getting shift data ', error)
            throw new Error(error)
        }
    }
    getShiftsThreshold = ({ shiftA, shiftB }) => {
        return shiftA.facility_id !== shiftB.facility_id ? 
            SHIFT_OVERLAP_THRESHOLD.DIFFERENT_FACILITY : SHIFT_OVERLAP_THRESHOLD.SAME_FACILITY
    }
    getEarliestAndLatestShift = (shiftA, shiftB) => {
        if(shiftA.shift_date < shiftB.shift_date) {
            return {
                earliestShift: shiftA,
                latestShift: shiftB
            }
        }
        else if (shiftA.shift_date > shiftB.shift_date) {
            return {
                earliestShift: shiftB,
                latestShift: shiftA
            }
        }
        else if (shiftA.end_time > shiftB.end_time) {
            return {
                earliestShift: shiftB,
                latestShift: shiftA
            }
        }
        else {
            return {
                earliestShift: shiftA,
                latestShift: shiftB
            }
        }
    }
    compareShiftsOverlaping = ({ shiftA, shiftB }) => {
        const threshold = this.getShiftsThreshold({ shiftA, shiftB })
        //By adding this, it enables bidirectional comparission no matter what shift is selected first
        const { earliestShift, latestShift } = this.getEarliestAndLatestShift(shiftA, shiftB)
        const endDate = getFullDateTime({
            date: earliestShift.shift_date,
            time: earliestShift.end_time, 
            addDay: earliestShift.end_time < earliestShift.start_time
        })
        const startDate = getFullDateTime({
            date: latestShift.shift_date,
            time: latestShift.start_time,
            addDay: false
        })
        const overlapMinutes = getMinutesDifference(endDate, startDate)

        return {
            overlapMinutes: overlapMinutes > 0 ? overlapMinutes : 0,
            maximumOverlapThreshold: threshold,
            exceedsOverlapThreshold: overlapMinutes > threshold
        }
    }
}

module.exports = new Shifts()