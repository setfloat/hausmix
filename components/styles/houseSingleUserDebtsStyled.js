import styled from "styled-components";
import { MediumButton, MediumButtonAlt } from "./buttons";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Itemized = styled(MediumButtonAlt)`
  width: 150px;
`;

const FlexCard = styled(FlexContainer)`
  max-width: 700px;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid rgba(180, 180, 180, 1);
  background-color: white;
`;

const FlexRowEnd = styled(FlexRow)`
  justify-content: flex-end;
  padding: 1rem 1rem 0 1rem;
`;

const SubmitButton = styled(MediumButton)`
  background-color: rgba(170, 240, 170, 0.7);
`;

const LeftPadDiv = styled.div`
  padding-left: 4rem;
`;

export {
  FlexContainer,
  FlexRow,
  Itemized,
  FlexCard,
  FlexRowEnd,
  SubmitButton,
  LeftPadDiv
};
