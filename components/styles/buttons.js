import styled from "styled-components";

const MediumButton = styled.button`
  box-sizing: border-box;
  padding: 1rem;
  margin-left: 1rem;
  font-size: ${(props) => `1.5rem`};
  line-height: 2rem;
  background-color: rgba(12, 85, 117, 1);
  background-color: rgba(200, 240, 230, 0.9);
  background-color: rgba(162, 220, 246, 1);
  color: rgba(225, 225, 225, 1);
  :hover {
    box-shadow: inset 0 0 10px rgba(12, 85, 117, 1);
    cursor: pointer;
  }

  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: white;
  color: #525252;
  padding: 0.5em 1em;
  border: none;
  border: 1px solid rgba(160, 160, 160, 1);
  overflow: hidden;

  ::after {
    content: "";
    z-index: -1;
    background-color: hsla(0, 0%, 100%, 0.2);
    position: absolute;
    top: -50%;
    bottom: -50%;
    width: 1.25em;
    transform: translateX(-525%) rotate(35deg);
  }

  :hover::after {
    transition: transform 0.45s ease-in-out;
    transform: translateX(200%) rotate(35deg);
  }
`;

const MediumButtonAlt = styled(MediumButton)`
  background-color: white;
  background-color: rgba(243, 170, 138, 1);
  background-color: rgba(162, 220, 246, 1);
  background-color: rgba(200, 240, 230, 0.9);
  color: rgba(25, 25, 25, 1);
  :hover {
    box-shadow: inset 0 0 10px rgba(240, 240, 240, 1);
  }
  :active {
    color: rgba(225, 225, 225, 1);
    background-color: rgba(12, 85, 117, 1);
  }
`;

const SubmitButtonStyled = styled(MediumButton)`
  margin-top: 2rem;
  border: 1px solid rgba(140, 140, 140, 1);
  background-color: rgba(170, 240, 170, 0.5);
  color: rgba(40, 40, 40, 1);
  :hover {
    cursor: pointer;
  }
  min-width: 200px;
`;

const BigButton = styled(MediumButtonAlt)`
  min-width: 25rem;
  height: 15rem;
  width: 94%;
  font-size: 2.5rem;
  /* margin: 1rem 0 1rem 1rem; */
  margin: 0.5rem 0.5rem 2rem 1rem;
  border: 1px solid rgba(140, 140, 140, 1);
  order: 1;
  @media (max-width: 700px) {
    margin: 0 0 2rem 0;
    width: 94vw;
  }
`;

export { SubmitButtonStyled, MediumButton, MediumButtonAlt, BigButton };
