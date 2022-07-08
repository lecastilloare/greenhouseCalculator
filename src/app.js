"use strict";

// IN THE BELOW WE SAY WE WANT TO USE EXPRESS AND WE STORE THAN IN A VARIABLE WE CAN USE. THE EXPRESS VARIABLE IS NOW A FUNCTION BECAUSE THAT IS WHAT IS RETURNED WITH THE INITIAL REQUIRE FUNCTION. 
const express = require(`express`);
const res = require("express/lib/response");

// WE ARE GOING TO EXECUTE EXPRESS IN THIS VARIABLE, THIS GIVES US THE ABILITY TO CREATE ROUTES IN AN EASIER WAY
// WE ALSO HAVE ACCESS TO THE FOLLOWING NOW WITH THE LINE BELOW: app.get(), app.post(), app.put(), app.delete()
const app = express();

// MIDDLEWARE - A FUNCTION THAT EXECUTES WHEN ROUTES ARE BEING HIT ////////////////////////////////////////////////////////////////////////////////
// FOR EXAMPLE, WHEN WE ARE HITTING THE ROOT ROUTE EXECUTE THIS BELOW. The console.log will show up in the terminal.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(`/`, () => console.log(`This is cause by the middle ware`));

// THE BELOW IMPORTS BODY PARSER ////////////////////////////////////////////////////////////////?////////////////////////////////////////////
// THIS ALLOWS US TO TAKE INCOMING POST REQUEST BODIES 
// -- import bodyParser from "body-parser";
//- technically express has its own middleware 

//THE BELOW IS WHAT HIDES THE API KEY THAT WE GET FROM CLIMATIQ ////////////////////////////////////////////////////////////////////////////////////
//THIS WON'T GET PUSHED TO THE REPO AND INSTEAD WILL LIVE IN A FILE ON THE SERVER
//WITH THE REQUIRE WE CAN ACESS DOTENV FILES
// TO USE THE SPECIFICAlLY CREATED VARIABLE TYPE THE FOLLOWING: process.env.CLIMATIQAPI_KEY
require(`dotenv`).config();

// THE BELOW IMPORTS THE CODE FROM THE CLIMATIQINFO.JS FOLDER////////////////////////////////////////////////////////////////?/////////////////////
const climatiqAPI = require(`./greenhouse`);
let outputOftheAPI1;
let outputOftheAPI2;
let outputOftheAPI3;
// This is just saying we will be using json data in out whole application ////////////////////////////////////////////////////////////////////////
// --app.use(bodyParser.json());

// The below handles part of the call to the climatiq api ///////////////////////////////////////////////////////////////////////////////
const argPoulty1 = {
    id: "consumer_goods-type_meat_products_poultry",
    region: "US"
}
const argPoultry2 = {
    "money": 961,
    "money_unit": "usd"
}

const argWater1 = {
    id: "water-collected_purified_water_distribution_of_water_services",
    region: "US"
}
const argWater2 = {
    "money": 1884,
    "money_unit": "usd"
}
const argCar1 = {
    id: "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na",
    region: "US"
}
const argCar2 = {
    distance: 14263,
    distance_unit: "mi"
}
const asyncApiCall1 = async () => {
    try {
        const response1 = await climatiqAPI.getGreenhouse(argPoulty1, argPoultry2)
        const response2 = await climatiqAPI.getGreenhouse(argWater1, argWater2)
        const response3 = await climatiqAPI.getGreenhouse(argCar1, argCar2)
        // console.log(response.data.emission_factor.year);
        // The response.data has to do with what you want axios to display as your data
        outputOftheAPI1 = response1.data.co2e;
        outputOftheAPI2 = response2.data.co2e;
        outputOftheAPI3 = response3.data.co2e;
        console.log(outputOftheAPI1, outputOftheAPI2, outputOftheAPI3);

    } catch (err) {
        console.log(err);
    }
};
// You need to actually call it for it to run
asyncApiCall1(); // What is returned is a promise


// ROUTES /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STRUCTURE HERE IS REALLY JUST app.get(path, callback )
// THE BELOW IS THE ROOT ROUTE
// All get means is that it shoots us back a message 
// function (request, response) = route handler
// app.get(`/`, (req, res) => {
//     res.send(`Hello World!!!`);

// });

// IM USING THE BELOW TO SEND A RESPONSE BACK WHEN THE CLIENT ASKS FOR THE SPECIFIC URL
app.get(`/resources`, (request, response) => {

    // response.send(outputOftheAPI);
    //response.render(outputOftheAPI)
    response.status(200).json(outputOftheAPI)
});







// In the below i'm going to try and see if I can write a function that pulls only the data we need which in this case is the number for the carbon emissions
console.log()
// BEFORE WE CREATE A ROUTE, WE HAVE TO FIGURE OUT HOW TO LISTEN TO A SERVER WE START UP, /////////////////////////////////////////////////////////
// You can close out the server with:  Control + C    (This works on mac)
// http://localhost:3000/ 
// Note that the following hard codes the enviornment variable: app.listen(3000, () => console.log("Listening on port 3000")); 
// We fix the above problem by using an enviornment variable called PORT

const port = process.env.PORT || 3200;  // This basically says use the port enviornment at hand else use port 3000
app.listen(port, () => console.log(`Listening on the following port: ${port}`));




