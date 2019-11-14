const express = require('express');
const path = require('path')
//const ejs = require('ejs'); unnecessary

//Initializations
const app = express();

//Settings
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routes
app.get('/',(req,res) => {
	res.render('index');
});

// Start the server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});