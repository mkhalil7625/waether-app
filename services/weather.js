const request=require('request');

//create getWeather function
var getWeather=(lat,lng,callback)=>{
    request({
        //inject the lat and lng
        url:`https://api.darksky.net/forecast/0eb31b3739e3af9505c1867a95e1897d/${lat},${lng}`,
        json:true
    },(error,response,body)=>{
        if(!error &&response.statusCode===200){
            callback(undefined,{//create an undefined variable for the errorMessage as things are going well
                temperature: body.currently.temperature,
                apparentTemperature:body.currently.apparentTemperature,
                weeklySummary:body.daily.summary,
                dailySummary:body.daily.data[0].summary//data is an array
            });
        }else  {
            //if error or response.statusCode===400
            callback('unable to fetch weather');
        }

    });
};
module.exports.getWeather=getWeather;