const request = require('request');

const forCast = (latitude, longitude, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=246fa9b916e01251d9c8104511072e4f&query="+latitude+","+longitude+"";
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('unable to fetch data from url may be network not connected', undefined);
        }
        else if(response.body.error){
            callback('may be url is not correct', undefined);
        }
        else{
            let forecastObj = {
                currenttemp: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            }
            callback(undefined, forecastObj);
        }
    })
}

module.exports = forCast;