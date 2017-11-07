var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var express = require('express')

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: {
      index: 'index.html'
    }
  }).listen(4000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:4000');
  });


const app = express()

// app.use(bodyParser);
// 
app.use(express.json()); 
app.use(express.urlencoded());
// app.use(express.multipart());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/auth', function(req, res) {  
	if(req && req.body.username=='admin@test.com' && req.body.password=='123456') {
    res.send({success: true});	
	} else {
		res.json({"error": "Invalid Credentails"});	
	}  
}); 

app.post('/signup', function(req, res) {  
  if(req && req.body.email=='admin@test.com' && req.body.password=='123456') {
    res.send({success: true});  
  } else {
    res.json({"error": "Invalid Credentails"}); 
  }  
}); 

app.get('/getRides', function(req, res) {  
  if(req && req.query && req.query.from && req.query.to) {
    res.send({
      success: true,
      rides : [{
        name: 'John Doe',
        rating: 4.5,
        car: 'Polo',
        route: req.query.startAddress+' to whitefield',
        seatsAvailable: 2,
        duration: '6 min(s)',
        photo: 'https://www.shareicon.net/download/2015/09/14/100950_user_512x512.png',
        coordinates: {lat: parseFloat(req.query.from.lat) + 0.011, lng: parseFloat(req.query.from.lng) + 0.015}
      }, {
        name: 'Jack',
        rating: 4,
        car: 'BMW',
        route: 'Kormangala to Whitefield',
        seatsAvailable: 2,
        duration: '6 min(s)',
        photo: 'https://www.shareicon.net/download/2015/09/14/100950_user_512x512.png',
        coordinates: {lat: parseFloat(req.query.from.lat) + 0.002, lng: parseFloat(req.query.from.lng) + 0.025}
      }, {
        name: 'Jack',
        rating: 4,
        car: 'BMW',
        route: req.query.startAddress + ' to Whitefield',
        seatsAvailable: 2,
        duration: '6 min(s)',
        photo: 'https://www.shareicon.net/download/2015/09/14/100950_user_512x512.png',
        coordinates: {lat: parseFloat(req.query.from.lat) + 0.019, lng: parseFloat(req.query.from.lng) + 0.009}
      }, {
        name: 'Jack',
        rating: 2.1,
        car: 'BMW',
        route: 'Kormangala to Whitefield',
        seatsAvailable: 2,
        duration: '6 min(s)',
        photo: 'https://www.shareicon.net/download/2015/09/14/100950_user_512x512.png',
        coordinates: {lat: parseFloat(req.query.from.lat) + 0.009, lng: parseFloat(req.query.from.lng) + 0.009}
      },{
        name: 'Jack',
        rating: 4.2,
        car: 'BMW',
        route: 'Kormangala to Whitefield',
        seatsAvailable: 2,
        duration: '6 min(s)',
        photo: 'https://www.shareicon.net/download/2015/09/14/100950_user_512x512.png',
        coordinates: {lat: parseFloat(req.query.from.lat) + 0.009, lng: parseFloat(req.query.from.lng) + 0.009}
      }, {
        name: 'Jack',
        rating: 4.2,
        car: 'BMW',
        route: 'Kormangala to Whitefield',
        seatsAvailable: 2,
        duration: '6 min(s)',
        photo: 'https://www.shareicon.net/download/2015/09/14/100950_user_512x512.png',
        coordinates: {lat: parseFloat(req.query.from.lat) + 0.009, lng: parseFloat(req.query.from.lng) + 0.009}
      }, {
        name: 'Jack',
        rating: 4.2,
        car: 'BMW',
        route: 'Kormangala to Whitefield',
        seatsAvailable: 2,
        duration: '6 min(s)',
        photo: 'https://www.shareicon.net/download/2015/09/14/100950_user_512x512.png',
        coordinates: {lat: parseFloat(req.query.from.lat) + 0.00, lng: parseFloat(req.query.from.lng) + 0.009}
      }, {
        name: 'Jack',
        rating: 4.2,
        car: 'BMW',
        route: 'Kormangala to Whitefield',
        seatsAvailable: 2,
        duration: '6 min(s)',
        photo: 'https://www.shareicon.net/download/2015/09/14/100950_user_512x512.png',
        coordinates: {lat: parseFloat(req.query.from.lat) + 0.009, lng: parseFloat(req.query.from.lng) + 0.009}
      }, {
        name: 'Jack',
        rating: 4.2,
        car: 'BMW',
        route: 'Kormangala to Whitefield',
        seatsAvailable: 2,
        duration: '6 min(s)',
        photo: 'https://www.shareicon.net/download/2015/09/14/100950_user_512x512.png',
        coordinates: {lat: parseFloat(req.query.from.lat) + 0.009, lng: parseFloat(req.query.from.lng) + 0.009}
      }]
    });  
  } else {
    res.json({"error": "Invalid Inputs"}); 
  }  
}); 
app.listen(4001)