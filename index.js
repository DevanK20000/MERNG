const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const Post = require("./models/Post");
const { MONGODB } = require("./config.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// mongoose.connect(
//   MONGODB,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     authSource: "merg",
//     connectTimeoutMS: 50000,
//     ssl: true,
//   },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("MongoDB Connected");
//     }
//   }
// );

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "merg",
    authMechanism: "SCRAM-SHA-1",
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
