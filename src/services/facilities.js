const db = require('../db/connection')
const { GET_REMAINING_SPOTS } = require('../db/queries/facilities')

class Facilities {
    getRemainingSpots = async () => {
        try {
            const shifts = await db.query(GET_REMAINING_SPOTS)
            return {
                query: GET_REMAINING_SPOTS,
                data: shifts.rows,
            }
        }
        catch(error) {
            console.error('Error getting facilities data ', error)
            throw new Error(error)
        }
    }
}

module.exports = new Facilities()