const express = require('express');

const bodyParser = require('body-parser');

const MongoClient = require('mongoDb').MongoClient;

const app = express();

var db;

MongoClient.connect('mongodb://mikeschen:password@ds027729.mlab.com:27729/crud', function(error, database) {
    if (error != null) {
        throw error;
        return;
    }

    db = database;
    console.log("connected");
    app.listen(3000, function() {
        console.log('my app is running');
    })
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {

  var cursor = db.collection('quotes').find ();
  cursor.toArray (function(error, result) {
    response.render('index.ejs', {
      result: result,
      data: {
        name: 'bob',
        list: [
          'sarah',
          'john',
          'ray'
        ],
        productList: [
          {
            name: 'bookbag'
          }
        ]
      }
    });
  });
});

app.post('/quotes', function(request, response) {
    console.log(request.body)
    db.collection('quotes').save(request.body, function(error, result) {
        if (error != null) {
            throw error;
            console.log(error);
        }
        response.redirect('/');
    });
});

app.put('/quotes', function(request, response) {
  db.collection('quotes').findOneAndUpdate(
    {
      name: 'yoda'
    },

    {
      $set: {
        name: request.body.name,
        description: request.body.description
      }
    },
    {
      sort: {_id: -1},
    },
    function (error, result) {
      if (error) {
        throw error;
        return;
      }
      response.send(result);
    }
  )
});

app.delete('/quotes', function(request, response) {
  db.collection('quotes').findOneAndDelete(
    {
      name: 'yoda'
    },
    function (error, result) {
      if (error) {
        throw error;
        return;
      }
      response.send(result);
    }
  )
});

//findOneAndDelete
