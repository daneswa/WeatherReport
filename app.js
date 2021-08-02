const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey ="24c308eee1f7deacbe9a82d5aaa41a94";
    const unit = "metric";
    const api = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + query + "&appid=" + apiKey +"&units=" + unit;

    https.get(api, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const apiInfo = JSON.stringify(weatherData.message);
            console.log(apiInfo);
            res.write("<p>This page will call an API from external website <p>");
            res.write("<h1>The response from the API is " + apiInfo + "</h1>");
            res.send()
        })
    })
})





app.listen(3000, function() {
    console.log("Server has started at port 3000");
});