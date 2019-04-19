import styled from "styled-components";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px groove threedface;
  padding: 2rem;
  max-width: 400px;
`;

const FieldsetStyled = styled.fieldset`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border: none;
  padding: 0;
`;

const SubmitButtonStyled = styled.button`
  max-width: 400px;
  margin-top: 2rem;
  background-image: radial-gradient(
    rgba(250, 250, 250, 1),
    rgba(250, 250, 250, 1),
    rgba(55, 234, 46, 1)
  );
  :hover {
    cursor: pointer;
  }
  :active {
    background-image: radial-gradient(
      rgba(55, 234, 46, 1),
      rgba(250, 250, 250, 1)
    );
  }
`;
const InputLabelStyled = styled.label`
  display: flex;
  flex-direction: column;
`;

const InvalidAlert = styled.h6`
  color: red;
`;

export {
  FormStyled,
  FieldsetStyled,
  SubmitButtonStyled,
  InputLabelStyled,
  InvalidAlert
};
