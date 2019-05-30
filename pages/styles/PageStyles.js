import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
`;

const PageMax = styled.div`
  display: flex;
  width: 100vw;
  max-width: 1100px;
  justify-content: center;
  overflow: hidden;
  align-items: stretch;
  @media (min-width: 701px) {
    padding-top: 2rem;
  }
`;

export { PageContainer, PageMax };
