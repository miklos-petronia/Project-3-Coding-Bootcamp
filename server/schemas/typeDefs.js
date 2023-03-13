const { gql } = require('graphql-tag');

const typeDefs = gql`

type Note {
    _id: ID
    category: String
    noteInput: String
    link: String
    createdAt: String
    userName: String
    shared: Boolean
  }

type User {
    _id: ID
    firstName: String
    userEmail: String
    userName: String
    userPwd: String
    question: String
    answer: String
    notes: [Note]
    sharedUserNotes: [Note]
    notesTotal: Float
  }

  type Token {
    authUser: User
    userToken: ID!
  }

  type Share {
    _id: ID
    sharedCategory: String
    sharedNotes: [Note]
  }

  type Mutation {
    signIn(userName: String!, userPwd: String!): User
    additionalSignIn(userName: String! answer: String!): Token
    createUser(firstName: String! userEmail: String!, userName: String!, userPwd: String!, question: String!, answer: String!): Token
    postNote(category: String! noteInput: String!, link: String, userName: String!, shared: Boolean): Note
    updateNote(category: String noteInput: String, link: String, _id: ID!): Note
    deleteNote(_id: ID!): Note
    shareUserNote(_id: ID!): Share
  }

  type Query {
    noteOne(_id: ID!): Note
    notesAll(userName: String!): [Note]
    sharedOne(sharedCategory: String!): Share
    sharedAll: [Share]
    userOne(userName: String!): User
    usersAll: [User]
  }

`;

module.exports = typeDefs;