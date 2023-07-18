const express = require('express')
const cors = require('cors')
const app = express()
const conn = require('./db/conn')

//Models
const User = require('./models/User')
const UserAddress = require('./models/UserAddress')
const Cars = require('./models/Cars')
const Assistance = require('./models/Assistance')
const AssistanceAddress = require('./models/AssistanceAddress')
const Fuel = require('./models/Fuel')
const Maintenance = require('./models/Maintenance')
const Reviews = require('./models/Reviews')
const Safe = require('./models/Safe')
const Taxes = require('./models/Taxes')
const TaxesPortion = require('./models/TaxesPortion')
const SafePortion = require('./models/SafePortion')

//config JSON response
app.use(express.json())

//solve cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

//public path
app.use(express.static('public'))

//routes
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)




conn
    //.sync({ force: true})
    .sync()
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => console.log(err))