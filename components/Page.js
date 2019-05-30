import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";

const theme = {
  black: "#525252",
  grey: "#444444",
  lightGrey: "#E4E4E4",
  offWhite: "rgba(240,240,240,1)",
  maxWidth: "1100px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.9)"
};

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
    /* TODO add a font face section with font-family, src, format, font-weight, font-style */
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;  
        line-height: 2;
        font-family: Sans-Serif;
    }
    button {
      font-family: times;
      :hover {
        cursor: pointer;
      }
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
    h1, h2, h3, h4, h5, h6 {
      margin: 0;
    }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <GlobalStyle />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
export { theme };
