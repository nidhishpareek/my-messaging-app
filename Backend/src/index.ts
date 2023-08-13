import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import typeDefs from "./GraphQL/typedefs/index";
import resolvers from "./GraphQL/resolvers/index";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import "dotenv/config";

async function main() {
  const app = express();
  const httpServer = http.createServer(app);

  // TODO:Take origin from the local-host
  const corsOptions: cors.CorsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(
    `🚀🚀🚀 Server ready at http://localhost:4000${server.graphqlPath}`
  );
}
main().catch((err) => {
  console.log(err);
});
