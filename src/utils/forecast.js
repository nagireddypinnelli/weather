
const request = require('request');
const forecast=(latitude,longitude,callback)=>{
    var latlagstring=`${latitude},${longitude}`
    console.log(latlagstring);
    const url = `http://api.weatherstack.com/current?access_key=b62e247aa8f131fe917aaebfad79bcb3&query=${latlagstring}&units=m`;
        
    request({url:url,json:true},(err,response)=>{
        if(err){
            callback('Unable to connect!',undefined);
        }
        else if(response.body.error)
        {
            callback('Unable to find location try another location!',undefined);
        }
        else
        {
            const data = response.body.current;
            callback(undefined,
                `${data.weather_descriptions} it is currently with temp ${data.temperature} degree and there is a   ${data.feelslike} % change of rain`,
            )
        }
    })
}

module.exports = forecast;




