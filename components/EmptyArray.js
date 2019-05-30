import styled from "styled-components";
import PropTypes from "prop-types";

const EmptyContainer = styled.div`
  min-height: 30rem;
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LargeEmote = styled.h1`
  font-size: 10rem;
  line-height: 14rem;
  min-width: 20rem;
  display: flex;
  justify-content: center;
`;

const EmptyText = styled.h2`
  font-size: 2.6rem;
  min-width: 20rem;
  display: flex;
  justify-content: center;
`;

const EmptyArray = ({ children }) => (
  <EmptyContainer>
    <LargeEmote>{children.emoji || "🏡"}</LargeEmote>
    <EmptyText>{children.text}</EmptyText>
  </EmptyContainer>
);

EmptyArray.propTypes = {
  children: PropTypes.shape({
    emoji: PropTypes.string,
    text: PropTypes.string.isRequired
  }).isRequired
};

export { EmptyArray };
