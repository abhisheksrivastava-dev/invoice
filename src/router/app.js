const path = require('path')
const express = require('express')
const hbs = require('hbs')
// const geoCode = require('../../public/homepage/')
// const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../../public/')
const viewsPath = path.join(__dirname, '../../public/homepage')
// const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views template
app.set('views', viewsPath)
app.set('view engine', 'hbs')
// hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('homepage', {
        title : 'Weather App',
        name : 'Abhishek Srivastava'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }
    console.log(req.query.address)
    res.send(req.query.address)
    // geoCode(req.query.address, (error, {latitude, longitude, location} = {})=>{
    //     if(error){
    //         return res.send({ error })
    //     } 
    //     forecast(latitude, longitude, (error, forecastData)=>{
    //         if(error){
    //             return res.send({ error })
    //         }
    //         res.send({
    //             location,
    //             forecast: forecastData,
    //             address: req.query.address
    //         })
    //     })
    // })
})

app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})