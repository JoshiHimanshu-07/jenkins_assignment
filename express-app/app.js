var express = require('express');
var app = express();

app.set('view engine', 'ejs');

const URL = process.env.BACKEND_URL || 'http://65.0.169.209:5000/api';


const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/', async function(req, res) {
  const options = {
    method: 'GET'
  };

  try {
    const response = await fetch(URL, options);
    const json = await response.json();
    console.log(json); 

    // send data to EJS template for rendering in browser
    return res.render('index', { data: JSON.stringify(json) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error.' });
  }
});

app.listen(3000, function() {
  console.log('App listening on Port 3000!');
});