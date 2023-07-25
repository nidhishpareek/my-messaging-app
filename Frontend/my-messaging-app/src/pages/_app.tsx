import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../Chakra/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ApolloProvider } from "@apollo/client";
import { client } from "../GraphQl/apollo-client";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
