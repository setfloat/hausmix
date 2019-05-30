import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { format } from "date-fns";

const SidePadh5 = styled.h5`
  padding-left: 2rem;
  padding-right: 2rem;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DateChanger = ({ titleText, dayToChange, subtractADay, addADay }) => {
  let dayToChangeKey = Object.keys(dayToChange)[0];
  let dayToChangeValue = dayToChange[dayToChangeKey];

  return (
    <>
      <h4>{titleText}</h4>
      <FlexRowDiv>
        <button
          type="button"
          onClick={() => {
            subtractADay(dayToChangeValue, dayToChangeKey);
          }}
        >
          -1
        </button>
        <SidePadh5>{format(dayToChangeValue, "MMMM DD, YYYY")}</SidePadh5>
        <button
          type="button"
          onClick={() => {
            addADay(dayToChangeValue, dayToChangeKey);
          }}
        >
          +1
        </button>
      </FlexRowDiv>
    </>
  );
};

DateChanger.propTypes = {
  titleText: PropTypes.string.isRequired,
  dayToChange: PropTypes.object.isRequired,
  subtractADay: PropTypes.func.isRequired,
  addADay: PropTypes.func.isRequired
};

export default DateChanger;
