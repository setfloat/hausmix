import React, { Component } from "react";
import About from "../components/About";
import { PageContainer, PageMax } from "./styles/PageStyles";

class AboutPage extends Component {
  render() {
    console.group();
    ["blue", "green", "brown", "orange", "aqua"].forEach((color) =>
      console.log(
        `%cFollow or hire the developer on twitter or github:  @setfloat`,
        `color: ${color}`
      )
    );
    console.groupEnd();
    return (
      <PageContainer>
        <PageMax>
          <About />
        </PageMax>
      </PageContainer>
    );
  }
}

export default AboutPage;
