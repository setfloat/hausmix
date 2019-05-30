import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";
import gql from "graphql-tag";

const LOCAL_STATE_QUERY = gql`
  query {
    agreedToCookies @client
  }
`;

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          agreedToCookies(_, variables, { cache }) {
            const { agreedToCookies } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            const data = {
              data: { agreedToCookies: !agreedToCookies }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        agreedToCookies: false
      }
    }
  });
}

export default withApollo(createClient);
export { LOCAL_STATE_QUERY };
