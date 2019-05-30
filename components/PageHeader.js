import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

const ExtraRoom = styled.div`
  padding: 0 2rem 1rem 2rem;
`;

const PageHeader = ({ children }) => (
  <ExtraRoom>
    <h1>{children}</h1>
  </ExtraRoom>
);

PageHeader.propTypes = {
  children: PropTypes.any
};

export default PageHeader;
