// empty JS object endpoint for all routes
projectData = {};

const path = require('path')
const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY_GEO}`)
console.log(`Your API key is ${process.env.API_KEY_WEA}`)
console.log(`Your API key is ${process.env.API_KEY_PIX}`)


// let textapi = ({
//     application_key: process.env.API_KEY
// });


const app = express()

app.use(express.static('dist'))

app.use(cors())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('travel-app listening on port 8080!')
})