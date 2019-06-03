import React from "react";
import styled from "styled-components";
import Router from "next/router";
import { GreetDesk, GreetMob } from "./Nav";
import About from "./About";

const GreetWrapper = styled.div`
  display: flex;
  min-width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BannerSection = styled.section`
    height: 97vh;
    width: 100%;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(190,190,190,1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-image:
    linear-gradient(
      to right bottom, 
      rgba(190, 240, 240, 1) 0%, 
      rgb(255, 255, 255) 30%, rgba(190, 240, 240, 1) 100%
    );
}
`;

const RestOfBanner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  align-items: center;
`;

const GreetNav = styled(GreetDesk)`
  padding: 0 2rem 0 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const TryNowButton = styled.button`
  box-sizing: border-box;
  border: 1px solid rgba(40, 40, 40, 0.4);
  background: rgba(240, 240, 240, 0.4);
  height: 4rem;
  width: 12rem;
  cursor: pointer;
  :hover {
    border: 1px solid rgba(40, 40, 40, 0.6);
    background: rgba(240, 240, 240, 0.6);
  }
  :focus {
    border: 1px solid rgba(40, 40, 40, 0.6);
    background: rgba(240, 240, 240, 0.6);
  }
  :active {
    border: 1px solid rgba(200, 40, 40, 1);
    background: rgba(255, 255, 255, 0.7);
  }
`;

const AboutWrapper = styled.div`
  max-width: 1100px;
`;
export default () => (
  <GreetWrapper>
    <BannerSection>
      <GreetNav />
      <GreetMob />
      <RestOfBanner>
        <h1>Welcome to Hausmix</h1>
        <h2>Keep your house clean and happy</h2>
        <TryNowButton
          onClick={() => {
            Router.push("/signin");
          }}
        >
          Try it Now!
        </TryNowButton>
      </RestOfBanner>
    </BannerSection>
    <AboutWrapper>
      <About />
    </AboutWrapper>
  </GreetWrapper>
);
