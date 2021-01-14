const request = require('request');

const geoCode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoid2F6aWRodXNzYWluIiwiYSI6ImNraGt3OGxrajEyZ3UycXFrbHhnaWxrcjQifQ.wAdVYWV3EweTAkITbCVPTQ&limit=1";
    //console.log("Url is: ", url);
    request({url:url, json: true}, (error, response)=>{
        if(error){
            callback('This is low level error may be your network is not connected', undefined);
        }
        else if(response.body.features.length === 0){
            callback('May be your url is not correct', undefined);
        }
        else{
            var resObj = {
                 longitude : response.body.features[0].center[0],
                 latitude : response.body.features[0].center[1],
                 location : response.body.features[0].place_name
            }
            callback(undefined,resObj);
        }
    })
}

module.exports = geoCode;