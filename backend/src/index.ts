import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'type-graphql'
import { expressMiddleware } from '@as-integrations/express5'
import { AuthResolver } from './resolvers/auth.resolver'
import { UserResolver } from './resolvers/user.resolver'
import { buildContext } from './graphql/context'
import { IdeaResolver } from './resolvers/idea.resolver'
import { CommentResolver } from './resolvers/comment.resolver'
import { VoteResolver } from './resolvers/vote.resolver'

async function bootstrap() {
  const app = express()

  // Habilitar CORS
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      IdeaResolver,
      CommentResolver,
      VoteResolver,
    ],
    validate: false,
    emitSchemaFile: './schema.graphql',
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    }),
  )

  app.listen(
    {
      port: 4000,
    },
    () => {
      console.log(`Server is running on http://localhost:4000/graphql`)
    },
  )
}

bootstrap()
