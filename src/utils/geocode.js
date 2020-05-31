const request = require('request');

const geocode = (location,callback)=>{
    const geocodeUrl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibmFnaXJlZGR5cGkiLCJhIjoiY2thc3J1b2FtMHMwajJxcWYwN3hpdjU0NSJ9.-_NnvL5drcAYUo4nhgGMvg&limit=1`
    request({url:geocodeUrl,json:true},(err,res)=>{
        if(err){
            callback('Unable to connect!',undefined);
        }
        else if(res.body.features.length===0){
            callback('unable to find location. try another search.', undefined);
        }
        else{
            const latlag=res.body.features[0].center
            callback(undefined,{latitude:latlag[1],longitude:latlag[0],location:res.body.features[0].place_name});
        }
    })
}

module.exports = geocode;