const express = require('express');
const path = require('path')
const multer = require('multer');
//const ejs = require('ejs'); unnecessary

//Initializations
const app = express();

//Settings
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(multer({
	dest: path.join(__dirname, 'public/img')
}).single('image'));

//Routes
app.get('/',(req,res) => {
	res.render('index');
});

app.post('/upload', (req, res) => {
	console.log(req.file); //req.file has data from the uploaded file
	res.send('uploaded');
});

// Start the server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});