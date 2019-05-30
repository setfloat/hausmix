import React, { Component } from "react";
import About from "../components/About";
import { PageContainer, PageMax } from "./styles/PageStyles";

class AboutPage extends Component {
  render() {
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
