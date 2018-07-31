export const MongoClient = require('mongodb').MongoClient;
import * as assert from 'assert';

export const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db.close();
});

export const findDocument = (fileName: String, db, callback) => {
    let dbo = db.db("mydb");
    let collection = dbo.collection(fileName);
    collection.find({}).toArray(function (err, docs) {
        if (err) throw err;
        console.log("Found the following records");
        callback(docs);
    })
};

export const saveParsedFile = (req, res, parsedObject) => {
    MongoClient.connect((url + "vocab"), (err, db) => {
        if (err) throw err;
        let dbo = db.db("mydb");
        let collection = dbo.collection(req.params.fileName);
        collection.insertMany([parsedObject]);
        res.send("Insertion successful.");
    })
    //     .then(() => {
    //
    // });
}

