import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../tools/withData";

class Hausmix extends App {
  static async getInitialProps({ Component, ctx }) {
    console.log(window.location);
    if (document.location.protocol !== "https:") {
      document.location.href =
        "https://www.hausmix.com" + document.location.pathname;
    }
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(Hausmix);
