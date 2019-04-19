import React, { Component } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import User from "./User";
import CreateHousehold from "./CreateHousehold";
import CurrentHouseDash from "./CurrentHouseDash";
import HouseholdInvite from "./HouseholdInvite";
// import Link from "next/link";

class Welcome extends Component {
  render() {
    return (
      <User>
        {({ data: { loggedInUser } }) => {
          return (
            <div>
              {loggedInUser ? (
                <>
                  <div>Logged In user</div>
                  {loggedInUser.households.length === 0 && <CreateHousehold />}
                  {loggedInUser.households.length === 1 && (
                    <>
                      <CurrentHouseDash id={loggedInUser.households[0].id} />
                      <HouseholdInvite id={loggedInUser.households[0].id} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <SignIn />
                  <SignUp />
                </>
              )}
            </div>
          );
        }}
      </User>
    );
  }
}

export default Welcome;
