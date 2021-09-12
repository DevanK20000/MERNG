const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
// const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
// const Post = require("./models/Post");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

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
