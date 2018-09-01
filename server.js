const express = require ('express'); 
const hbs = require('hbs'); 
const fs = require('fs'); 

const port = process.env.PORT || 3000; 
//app set equal to the return result from calling express as a function
var app = express(); 
//use some middleware

hbs.registerPartials(__dirname + '/views/partials'); 
app.set('view engine', 'hbs'); 


//next tells express when we're done running
app.use((request, response, next) => {
	var now = new Date().toString(); 
	var log = `${now}: ${request.method} ${request.url}`; 

	console.log(log); 
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log.')
		}
	}); 
	next(); 
}); 

app.use((request, response, next) => {
	response.render('maintenance.hbs'); 
}); 

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
	return new Date().getFullYear()
}); 

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase(); 
}); 

app.get('/', (request, response) => {
	//response.send('<h1>Hello Express!</h1>'); 
	response.render('home.hbs', {
		pageTitle: 'Home Page', 
		currentYear: new Date().getFullYear(), 
		welcomeMessage: 'Hey there!'
	});

}); 

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About Page', 
		currentYear: new Date().getFullYear()
	}); 
}); 


app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Unable to handle request'
	}); 
}); 
//bad 

//binds app to port on machine
app.listen(port, () => {
	console.log(`Server is up on port ${port}`); 
}); 