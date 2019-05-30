import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ChoreInstanceCard from "./ChoreInstanceCard";
import { ULNoPad } from "./styles/listythings";

const ChoresDashStyled = styled.div`
  /* box-shadow: inset -0.1rem -0.1rem 0.5rem -0.1rem #34235a; */
  /* box-shadow: 0 -5px 5px -5px #000000 inset; */
  border: 1px solid rgba(160, 160, 160, 1);
  border-radius: 1.5rem;
  padding: 1rem;
  max-width: 600px;
  overflow: auto;
  background: rgba(220, 240, 240, 1);
  margin-bottom: 2rem;
  @media (max-width: 700px) {
    width: 100%;
    max-height: 80vh;
  }
`;

const IndentTitle = styled.h2`
  margin: 0.5rem 0.5rem 0.5rem 1.5rem;
`;

class ChoresDash extends Component {
  render() {
    const { household } = this.props;
    const {
      name,
      headsOfHouse,
      houseMembers,
      choreInstances
    } = this.props.household;

    return (
      <ChoresDashStyled>
        <IndentTitle>Scheduled Chores</IndentTitle>
        <ULNoPad>
          {choreInstances
            .filter((choreInstance) => {
              if (choreInstance.completionStatus !== "COMPLETE") {
                return true;
              }
              return false;
            })
            .map((choreInstance) => (
              <ChoreInstanceCard
                householdId={household.id}
                choreInstance={choreInstance}
                key={choreInstance.id}
              />
            ))}
        </ULNoPad>
      </ChoresDashStyled>
    );
  }
}

ChoresDash.propTypes = {
  household: PropTypes.shape({
    name: PropTypes.string,
    headsOfHouse: PropTypes.array,
    houseMembers: PropTypes.array,
    choreInstances: PropTypes.arrayOf(PropTypes.object).isRequired
  })
};

export default ChoresDash;
