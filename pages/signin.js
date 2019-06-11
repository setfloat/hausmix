import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { PageContainer, PageMax } from "./styles/PageStyles";

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
  <PageContainer>
    <PageMax>
      <StyledDiv>
        <SignIn />
        <SignUp />
      </StyledDiv>
    </PageMax>
  </PageContainer>
);

export default SignInPage;
