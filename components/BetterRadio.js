import React from "react";
import PropTypes from "prop-types";
import { InputLabelRowStyled } from "./styles/formStyles";

const BetterRadio = ({
  radioOptions,
  labelText,
  changeUpdate,
  pieceOfState
}) => {
  const pieceOfStateKey = Object.keys(pieceOfState)[0];
  const pieceOfStateValue = pieceOfState[pieceOfStateKey];

  const handleInputChange = (event, changeUpdate, value) => {
    changeUpdate(value, Object.keys(pieceOfState)[0]);
  };

  return (
    <>
      <br />
      {labelText}

      {radioOptions.map((option) => {
        return (
          <InputLabelRowStyled key={option} htmlFor={option}>
            <input
              type="radio"
              name={option}
              checked={pieceOfStateValue === option}
              value={pieceOfStateValue}
              onChange={(event) =>
                handleInputChange(event, changeUpdate, option)
              }
            />
            {option}
          </InputLabelRowStyled>
        );
      })}
    </>
  );
};

BetterRadio.propTypes = {
  changeUpdate: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  radioOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  pieceOfState: PropTypes.object.isRequired
};

export default BetterRadio;
