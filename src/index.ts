require('dotenv').config();

import 'module-alias/register';

import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import { DocumentNode } from 'graphql';
import schema from './schema';
import models from './models';

// connect to the database
mongoose.connect(process.env.MONGO_DB_URI as string, { useNewUrlParser: true }, (err: any) => {
    if (!err) {
        console.log('connected to the db');
    } else {
        console.log('mongo connection error', err);
    }
});

const server = new ApolloServer({
    typeDefs: schema.typeDefs as DocumentNode[],
    resolvers: schema.resolvers,
    context: ({ req, res }) => ({
        models,
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
