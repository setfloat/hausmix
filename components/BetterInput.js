import React from "react";
import { InputLabelStyled } from "./styles/formStyles";

const dynamicType = (potentialType) => {
  if (potentialType === "password" || potentialType === "confirmPassword") {
    return "password";
  }
  if (potentialType === "email" || potentialType === "invitedEmail") {
    return "email";
  } else {
    return "text";
  }
};

const BetterInput = ({
  heldInPlace,
  changeUpdate,
  labelText,
  pieceOfState
}) => {
  const pieceOfStateKey = Object.keys(pieceOfState)[0];
  const pieceOfStateValue = pieceOfState[pieceOfStateKey];
  const handleInputChange = (event) => {
    changeUpdate(event);
  };

  return (
    <InputLabelStyled htmlFor={pieceOfStateKey}>
      {labelText}
      <input
        type={dynamicType(pieceOfStateKey)}
        name={pieceOfStateKey}
        placeholder={heldInPlace || pieceOfStateKey}
        value={pieceOfStateValue}
        onChange={(event) => handleInputChange(event)}
      />
    </InputLabelStyled>
  );
};

export default BetterInput;
