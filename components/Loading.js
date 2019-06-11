import LoadSVG from "./styles/icons/loading.svg";
import styled, { keyframes } from "styled-components";

const gearKeyFrame = keyframes`
0% {
  transform: rotate(0)
}
100% {
  transform: rotate(360)
}
`;

const GearCon = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 11rem;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoadingSVG = styled(LoadSVG)`
  height: 10rem;
  width: 10rem;
  animation: ${gearKeyFrame} 6s linear infinite;
  transform: rotate(360deg);
`;

const Loading = () => (
  <GearCon>
    <LoadingSVG />
  </GearCon>
);

const LoadingHousehold = () => (
  <LoadingContainer>
    <GearCon>
      <LoadingSVG />
    </GearCon>
    <h4>Connecting to your household...</h4>
  </LoadingContainer>
);

export { LoadingHousehold, Loading };
