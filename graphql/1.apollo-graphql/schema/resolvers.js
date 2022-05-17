import { client } from '../db.js';

const resolvers = {
  Query: {
    async cars() {
      console.log('resolvers.Query.cars');
      const { rows } = await client.query('SELECT * FROM car');

      return rows;
    },
  },
};

export default resolvers;
