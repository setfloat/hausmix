import Welcome from "../components/Welcome";
import styled from "styled-components";

const FlexCenterDiv = styled.div`
  display: flex;
  justify-content: center;
  min-width: 100%;
`;
const Home = () => (
  <FlexCenterDiv>
    <Welcome />
  </FlexCenterDiv>
);

export default Home;
