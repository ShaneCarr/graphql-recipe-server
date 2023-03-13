//// option 1
// const express = require('express')
// //const expressGraphQL = require('express-graphql')
// const { graphqlHTTP } = require('express-graphql');

// const schema = require('./schema')

// const app = express()
// app.use('/graphql',  graphqlHTTP({
//     schema,
//     graphiql: true
// }))

// app.listen(3000, () => {
//     console.log('Server is running at port 3000')
// })


//// option 2
// const app = express();
// const server = new ApolloServer({ typeDefs, resolvers });

// server.applyMiddleware({ app, path: '/some-custom-path' });

// app.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// );


const { ApolloServer } = require('apollo-server')
// const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')


const { loadDocumentsSync, loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');

// this can also be a glob pattern to match multiple files!
// const typeDefs = loadDocumentsSync("schema/**/*.graphql", { 
//     loaders: [
//         new GraphQLFileLoader()
//     ]
// })

const typeDefs = loadSchemaSync('**/*.graphql', { loaders: [new GraphQLFileLoader()] })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
})

server
  .listen()
  .then(({ url }) => console.log('Server is running on localhost:4000'))
