const resolvers = {
  Query: {
    // returns array of tracks for home page
    getTracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackApi.getTracksForHome();
    },
    // returns a single track by id
    getTrack: (_, { id }, { dataSources }) => {
      return dataSources.trackApi.getTrack(id);
    },
    getTrackModules: ({ id }, _, { dataSources }) => {
      return dataSources.trackApi.getTrackModules(id);
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackApi.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackApi.getTrackModules(id);
    },
  },
};

module.exports = resolvers;
