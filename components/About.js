import React, { Component } from "react";
import styled from "styled-components";
import Head from "next/head";
import Patrick from "./Patrick";
import Skills from "./Skills";
import Project from "./Project";

const Max = styled.div`
  min-width: 100%;
  overflow: hidden;
`;

export default () => (
  <Max>
    <Head>
      <title>Hausmix | About</title>
    </Head>
    <Project />
    <Patrick />
    <Skills />
  </Max>
);
