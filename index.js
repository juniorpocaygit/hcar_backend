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
const UserAddressRoutes = require('./routes/UserAddressRoutes')
const CarsRoutes = require('./routes/CarsRoutes')
const FuelRoutes = require('./routes/FuelRoutes')
const MaintenancesRoutes = require('./routes/MaintenancesRoutes')
const ReviewsRoutes = require('./routes/ReviewsRoutes')
const AssistanceRoutes = require('./routes/AssistanceRoutes')
const SafeRoutes = require('./routes/SafesRoutes')
const TaxesRoutes = require('./routes/TaxesRoutes')

app.use('/users', UserRoutes)
app.use('/address', UserAddressRoutes)
app.use('/cars', CarsRoutes)
app.use('/fuel', FuelRoutes)
app.use('/maintenances', MaintenancesRoutes)
app.use('/reviews', ReviewsRoutes)
app.use('/assistance', AssistanceRoutes)
app.use('/safe', SafeRoutes)
app.use('/taxes', TaxesRoutes)

conn
    //.sync({ force: true})
    .sync()
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => console.log(err))