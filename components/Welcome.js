import React, { Component } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

class Welcome extends Component {
  render() {
    return (
      <div>
        <p>
          Put the default page you want to appear when arriving at thissite.com/
        </p>
        <SignIn />
        <SignUp />
      </div>
    );
  }
}

export default Welcome;
