const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://dev:dev123@cluster0.y26tu.mongodb.net/merng?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
});
client.connect((err) => {
  const collection = client.db("merng").collection("posts");
  console.log(collection);
  // perform actions on the collection object
  client.close();
});
