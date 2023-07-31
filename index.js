// Setting up express application and PORT variable
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 5050;

require('dotenv').config()

// Set up MongoDB configuration
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// Setting up configurations & middleware for Express
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Render page using GET function
app.get('/', (req, res) => {
    try {
        const todoItems = db.collection('todos').find().toArray();
        const itemsLeft = db.collection('todos').countDocuments({completed: false});
        res.render('index.ejs', {items: todoItems, left: itemsLeft});
    } catch (error) {
        console.error(error)
        express.response.status(500).send('500 HTTP status code. A server error has ocurred from the GET request');
    }
});

// POST request for inserting to Tasks list
app.post('/addTodo', (req, res) => {
    try {
        db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
        .then(result => {
            console.log('Todo Task Added')
            res.redirect('/')
        })
    } catch (error) {
        console.error(error)
        express.response.status(500).send('500 HTTP status code. A server error has ocurred from the POST request');
    }
    
});


// Setting up app to run on localhost PORT 5050
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


// Export the Express API
module.exports = app;