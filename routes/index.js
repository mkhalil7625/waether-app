var express = require('express');
var router = express.Router();
var geocode=require('../services/geocode');
var weather=require('../services/weather');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/addAddress', function (req, res, next) {
    var address=req.query.address;//get the address to be passed in to geocode
    //call geocodeAddress from geocode.js, pass in the address
    geocode.geocodeAddress(address,(errorMessage, results)=>{
        if (errorMessage){//if we get an error back from geocode
            res.send(errorMessage);
        }else{
            console.log(results.address, results.latitude, results.longitude);
            //chaining the weather callback
            //call the getweather function
            //pass in the latitude and longitude that came back as a result from geocodeAddress
            weather.getWeather(results.latitude,results.longitude,
                (errorMessage, weatherResults)=>{
                    if (errorMessage){
                        res.send(errorMessage);
                    }else{
                        res.render('result',{
                            address: results.address,
                            currentTemp:weatherResults.temperature,
                            tempFeelsLike:weatherResults.apparentTemperature,
                            dailySummary:weatherResults.dailySummary,
                            weeklySummary:weatherResults.weeklySummary,
                            icon:weatherResults.icon
                        });
                        // res.send(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.
                        //   Today it is ${weatherResults.dailySummary}, This week ${weatherResults.weeklySummary}.`);
                    }
                });
        }
    });

});

module.exports = router;
