import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "styled-components";
import { endOfToday, addDays, startOfToday } from "date-fns";
import { FormStyled, InputLabelRowStyled } from "./styles/formStyles";
import { SubmitButtonStyled } from "./styles/buttons";
import { Loading } from "./Loading";
import DateChanger from "./DateChanger";
import { AUTHED_USER_QUERY } from "./User";
import { CURRENT_HOUSEHOLD_QUERY } from "./CurrentHouseDash";

const InputStyled = styled.input`
  width: 2rem;
`;

const CHORE_TEMPLATE_QUERY = gql`
  query CHORE_TEMPLATE_QUERY($id: String!) {
    choreTemplate(id: $id) {
      id
      name
      createdBy {
        id
        name
      }
      description
      choreTemplateCost
      instances {
        id
        name
      }
      household {
        id
        name
        headsOfHouse {
          id
          name
        }
        houseMembers {
          id
          name
        }
      }
      frequency
    }
  }
`;

const CREATE_ASSIGN_CHORE_MUTATION = gql`
  mutation CREATE_ASSIGN_CHORE_MUTATION(
    $name: String!
    $currentAssigned: [String!]!
    $instanceCost: Float!
    $startDate: DateTime!
    $deadline: DateTime!
    $completionStatus: ChoreCompleteStatus!
    $choreTemplate: String!
    $household: String!
  ) {
    createAssignChoreMutation(
      name: $name
      currentAssigned: $currentAssigned
      instanceCost: $instanceCost
      choreTemplate: $choreTemplate
      startDate: $startDate
      deadline: $deadline
      completionStatus: $completionStatus
      household: $household
    ) {
      id
      name
      currentAssigned {
        id
        name
      }
      startDate
      deadline
      instanceCost
      completionStatus
      household {
        id
        name
      }
    }
  }
`;

class AssignChoreStateContained extends Component {
  state = {
    assigned: {}
  };

  updateAssignedState = (event) => {
    const { name, value } = event.target;
    let assigned = this.state.assigned;

    if (assigned[name]) {
      assigned[name] = !value;
    } else {
      assigned[name] = true;
    }
    this.setState({ assigned });
  };

  componentDidUpdate(oldProps, oldState) {
    const newProps = this.props;
    if (!this.state.deadline) {
      let frequencyResult = (frequency) => {
        switch (frequency) {
          case "Once":
            return 7;
          case "Daily":
            return 1;
          case "Weekly":
            return 7;
          case "Monthly":
            return 30;
          case "Quarterly":
            return 90;
          case "Yearly":
            return 365;
          default:
            null;
        }
      };
      let deadline = addDays(
        endOfToday(),
        frequencyResult(this.props.choreTemplate.frequency)
      );
      let { startDate } = this.props;

      if (!startDate) {
        startDate = startOfToday();
      }

      this.setState({ deadline, startDate });
    }
  }

  addADay(prevDate, whoCalling) {
    this.setState({ [whoCalling]: addDays(prevDate, 1) });
  }

  subtractADay(prevDate, whoCalling) {
    this.setState({ [whoCalling]: addDays(prevDate, -1) });
  }

  render() {
    const { id, choreTemplateCost, name, household } = this.props.choreTemplate;
    const { assigned, deadline, startDate } = this.state;
    const { createChoreInstance } = this.props;

    return (
      <div>
        <Head>
          <title>{household ? household.name : "Hausmix"} | Assign Chore</title>
        </Head>
        <FormStyled
          method="post"
          onSubmit={async (event) => {
            event.preventDefault();
            let currentAssigned = await Object.keys(assigned);

            const newChoreInstance = {
              name,
              currentAssigned,
              choreTemplate: id,
              instanceCost: choreTemplateCost,
              startDate: startDate,
              deadline: deadline,
              completionStatus: "INCOMPLETE",
              household: household.id
            };

            const res = await createChoreInstance({
              variables: newChoreInstance,
              refetchQueries: [
                { query: AUTHED_USER_QUERY },
                {
                  query: CURRENT_HOUSEHOLD_QUERY,
                  variables: { id: household.id }
                }
              ]
            });

            await Router.push("/");
          }}
        >
          <h3>Assigned housemates</h3>
          <div>
            {household.houseMembers.map((person) => {
              return (
                <InputLabelRowStyled key={person.id}>
                  <InputStyled
                    type="checkbox"
                    name={person.id}
                    value={assigned[person.id]}
                    onChange={(event) => this.updateAssignedState(event)}
                  />
                  {person.name}
                </InputLabelRowStyled>
              );
            })}
          </div>
          {deadline && (
            <>
              <DateChanger
                dayToChange={{ startDate }}
                subtractADay={this.subtractADay.bind(this)}
                addADay={this.addADay.bind(this)}
                titleText="Start Date"
              />
              <DateChanger
                dayToChange={{ deadline }}
                subtractADay={this.subtractADay.bind(this)}
                addADay={this.addADay.bind(this)}
                titleText="Deadline"
              />
            </>
          )}
          <SubmitButtonStyled type="submit">Submit</SubmitButtonStyled>
        </FormStyled>
      </div>
    );
  }
}

class AssignChore extends Component {
  render() {
    const { choreTemplateId } = this.props;
    return (
      <Query query={CHORE_TEMPLATE_QUERY} variables={{ id: choreTemplateId }}>
        {({ data, loading, error }) => {
          if (error) return <div>{error.message}</div>;
          if (loading) return <Loading />;
          const { choreTemplate } = data;
          return (
            <Mutation mutation={CREATE_ASSIGN_CHORE_MUTATION}>
              {(createChoreInstance, { data, loading, error }) => {
                if (error) return <div>{error.message}</div>;
                if (loading) return <Loading />;
                return (
                  <AssignChoreStateContained
                    createChoreInstance={createChoreInstance}
                    choreTemplate={choreTemplate}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

AssignChore.propTypes = {
  choreTemplateId: PropTypes.string.isRequired
};

AssignChoreStateContained.propTypes = {
  createChoreInstance: PropTypes.func.isRequired,
  choreTemplate: PropTypes.shape({
    id: PropTypes.string.isRequired,
    choreTemplateCost: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    household: PropTypes.object.isRequired
  })
};

export default AssignChore;
