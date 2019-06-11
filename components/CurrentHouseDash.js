import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Router from "next/router";
import styled from "styled-components";
import ChoresDash from "./ChoresDash";
import MemberInvite from "./MemberInvite";
import { BigButton } from "./styles/buttons";
import { LoadingHousehold } from "./Loading";

const CURRENT_HOUSEHOLD_QUERY = gql`
  query CURRENT_HOUSEHOLD_QUERY($id: String!) {
    currentHousehold(id: $id) {
      id
      name
      houseMembers {
        id
        name
        householdsManaged {
          id
        }
      }
      headsOfHouse {
        id
        name
      }
      choreInstances {
        id
        name
        startDate
        deadline
        completionStatus
        instanceCost
        currentAssigned {
          id
          name
        }
      }
      debts {
        id
        settled
        amount
        from {
          id
          name
        }
        debtor {
          id
          name
        }
        creditor {
          id
          name
        }
      }
    }
  }
`;

const ULStyled = styled.ul`
  width: 100%;
  max-height: 80vh;
  margin: 0;
  padding: 0;
  overflow: auto;
`;

const MembersSection = styled.div`
  margin: 0.5rem;
  width: 400px;
  max-width: 450px;
  overflow: auto;
  max-height: 700px;
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    max-width: 100%;
    width: 100%;
    margin-left: 0;
    margin-bottom: 1rem;
  }
`;

const IndentTitle = styled.h2`
  margin: 0.5rem 0.5rem 0.5rem 1.5rem;
`;

const MemberLICard = styled.li`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  /* box-shadow: 0 0 1rem 0.1rem #c3b5e3; */
  background: white;
  min-width: 330px;
  flex-grow: 1;
  align-self: stretch;
  border: 1px solid rgba(180, 180, 180, 1);
  margin-top: none;
  margin-left: none;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1rem;
  align-self: flex-start;
  margin-bottom: 1rem;
  border: 1px solid rgba(160, 160, 160, 1);
  border-radius: 1.5rem;
  background-color: rgba(220, 240, 240, 1);
  @media (max-width: 700px) {
    display: none;
  }
`;

const CurrentFlex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const CurrentCol = styled.div`
  display: flex;
  flex-direction: column;
`;

class CurrentHouseDash extends Component {
  render() {
    const { householdId, loggedInUser } = this.props;
    const { households } = loggedInUser;
    let houseId;
    if (households.length) {
      houseId = households[0].id;
    }

    return (
      <Query query={CURRENT_HOUSEHOLD_QUERY} variables={{ id: householdId }}>
        {({ data, loading, error }) => {
          if (loading) return <LoadingHousehold />;
          if (error) return <div>{error.message}</div>;

          const { houseMembers, choreInstances } = data.currentHousehold;
          // 📒
          return (
            <CurrentFlex>
              <CurrentCol>
                <Actions>
                  <MembersSection>
                    <IndentTitle>House Members</IndentTitle>
                    <ULStyled>
                      {houseMembers.map((houseMember) => (
                        <MemberLICard key={houseMember.id}>
                          <h5>
                            {houseMember.householdsManaged.some(
                              (house) => house.id === houseId
                            ) && <span>🏡 </span>}
                            {houseMember.name}
                          </h5>
                        </MemberLICard>
                      ))}
                      <MemberInvite householdId={householdId} />
                    </ULStyled>
                  </MembersSection>
                </Actions>
                <BigButton onClick={() => Router.push("/add")}>
                  New Chore
                </BigButton>
              </CurrentCol>
              {choreInstances.length > 0 && (
                <ChoresDash household={data.currentHousehold} />
              )}
            </CurrentFlex>
          );
        }}
      </Query>
    );
  }
}

CurrentHouseDash.propTypes = {
  householdId: PropTypes.string.isRequired,
  loggedInUser: PropTypes.shape({
    households: PropTypes.array.isRequired
  })
};

export default CurrentHouseDash;
export { CURRENT_HOUSEHOLD_QUERY };
