const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Query to get Tracks for home page"
    getTracksForHome: [Track!]!
    getTrack(id: ID!): Track
    getTrackModules(id: ID!): [Module]
  }

  "A Track is a group of Modules that teach about a specific topic"
  type Track {
    id: ID!
    "Title of the track"
    title: String!
    "Author of the track"
    author: Author!
    "Image url for thumnail"
    thumbnail: String
    "Approximate time to complete Track in minutes"
    length: Int
    "Represents how many Modules are there in A Track"
    modulesCount: Int
    "Description of track"
    description: String
    "How many times a track has been viewed"
    numberOfViews: Int
    "Tracks complete array of Modules"
    modules: [Module!]!
  }

  type Module {
    id: ID!
    title: String!
    length: Int
  }

  "Author of a Track"
  type Author {
    id: ID!
    "Name of Track Author"
    name: String!
    "String url to a photo of author"
    photo: String
  }
`;

module.exports = typeDefs;
