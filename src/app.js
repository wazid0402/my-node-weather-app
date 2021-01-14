const geoCode = require('./utils/geocode');
const forecast = require('./utils/forcast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

var app = express();
const port = process.env.PORT || 3000;
//Here you can see how actually "path" which is node core module is working
// console.log(__dirname);
// console.log(path.join(__dirname, '..'));
// console.log(path.join(__dirname, '..', '/public'));

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index', {
        title: "Home Page",
        name: "Wazid",
        subject: "Nodejs"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About Page",
        author: "Wazid",
        city: "Hyderabad"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help Page",
        helper:"Wazid",
        course:"Node js"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        res.send({
            error: 'You must provide address query to your http request'
        })
    }
    else{
        geoCode(req.query.address, (error,data)=>{
            if(error){
               res.send({
                   error: 'No Forecast available for your searched City'
               })
            }
            if(data){
                forecast(data.latitude, data.longitude, (error, forecastData) => {
                    res.send({
                        location: data.location,
                        forecast: forecastData,
                        searchedCity: req.query.address
                    })
                })
            }
        })
    }
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide search query in http request'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: "404",
        errorMsg: "Help Article not found"
    });
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: "404",
        errorMsg: "Page not found"
    });
})
app.listen(port, ()=>{
    console.log("Server started at port "+port);
})