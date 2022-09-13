const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'Peliculas'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('Movies')
  return collection.insertOne(item)
}


const getPelis = (name) => {
  console.log(name)
  const filter = {
   'title': {$regex: new RegExp(name)}
  };
  const projection = {
    'title': 1,
    'year': 1, 
    '_id': 0
  };
  const coll = db.collection('Movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}


module.exports = { init, insertItem, getPelis }
