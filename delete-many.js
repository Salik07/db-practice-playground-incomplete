const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "playground";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    console.log("Connected successfully!");
    const db = client.db(databaseName);

    // db.collection("users").insertOne({
    //   name: "Salik",
    //   age: 25,
    // });

    db.collection("sales").insertMany([
      {
        _id: 1,
        item: "abc",
        price: 10,
        quantity: 2,
        date: "2014-03-01T08:00:00Z",
      },
      {
        _id: 2,
        item: "jkl",
        price: 20,
        quantity: 1,
        date: "2014-03-01T09:00:00Z",
      },
      {
        _id: 3,
        item: "xyz",
        price: 5,
        quantity: 10,
        date: "2014-03-15T09:00:00Z",
      },
      {
        _id: 4,
        item: "xyz",
        price: 5,
        quantity: 20,
        date: "2014-04-04T11:21:39.736Z",
      },
      {
        _id: 5,
        item: "abc",
        price: 10,
        quantity: 10,
        date: "2014-04-04T21:23:13.331Z",
      },
      {
        _id: 6,
        item: "def",
        price: 7.5,
        quantity: 5,
        date: "2015-06-04T05:08:13Z",
      },
      {
        _id: 7,
        item: "def",
        price: 7.5,
        quantity: 10,
        date: "2015-09-10T08:43:00Z",
      },
      {
        _id: 8,
        item: "abc",
        price: 10,
        quantity: 5,
        date: "2016-02-06T20:20:13Z",
      },
    ]);

    // const cursor = db.collection("sales").aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       count: { $sum: 1 },
    //     },
    //   },
    // ]);

    const cursor = db
      .collection("sales")
      .aggregate([{ $group: { _id: "$item" } }]);

    cursor
      .next()
      .then(function (docs) {
        // db.close();
        console.log(docs);
      })
      .catch(function (err) {
        console.dir(err);
      });

    // const cursor = db.collection("sales").aggregate([
    //   // First Stage
    //   {
    //     $group: {
    //       _id: "$item",
    //       totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
    //     },
    //   },
    //   // Second Stage
    //   {
    //     $match: { totalSaleAmount: { $gte: 100 } },
    //   },
    // ]);

    // 1.Delete Multi Users
    // db.collection("users").insertMany([
    //   {
    //     name: "Salik",
    //     age: 22
    //   },
    //   {
    //     name: "James",
    //     age: 24
    //   },
    //   {
    //     name: "Andrew",
    //     age: 27
    //   },
    //   {
    //     name: "Mike",
    //     age: 28
    //   }
    // ]);

    // db.collection("users").deleteMany({
    //   _id: {
    //     $in: [
    //       new ObjectID("5dec067b9551911a3c2c8ba7"),
    //       new ObjectID("5dec067b9551911a3c2c8ba9")
    //     ]
    //   }
    // });

    // 2. Modeling Referenced Relationships
    // db.collection("address").insertOne({
    //   building: "22 A, Indiana Apt",
    //   pincode: 123456,
    //   city: "Karachi",
    //   state: "Sindh"
    // });

    // db.collection("users").insertOne({
    //   name: "Tom Hanks",
    //   contact: "987654321",
    //   dob: "01-01-1991",
    //   address_ids: [
    //     ObjectID("5e52d3db7acc1c34183fc607"),
    //     ObjectID("5e52d43a81629f13a41d6a33")
    //   ]
    // });

    // db.collection("users").findOne({ name: "Tom Hanks" }, (err, user) => {
    //   if (err) {
    //     return console.log("Unable to fetch user.");
    //   }

    //   db.collection("address")
    //     .find({ _id: { $in: user["address_ids"] } })
    //     .toArray((err, address) => {
    //       if (err) {
    //         return console.log("unable to fetch address.");
    //       }

    //       console.log("address--", address);
    //     });
    // });
  }
);
