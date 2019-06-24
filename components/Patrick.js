import React from "react";
import styled from "styled-components";
import LinkedIn from "./styles/icons/linkedin.svg";
import Twitter from "./styles/icons/twitter.svg";
import Github from "./styles/icons/github.svg";

const CompContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  flex-basis: 2;
  min-height: 100%;
  padding: 2rem;
  justify-content: center;
  flex-grow: 2;
  @media (max-width: 700px) {
    justify-content: center;
  }
`;

const FlexRow = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const FlexRowLeft = styled(FlexRow)`
  justify-content: flex-start;
  margin-left: 2rem;
`;

const SpanTainer = styled.a`
  overflow: hidden;
  height: 3rem;
  width: 3rem;
  margin: 1rem;
`;

const ImgBorder = styled.img`
  border: 0.6rem solid rgba(240, 240, 240, 1);
  border-radius: 100%;
`;

const ImgCon = styled.span`
  height: 20rem;
  width: 20rem;
  max-width: 100%;
  flex-basis: 1;
  border: 1px solid rgba(100, 100, 100, 1);
  box-shadow: 1px 0 6px rgba(120, 120, 120, 1);
  border-radius: 100%;
  overflow: hidden;
  @media (max-width: 500px) {
    height: 15rem;
    width: 15rem;
  }
  :hover {
    box-shadow: 1px 0 12px rgba(120, 120, 120, 1);
  }
`;

const FlexRowWrap = styled(FlexRow)`
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 3rem 4rem 3rem 4rem;
  background-image: radial-gradient(circle at right, rgb(170, 240, 170), white);
  border: 1px solid rgba(160, 160, 160, 1);
  border-radius: 1.5rem;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    justify-content: center;
  }
  @media (min-width: 671px) {
    padding-left: 8rem;
  }
  @media (max-width: 500px) {
    padding: 2rem;
  }
  @media (max-width: 592px) {
    background-image: linear-gradient(to top, rgb(170, 240, 170), white 74%);
  }
`;

export default () => {
  console.group();
  ["blue", "green", "brown", "orange", "aqua"].forEach((color) =>
    console.log(
      `%cFollow or hire the developer on twitter or github:  @setfloat`,
      `color: ${color}`
    )
  );
  console.groupEnd();

  return (
    <FlexRowWrap>
      <ImgCon>
        <ImgBorder
          src="/static/devphoto.jpg"
          alt="devphoto"
          width="100%"
          height="100%"
        />
      </ImgCon>
      <CompContainer>
        <FlexRowLeft>
          <h1>Patrick Richardson</h1>
        </FlexRowLeft>
        <FlexRowLeft>
          <h4>Frontend React Developer</h4>
        </FlexRowLeft>
        <FlexRowLeft>
          <SpanTainer
            href="https://github.com/setfloat"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github />
          </SpanTainer>
          <SpanTainer
            href="https://linkedin.com/in/setfloat"
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedIn />
          </SpanTainer>
          <SpanTainer
            href="https://twitter.com/setfloat"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Twitter />
          </SpanTainer>
        </FlexRowLeft>
      </CompContainer>
    </FlexRowWrap>
  );
};
