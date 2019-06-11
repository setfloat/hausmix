import React, { Component } from "react";
import styled from "styled-components";
import User from "./User";
import CreateHousehold from "./CreateHousehold";
import CurrentHouseDash from "./CurrentHouseDash";
import Greet from "./Greet";
import PageHeader from "./PageHeader";
import { Loading } from "./Loading";

const MaxWidthDiv = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

class Welcome extends Component {
  render() {
    return (
      <User>
        {({ data, loading, error }) => {
          if (error) return <div>Error...</div>;
          if (!data.loggedInUser) {
            return <Greet />;
          }
          if (loading) return <Loading />;

          const { households } = data.loggedInUser;

          return (
            <MaxWidthDiv>
              {households.length === 0 && <CreateHousehold />}
              {households.length === 1 && (
                <>
                  <PageHeader>🏡 {households[0].name}</PageHeader>
                  <CurrentHouseDash
                    loggedInUser={data.loggedInUser}
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
