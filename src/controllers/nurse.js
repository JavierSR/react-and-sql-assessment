const NurseService = require('../services/nurse')
const response = require('../response')

class Nurse {
    getJobsAvailability = async (req, res) => {
        try {
            const jobsAvailability = await NurseService.getJobsAvailability()
            response({
                data: jobsAvailability,
                success: true,
                res
            })
        }
        catch(error) {
            response({
                success: false,
                message: error.toString(),
                res
            })
        }
    }
    getCoworkers = async (req, res) => {
        const { nurseId } = req.query
        try {
            const coworkers = await NurseService.getCoworkers(nurseId)
            response({
                data: coworkers,
                success: true,
                res
            })
        }
        catch(error) {
            response({
                success: false,
                message: error.toString(),
                res
            })
        }
    }

}


module.exports = new Nurse()