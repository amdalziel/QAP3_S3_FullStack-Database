const express = require('express');
const methodOverride = require('method-override'); 
const app = express();
const port = 3000; 

global.DEBUG = true;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); // harvest values from the URL 
app.use(methodOverride('_method'));  // Override - HTML only recognizes PUT and GET 
// Must override for PATCH, PUT, DELETE


app.get('/', (req, res) => {
    res.render('index'); 
}); 

// anything beginning with '/api' will go into this 
const apiRouter = require('./routes/api'); 
app.use('/api', apiRouter); 


// anything beginning with '/profiles' will go into this 
const profilesRouter = require('./routes/profiles');
app.use('/profiles', profilesRouter); 

app.listen(port, () => {
    if(DEBUG) console.log(`Travel Bug App running on port ${port}`);
}); 