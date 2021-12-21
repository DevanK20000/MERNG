const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
// const gql = require("graphql-tag");
const mongoose = require("mongoose");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
// const Post = require("./models/Post");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();
const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
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
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
