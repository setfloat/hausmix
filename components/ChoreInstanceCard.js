import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { adopt } from "react-adopt";
import PropTypes from "prop-types";
import { CURRENT_HOUSEHOLD_QUERY } from "./CurrentHouseDash";
import { format } from "date-fns";
import { MediumButtonAlt } from "./styles/buttons";

const COMPLETE_CHORE_MUTATION = gql`
  mutation COMPLETE_CHORE_MUTATION($id: String!) {
    markComplete(id: $id) {
      id
      name
      completionStatus
    }
  }
`;

const THIEVING_COMPLETE_CHORE_MUTATION = gql`
  mutation THIEVING_COMPLETE_CHORE_MUTATION($id: String!) {
    thievingMarkComplete(id: $id) {
      id
      name
      completionStatus
    }
  }
`;

const LICard = styled.li`
  border: 1px solid #34235a;
  border: 1px solid rgba(120, 120, 120, 1);
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  /* box-shadow: 0 0 1rem 0.1rem #c3b5e3; */
  background: white;
  width: 40vw;
  flex-grow: 1;
  align-self: stretch;
  flex-basis: 1;
  @media (max-width: 700px) {
    min-width: 330px;
  }
`;
// #34235a // nice purple color

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const FlexRowRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  /* flex-wrap: wrap; */
`;

const RightFlexButton = styled(MediumButtonAlt)`
  align-self: flex-end;
`;

const Unbutton = styled(RightFlexButton)`
  background-color: rgba(255, 255, 255, 0);
  border: none;
`;

const H6LessMargin = styled.h5`
  margin: 0;
`;

const Composed = adopt({
  markComplete: (props) => {
    return (
      <Mutation
        mutation={COMPLETE_CHORE_MUTATION}
        refetchQueries={[
          {
            query: CURRENT_HOUSEHOLD_QUERY,
            variables: { id: props.householdId }
          }
        ]}
      >
        {props.render}
      </Mutation>
    );
  },
  thievingMarkComplete: ({ render, householdId }) => (
    <Mutation
      mutation={THIEVING_COMPLETE_CHORE_MUTATION}
      refetchQueries={[
        {
          query: CURRENT_HOUSEHOLD_QUERY,
          variables: { id: householdId }
        }
      ]}
    >
      {render}
    </Mutation>
  )
});

const ChoreInstanceCard = ({
  householdId,
  choreInstance: {
    completionStatus,
    currentAssigned,
    deadline,
    id,
    name,
    startDate
  }
}) => (
  <LICard>
    <Composed householdId={householdId}>
      {({ markComplete, thievingMarkComplete }) => {
        const loading = markComplete.loading || thievingMarkComplete.loading;

        if (markComplete.error || thievingMarkComplete.error) {
          const err = markComplete.error || thievingMarkComplete.error;
          console.log({ err });
          return <div>{err.message}</div>;
        }
        return (
          <>
            <FlexColumn>
              <h5>{name}</h5>
              <h6>Deadline: {format(deadline, "dddd, MMMM Do")}</h6>
              <h6>startDate: {format(startDate, "dddd, MMMM Do")}</h6>
            </FlexColumn>
            {currentAssigned.map((person) => (
              <div key={person.id}>
                <H6LessMargin>{person.name}</H6LessMargin>
              </div>
            ))}
            <h6>{completionStatus}</h6>
            <FlexRowRight>
              {loading && <RightFlexButton>...Loading...</RightFlexButton>}
              {completionStatus === "COMPLETE" && !loading && (
                <Unbutton disabled>✅</Unbutton>
              )}
              {completionStatus !== "COMPLETE" && !loading && (
                <RightFlexButton
                  type="button"
                  onClick={async () => {
                    const res = await markComplete({
                      variables: { id }
                    });
                    // console.log(res);
                  }}
                >
                  Mark Complete
                </RightFlexButton>
              )}
              {completionStatus === "OVERDUE" && !loading && (
                <RightFlexButton
                  type="button"
                  onClick={async () => {
                    const res = await thievingMarkComplete({
                      variables: { id }
                    });
                    // console.log(res);
                  }}
                >
                  I did this chore and I want to be PAID!
                </RightFlexButton>
              )}
            </FlexRowRight>
          </>
        );
      }}
    </Composed>
  </LICard>
);

ChoreInstanceCard.propTypes = {
  householdId: PropTypes.string.isRequired,
  choreInstance: PropTypes.object.isRequired
};

export default ChoreInstanceCard;
export { LICard };
