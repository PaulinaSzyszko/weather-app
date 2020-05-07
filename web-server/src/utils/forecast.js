const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    //console.log(latitude,longitude)
    const url= 'http://api.weatherstack.com/current?access_key=db1a12574eca7204fb478657cfbced6b&query='+latitude + ',' + longitude +'&units=m';
    request({url, json: true}, (error, {body}) => {
         if (error){
             callback ('Unable to connect to location services!', undefined)
         } else if (body.error){
             callback ('Incorrect latitude or longitude', undefined)
         } else {
             callback (undefined , body.current.weather_descriptions[0] +
                 '. It is currently ' + body.current.temperature + ' degress out. ' +
                 'It feels like ' + body.current.feelslike + ' degress out. ' + 'The wind speed is ' + body.current.wind_speed + ' ' +
             'The pressure is ' + body.current.pressure)
         }
    }) 
}

module.exports = forecast