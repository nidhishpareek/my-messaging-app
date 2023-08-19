import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
import typeDefs from "./GraphQL/typedefs/index";
import resolvers from "./GraphQL/resolvers/index";
import dotenv from "dotenv";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLContext, SessionX } from "./Utils/types";
import { getServerSession } from "./Utils/functions";
import { PrismaClient } from "@prisma/client";

async function main() {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);
  const prisma = new PrismaClient();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const corsOptions: cors.CorsOptions = {
    origin: process.env.ORIGIN_DOMAIN,
    credentials: true,
  };

  app.use(cors(corsOptions));

  const server = new ApolloServer<GraphQLContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const session: SessionX = await getServerSession(
          req?.headers?.cookie || ""
        );
        return { session, prisma };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

main().catch((err) => {
  console.log(err);
});
