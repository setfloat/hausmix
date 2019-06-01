import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { adopt } from "react-adopt";
import User from "./User";
import CreateHousehold from "./CreateHousehold";
import CurrentHouseDash from "./CurrentHouseDash";
import Greet from "./Greet";
import PageHeader from "./PageHeader";
import { LOCAL_STATE_QUERY } from "../tools/withData.js";

const MaxWidthDiv = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const MESSAGE_DEPLOYED_MUTATION = gql`
  mutation {
    messageDeployed @client
  }
`;

const Composed = adopt({
  messageDeployed: ({ render }) => (
    <Mutation mutation={MESSAGE_DEPLOYED_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

class Welcome extends Component {
  state = {
    messaged: false
  };

  updateMessaged = () => this.setState(() => ({ messaged: true }));

  render() {
    const { messaged } = this.state;
    return (
      <Composed>
        {({ messageDeployed, localState }) => {
          if (!localState.deployedMessageStatus && !messaged) {
            console.group();
            ["blue", "green", "brown", "orange", "aqua"].forEach((color) =>
              console.log(
                `%cFollow or hire the developer on twitter or github:  @setfloat`,
                `color: ${color}`
              )
            );
            console.groupEnd();
            this.updateMessaged();
            messageDeployed();
          }

          return (
            <User>
              {({ data: { loggedInUser } }) => {
                if (!loggedInUser) {
                  return <Greet />;
                }

                const { households } = loggedInUser;
                let houseId;
                if (households.length) {
                  houseId = households[0].id;
                }
                return (
                  <MaxWidthDiv>
                    {households.length === 0 && <CreateHousehold />}
                    {households.length === 1 && (
                      <>
                        <PageHeader>🏡 {households[0].name}</PageHeader>
                        <CurrentHouseDash
                          loggedInUser={loggedInUser}
                          householdId={households[0].id}
                        />
                      </>
                    )}
                  </MaxWidthDiv>
                );
              }}
            </User>
          );
        }}
      </Composed>
    );
  }
}

export default Welcome;
