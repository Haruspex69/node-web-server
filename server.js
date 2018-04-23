const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(function(req, res, next){//middleware
  var now = new Date().toString();//human readable time
  var log = `${now}: ${req.method} ${req.path}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });//moves to the next line

  next();
});

// app.use(function(req, res, next){
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function(){
  return new Date().getFullYear();
}); //injects in all templates the 'getCurrentYear' object

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>hello express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'This is my new customized pharagraph'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', function(req, res){
  res.render('projects.hbs');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something went wrong!'
  });
});

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});
