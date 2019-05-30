import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Head from "next/head";
import ChoreInstanceCard from "./ChoreInstanceCard";
import { TabRow, TabHeader } from "./styles/tablature";
import { ULNoPad } from "./styles/listythings";
import PageHeader from "./PageHeader";
import { EmptyArray } from "./EmptyArray";
import { firstLetterCase } from "../tools/formatStrings";

const ScheduledChores = styled.div`
  border: 1px solid rgba(160, 160, 160, 1);
  border-radius: 1.5rem;
  padding: 1rem;
  width: 100%;
  overflow: auto;
  background: rgba(220, 240, 240, 1);
  margin-bottom: 2rem;
  @media (max-width: 700px) {
    max-height: 80vh;
  }
`;

const ChoresStyled = styled.div`
  width: 100%;
`;

const completionStatuses = ["INCOMPLETE", "COMPLETE", "OVERDUE"];

const Instances = ({ choreInstances, tabStatus, household }) => {
  choreInstances = choreInstances
    .filter((choreInstance) => {
      return choreInstance.completionStatus === tabStatus ? true : false;
    })
    .map((choreInstance) => (
      <ChoreInstanceCard
        householdId={household.id}
        choreInstance={choreInstance}
        key={choreInstance.id}
      />
    ))
    .sort((instOne, instTwo) => {
      if (instOne.deadline > instTwo.deadline) {
        return true;
      }
      return false;
    })
    .reverse();

  if (choreInstances.length === 0) {
    return (
      <EmptyArray>
        {{ text: `No ${firstLetterCase(tabStatus)} Chores`, emoji: "🏖️" }}
      </EmptyArray>
    );
  }
  return choreInstances;
};

class HouseholdChores extends Component {
  state = {
    tabStatus: "INCOMPLETE"
  };

  render() {
    const { household } = this.props;
    const { name, choreInstances } = household;
    const { tabStatus } = this.state;

    return (
      <ChoresStyled>
        <Head>
          <title>{name} | Chores</title>
        </Head>
        <PageHeader>🗑️ Chores</PageHeader>
        <ScheduledChores>
          <h2>{name}</h2>
          <h4>Scheduled Chores</h4>
          <TabRow>
            {completionStatuses.map((status) => (
              <TabHeader
                key={status}
                onClick={() => this.setState({ tabStatus: status })}
                tabStatus={tabStatus}
                tabColor="rgba(170,240,170,0.5)"
              >
                {firstLetterCase(status)}
              </TabHeader>
            ))}
          </TabRow>
          <ULNoPad>
            <Instances
              tabStatus={tabStatus}
              choreInstances={choreInstances}
              household={household}
            />
          </ULNoPad>
        </ScheduledChores>
      </ChoresStyled>
    );
  }
}

HouseholdChores.propTypes = {
  household: PropTypes.shape({
    id: PropTypes.string.isRequired,
    choreInstances: PropTypes.arrayOf(PropTypes.object).isRequired
  })
};

Instances.propTypes = {
  choreInstances: PropTypes.arrayOf(PropTypes.object).isRequired,
  tabStatus: PropTypes.string.isRequired,
  household: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

export default HouseholdChores;
