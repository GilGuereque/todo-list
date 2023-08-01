// Setting up express application and PORT variable
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
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
app.get('/', async (req, res) => {
    try {
        const todoItems = db.collection('todos').find().toArray();
        const itemsLeft = db.collection('todos').countDocuments({completed: false});
        res.render('index.ejs', {items: todoItems, left: itemsLeft});
    } catch (error) {
        console.error(error)
        res.status(500).send('500 HTTP status code. A server error has ocurred from the GET request');
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
        res.status(500).send('500 HTTP status code. A server error has ocurred from the POST request');
    }
    
});


// PUT request for updating tasks list to complete
app.put('/markComplete'), (req,res) => {
    try {
        db.collection('todos').updateOne({thing: request.body.itemFromJS},{
            $set: {
                complete: true
            }
        },{
            sort: {_id: -1},
            upsert: false
        })
        .then(result => {
            console.log('Task Marked Complete')
            response.json('Task Marked Complete')
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('500 HTTP status code. A server error has occured from the PUT request while marking complete')
    }
};

// PUT request for updating tasks to uncomplete
app.put('/markUncomplete'), (req,res) => {
    try {
        db.collection('todos').updateOne({thing: request.body.itemFromJS}, {
            $set: {
                complete: false
            }
        },{
            sort: {_id: -1},
            upsert: false
        })
        .then(result => {
            console.log('Task Marked Uncomplete')
            res.json('Task Marked Uncomplete')
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('500 HTTP status code. A server error has ocurred from the PUT request while marking uncomplete.')
    }
};


// Setting up app to run on localhost PORT 5050
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


// Export the Express API
// module.exports = app;