import React, { Component } from "react";
import styled from "styled-components";
import User from "./User";
import CreateHousehold from "./CreateHousehold";
import CurrentHouseDash from "./CurrentHouseDash";
import Greet from "./Greet";
import { endpoint } from "../config";
import PageHeader from "./PageHeader";

const MaxWidthDiv = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

class Welcome extends Component {
  state = {
    messageDisplayed: false
  };

  updateMessageDisplayed = () => {
    this.setState({ messageDisplayed: true });
  };
  render() {
    return (
      <User>
        {({ data: { loggedInUser } }) => {
          if (!this.state.messageDisplayed) {
            console.group();
            ["blue", "green", "brown", "orange", "aqua"].forEach((color) =>
              console.log(
                `%cFollow or hire the developer on twitter or github:  @setfloat`,
                `color: ${color}`
              )
            );
            console.groupEnd();
            this.updateMessageDisplayed();
          }
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
  }
}

export default Welcome;
