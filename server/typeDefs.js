import { gql } from "apollo-server"

const typeDefs = gql`
    type Query{
        users:[User]
        messagesByUser(receiverId: Int): [Message]
    }

    type Token {
        token: String!
    }

    input UserInput {
        firstName: String!, 
        lastName: String!, 
        email: String!, 
        password: String!
    }

    input UserLoginInput {
        email: String!, 
        password: String!
    }

    scalar Date

    type Message {
        id: ID! 
        text: String!
        receiverId: Int!
        senderId: Int!
        createdAt: Date! 
    }


    type Mutation {
        signupUser(userNew: UserInput!): User
        signinUser(userLogin: UserLoginInput): Token
        createMessage(receiverId: Int!, text: String!): Message
    }

    type User {
        id:ID!
        firstName: String!
        lastName: String!
        email: String!
    }


`

export default typeDefs