// Setting up express application and PORT variable
const express = require('express');
const app = express();
const PORT = 5050;

require('dotenv').config()

// Set up MongoDB configuration


// Setting up configurations & middleware for Express
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Render page using GET function
app.get('/', (req, res) => {
    res.render('index.ejs')
});

// POST request for updating Tasks list
app.post('/addTodo', (req, res) => {
    res.redirect('/')
});


// Setting up app to run on localhost PORT 5050
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
});