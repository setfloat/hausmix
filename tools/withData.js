import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";
import gql from "graphql-tag";

// import { LOCAL_STATE_QUERY } from '../components/whatever';
const LOCAL_STATE_QUERY = gql`
  query {
    agreedToCookies @client
  }
`;

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    // local data queries and mutations #cancelRedux
    clientState: {
      resolvers: {
        Mutation: {
          agreedToCookies(_, variables, { cache }) {
            // read the agreedToCookies value from the cache
            const { agreedToCookies } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            // Write the agreedToCookies State to the opposite
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
