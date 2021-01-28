import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    me: User,
    books: [Book]
  }

  type User {
    username: String!
  }

  type Book {
    title: String
    author: String
  }
`;

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crishton"
  }
];

const resolvers = {
  Query: {
    me: () => ({ username: 'onizuka' }),
    books: () => books
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 23456 }, () => {
  console.log('server on http://localhost:23456/graphql');
});
