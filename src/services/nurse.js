const db = require('../db/connection')
const { GET_JOBS_AVAILABILITY, GET_COWORKERS } = require('../db/queries/nurse')

class Nurse {
    getJobsAvailability = async () => {
        try {
            const jobsAvailability = await db.query(GET_JOBS_AVAILABILITY)
            return {
                query: GET_JOBS_AVAILABILITY,
                data: jobsAvailability.rows,
            }
        }
        catch(error) {
            console.error('Error getting nurses data ', error)
            throw new Error(error)
        }
    }
    getCoworkers = async (id) => {
        try {
            const coworkers = await db.query(GET_COWORKERS, [id, id])
            return {
                query: GET_COWORKERS,
                data: coworkers.rows,
            }
        }
        catch(error) {
            console.error('Error getting nurses data ', error)
            throw new Error(error)
        }
    }
}

module.exports = new Nurse()