const ShiftsService = require('../services/shifts')
const response = require('../response')

class Shifts {
    getAll = async (req, res) => {
        try {
            const shifts = await ShiftsService.getAll()
            response({
                data: shifts,
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
    exceedsOverlapThreshold = async (req, res) => {
        const { shiftIdA, shiftIdB } = req.query

        if(!shiftIdA || !shiftIdB) {
            return response({
                success: false,
                message: "Didn't get shift ids",
                res
            })
        }

        try {
            const shiftA = await ShiftsService.getShiftById(shiftIdA)
            const shiftB = await ShiftsService.getShiftById(shiftIdB)
            const result = ShiftsService.compareShiftsOverlaping({ shiftA, shiftB })
            response({
                data: result,
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


module.exports = new Shifts()