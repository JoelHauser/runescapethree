const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  password: String
  questions: [Question]
}

type Auth {
  token: ID!
  user: User
}

type Question {
  _id: ID
  createdBy: String
  questionText: String
  answerA: String
  answerB: String
  voteA: Int
  voteB: Int
}

type Query {
  questions: [Question]
  question(_id: ID!): Question
  me: User
}

type Mutation {
  addUser(username: String!, password: String!): Auth
  login(username: String!, password: String!): Auth
  addQuestion(questionText: String!, answerA: String!, answerB: String!): Question
  addVote(voteA: Int!, voteB: Int!): Question
}
`;

module.exports = typeDefs;