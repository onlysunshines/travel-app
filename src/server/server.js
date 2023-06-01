// empty JS object endpoint for all routes
let projectData = {};

const path = require('path')
const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv')
dotenv.config();

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

app.use(cors())

// const port = 3030;

// const server = app.listen(port, listening);

// function listening() {
//     console.log('server running');
//     console.log(`running on localhost: ${ port }`)
// }

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/add', addData);

function addData (req, res) {
    newEntry = {
        departure: req.body.days,
        duration: req.body.tripLength,
        current: req.body.currentTemp,
        forecast: req.body.forecastArray,
        historical: req.body.historyDailyArray,
        photo: req.body.img
    };

    res.send(newEntry)
}

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('travel-app listening on port 8080!')
})

console.log(`this is the project data ${projectData}`)
