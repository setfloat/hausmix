import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Router from "next/router";
import { AUTHED_USER_QUERY } from "./User";
import {
  FormStyled,
  FieldsetStyled,
  InvalidAlert,
  FlexRowEnd
} from "./styles/formStyles";
import { SubmitButtonStyled } from "./styles/buttons";
import BetterInput from "./BetterInput";

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class SignUp extends Component {
  state = {
    form: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    invalidAlert: ""
  };

  updateInputState = (event) => {
    if (this.state.invalidAlert.length) {
      const form = { ...this.state.form };
      form[event.target.name] = event.target.value;
      this.setState({
        form,
        invalidAlert: ""
      });
    } else {
      const form = { ...this.state.form };
      form[event.target.name] = event.target.value;
      this.setState({
        form
      });
    }
  };

  prevalidatePasswords = async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      // match
      this.setState({ invalidAlert: "Passwords do not match" });

      return false;
    } else if (password.length < 10) {
      // min length
      this.setState({
        invalidAlert: "Password must be 10 characters or longer."
      });

      return false;
    } else if ((await password.match(/\d+/g)) === null) {
      // includes number
      this.setState({ invalidAlert: "Password must contain a number." });

      return false;
    } else {
      this.setState({ invalidAlert: "" });

      return true;
    }
  };

  clearState = () => {
    this.setState(() => ({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }));
  };

  render() {
    const { name, email, password, confirmPassword } = this.state.form;
    const { invalidAlert } = this.state;
    return (
      <Mutation
        mutation={SIGN_UP_MUTATION}
        variables={{ name, email, password }}
        refetchQueries={[{ query: AUTHED_USER_QUERY }]}
      >
        {(signUp, { error, loading }) => {
          return (
            <FormStyled
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                if (await this.prevalidatePasswords(this.state.form)) {
                  const res = await signUp();
                  console.log(res);
                  await this.clearState();
                  Router.push("/");
                }
              }}
            >
              <h3>Sign Up!</h3>
              <FieldsetStyled>
                <BetterInput
                  changeUpdate={this.updateInputState.bind(this)}
                  labelText="Name"
                  pieceOfState={{ name }}
                />
                <BetterInput
                  changeUpdate={this.updateInputState.bind(this)}
                  labelText="Email"
                  pieceOfState={{ email }}
                />
                <BetterInput
                  changeUpdate={this.updateInputState.bind(this)}
                  labelText="Password"
                  pieceOfState={{ password }}
                />
                <BetterInput
                  changeUpdate={this.updateInputState.bind(this)}
                  labelText="Confirm Password"
                  pieceOfState={{ confirmPassword }}
                />
                {invalidAlert.length > 0 && (
                  <InvalidAlert>{invalidAlert}</InvalidAlert>
                )}
                <FlexRowEnd>
                  <SubmitButtonStyled type="submit">Submit</SubmitButtonStyled>
                </FlexRowEnd>
              </FieldsetStyled>
            </FormStyled>
          );
        }}
      </Mutation>
    );
  }
}

export default SignUp;
