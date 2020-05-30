const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors');

const app = express()
const port = process.env.PORT || 4000
dotenv.config();

const db = require("./db/db")

//Cors configuration
const config = {
    application: {
        cors: {
            server: [{
                origin: "*",
                credentials: true
            }]
        }
    }
}
app.use(cors(
    config.application.cors.server
));

//Fisrt route
app.get('/',(req,res)=>{
    res.send('This is the api for Corona Map Tracker')
})
//Import routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')


//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Route Middleware
app.use('/api/',authRoute)
app.use('/user/',userRoute)

//Initialize server 
app.listen(port,() => {
    console.log('Server on port ' + port)
}) 
