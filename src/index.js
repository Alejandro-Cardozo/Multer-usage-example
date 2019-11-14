const express = require('express');
const path = require('path');
//const ejs = require('ejs'); unnecessary
const uuid = require('uuid/v4');
const multer = require('multer');

//Initializations
const app = express();

//Middlewares
const storage = multer.diskStorage({
	destination: path.join(__dirname, '/public/img'),
	filename: (req, file, cb) => {
		cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
	}
})

const up = multer({
	storage: storage,
	dest: path.join(__dirname, '/public/img'),
	limits: {fileSize: 1000000},
	fileFilter:(req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname));
		if (mimetype && extname) {
			return cb(null,true);
		}
		cb("Error: The file should be an image");
	}
}).single('image')
app.use(up);

//Settings
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routes
app.use(require('./routes/routes.js'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});