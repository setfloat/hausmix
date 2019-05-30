import styled from "styled-components";
import SignIn from "../components/SignIn";
// import SignUp from "../components/SignUp";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  @media (max-width: 700px) {
    align-items: flex-start;
  }
`;
const SignInPage = () => (
  <StyledDiv>
    <SignIn />
    {/* <SignUp /> */}
  </StyledDiv>
);

export default SignInPage;
