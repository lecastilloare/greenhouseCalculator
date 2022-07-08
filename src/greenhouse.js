"use strict";

/// In the below w are saying we want to be able to use axios in this file/ we are importing it 
const axios = require(`axios`);

// This is the end point that the climatiq 3d party api is using.
const baseURL = `https://beta3.api.climatiq.io/estimate`;
// --const apiKEY = `Bearer:${process.env.CLIMATIQAPI_KEY}.`

// In the below it looks like we are sending our POST request to the third party API  
const options = {
    // Keey in mind that these values are hard coded in but other processes will change them later I think
    method: `POST`,
    url: baseURL,
    data: {
        emission_factor: {
            id: "consumer_goods-type_meat_products_poultry",
            region: "US"
        },
        parameters: {
            money: 961,
            money_unit: "usd"

        }
    },
    headers: {
        Authorization: `Bearer:DM8WWVCF46MXC1MRA9P25N23R15K`,
        "content-type": "application/json"
    }
}

// I'm export an object out of this file. The object has getGreenCalc as a method. All it's doing is passing the 

module.exports = {
    getGreenhouse: (emission_factor, parameters) => axios(options) // This returns a promise
}