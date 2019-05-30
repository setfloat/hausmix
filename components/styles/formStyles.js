import styled from "styled-components";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px groove threedface;
  padding: 2rem;
  min-width: 320px;
  width: 100vw;
  max-width: 500px;
  min-height: 300px;
  max-height: 800px;
  overflow: auto;
`;

const FieldsetStyled = styled.fieldset`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border: none;
  padding: 0;
`;

const InputLabelStyled = styled.label`
  display: flex;
  flex-direction: column;
  input {
    line-height: 2rem;
  }
`;

const InputLabelRowStyled = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const InvalidAlert = styled.h6`
  color: red;
`;

const FlexRowEnd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`;

export {
  FormStyled,
  FieldsetStyled,
  InputLabelStyled,
  InputLabelRowStyled,
  InvalidAlert,
  FlexRowEnd
};
