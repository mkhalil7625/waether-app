const request=require('request');

var geocodeAddress=(address, callback)=>{
    var encodedAddress=encodeURIComponent(address);//to be injected in the URL
    // (replace the spaces in the address entered with %20 sothat node can be able to process the url)
    //request function will take 2 arguments:
    //the options object where information are configured:where we specify things unique to the request
    //the callback function which is going to get callback once the data comes back from the HTTP endpoint
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json:true//will tell request that the data coming back is JSON and to take the data and convert it to an object
    },(error, response, body)=>{//the arguments that are going to be passed back by request(from the request documentation)
        if(error){
            //console.log('Unable to connect to google maps ');
            callback('Unable to connect to google maps ');
        }else if(body.status==="ZERO_RESULTS"){ //error from google server indicating failed request
            callback("Wrong address");
        }else if(body.status==="OK") {
            callback(undefined,{//create an undefined variable for the errorMessage as things are going well
                address:body.results[0].formatted_address,
                latitude:body.results[0].geometry.location.lat,
                longitude:body.results[0].geometry.location.lng
            });
//console.log(body);
            //to see all the objects
            // console.log(JSON.stringify(body,undefined, 2))
            // to access the formatted address
            // console.log(`Address: ${body.results[0].formatted_address}`)
            // // to print the lat and long of a location
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
        }
    });
};
module.exports.geocodeAddress=geocodeAddress;
