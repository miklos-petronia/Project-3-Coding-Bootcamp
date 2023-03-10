const { gql } = require('graphql-tag');

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    password: String
    notes: [Note]
    noteCount: Float
  }

  type Note {
    _id: ID
    category: String
    text: String
    link: String
    username: String
    createdAt: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    notes(username: String!): [Note]
    note(_id: ID!): Note
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    postNote(category: String! text: String!, link: String, username: String!): Note
    updateNote(category: String text: String, link: String, _id: ID!): Note
    removeNote(_id: ID!): Note
  }
`;

module.exports = typeDefs;