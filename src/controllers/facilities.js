const FacilitiesService = require('../services/facilities')
const response = require('../response')

class Facilities {
    getRemainingSpots = async (req, res) => {
        try {
            const remainingSpots = await FacilitiesService.getRemainingSpots()
            response({
                data: remainingSpots,
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


module.exports = new Facilities()