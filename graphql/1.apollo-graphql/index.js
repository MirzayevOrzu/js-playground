import { ApolloServer } from 'apollo-server';
import typeDefs from './schema/type-defs.js';
import resolvers from './schema/resolvers.js';
import { client } from './db.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
  .then(() => client.connect())
  .then(() => console.log(':: Connected to database'));
