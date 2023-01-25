const app = require('./src/app')
const { resolve } = require('path')
require('dotenv').config()

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'))
})

const PORT = process.env.API_PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})
