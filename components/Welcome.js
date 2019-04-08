import React, { Component } from "react";
import SignUp from "./SignUp";

class Welcome extends Component {
  render() {
    return (
      <div>
        <p>
          Put the default page you want to appear when arriving at thissite.com/
        </p>
        <SignUp />
      </div>
    );
  }
}

export default Welcome;
