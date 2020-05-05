const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Paulina Szyszko'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Paulina Szyszko'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'What can I help you?',
        title: 'Help',
        name: 'Paulina Szyszko'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }
    geocode(req.query.address, (error,{longitude,latitude,location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
               return res.send({ error })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })

    })
    // res.send({
    //     location: 'Gdynia',
    //     forecast: 'It is snowing',
    //     address:req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Paulina Szyszko',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Paulina Szyszko',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})