const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define path for Express config and setup static directory
app.use(express.static(path.join(__dirname,'../public')))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'aliabirshuvro'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'aliabirshuvro'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Contact: 01684324474',
        title: 'Help',
        name: 'aliabirshuvro'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={}) =>{
        if(error){
            return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products',(req, res) => {
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search tree'    
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*',(req, res) => {
    res.render('404',{
        message: 'Help article not found!',
        title: 'Error 404',
        name: 'aliabirshuvro'
    })
})
app.get('*',(req, res) => {
    res.render('404',{
        message: 'Page not found!',
        title: 'Error 404',
        name: 'aliabirshuvro'
    })
})

app.listen(port,() => {
    console.log('Server is up on port ' + port)
})
