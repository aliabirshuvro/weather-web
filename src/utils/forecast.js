const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=hourly,daily&appid=fe224b61c85ac08fb3774685d7b7fe85'
    //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const t=(body.current.temp-273.15).toFixed(2)
            const f=(body.current.feels_like-273.15).toFixed(2)
            callback(undefined, body.current.weather[0].description + '! It is currently ' + t + ' degress out. But it feels like ' + f + '. Humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast