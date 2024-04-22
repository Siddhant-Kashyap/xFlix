const app = require('./app')
const config = require('./config/config')

const mongoose = require('mongoose')

mongoose.connect(config.mongoose.url, config.mongoose.options)

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

mongoose.connection.on('error', (err) => {
    if (config.env === "developmentt") console.log(err)
    console.log('Mongoose connection error')
})

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
})
