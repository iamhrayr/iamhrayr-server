require('dotenv').config();

import 'module-alias/register';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { DocumentNode } from 'graphql';

import initializeRoutes from './routes';
import schema from './schema';
import './configs/mongoDB';

const server = new ApolloServer({
    typeDefs: schema.typeDefs as DocumentNode[],
    resolvers: schema.resolvers,
    // engine: { apiKey: process.env.ENGINE_API_KEY },
    context: ({ req, res }) => ({
        models,
    }),
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initializeRoutes(app);

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`),
);
