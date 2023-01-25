const response = (params) => {
    const { 
        message = '',
        data = null,
        statusCode = 201,
        success = true,
        res
    } = params

    res.status(statusCode).send({
        success,
        text: message || (success ? 'Successful request' : 'Server error'),
        body: data
    })
}

module.exports = response