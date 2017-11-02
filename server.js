var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var request = require('request')


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('./public'))


app.get('/', function(req, res){
    res.sendFile('./public/html/index.html', {root:'./'})
})

app.get('/newdate', function(req, res){
    // console.log('The server app.get is getting called')
    // console.log(req.query.dateKey)
    request(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.dateKey}&end_date=${req.query.dateKey}&api_key=oelul3xgp43s2yLjkmIuyJzOYqhKKLCke4XB24nh`, function (error, response, body) {
        if ( error || (response.statusCode !== 200) ) {
            console.log("Failed to send the request")
            res.send("Failed to send the request")
        }
        else {
            
            var bodyAsObj = JSON.parse(body) 
            
            res.send(bodyAsObj);
        }
    })
})

app.listen(8080, function(){
    console.log("The app is running on port 8080")
})