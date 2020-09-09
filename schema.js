const axios = require("axios");

const {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    id: { type: GraphQLString },
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    date_local: { type: GraphQLString },
    details: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    links: { type: Links },
    rocket: { type: GraphQLString },
  }),
});

const Links = new GraphQLObjectType({
  name: "Links",
  fields: () => ({
    youtube_id: { type: GraphQLString },
    article: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
  }),
});

const Rocket = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    stages: { type: GraphQLInt },
    boosters: { type: GraphQLInt },
    cost_per_launch: { type: GraphQLInt },
    success_rate_pct: { type: GraphQLInt },
    first_flight: { type: GraphQLString },
    country: { type: GraphQLString },
    company: { type: GraphQLString },
    height: { type: Height },
    diameter: { type: Diameter },
    mass: { type: Mass },
  }),
});

const Height = new GraphQLObjectType({
  name: "Height",
  fields: () => ({
    meters: { type: GraphQLInt },
    feet: { type: GraphQLInt },
  }),
});

const Diameter = new GraphQLObjectType({
  name: "Diameter",
  fields: () => ({
    meters: { type: GraphQLInt },
    feet: { type: GraphQLInt },
  }),
});

const Mass = new GraphQLObjectType({
  name: "Mass",
  fields: () => ({
    kg: { type: GraphQLInt },
    lb: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v4/launches")
          .then((res) => res.data);
      },
    },
    launch: {
      type: LaunchType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/launches/${args.id}`)
          .then((res) => res.data);
      },
    },
    rocket: {
      type: Rocket,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
