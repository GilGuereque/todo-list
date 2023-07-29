// Setting up express application and PORT variable
const express = require('express');
const app = express();
const PORT = 5050;

require('dotenv').config()


// Render page using GET function
app.get('/', function(req, res){
    res.render('index.ejs')
});


// Setting up app to run on localhost PORT 5050
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
});