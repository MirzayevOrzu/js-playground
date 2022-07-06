const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasource/track-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    trackApi: new TrackAPI(),
  }),
});

server.listen().then(() => {
  console.log('Server is listening on port 4000');
});
