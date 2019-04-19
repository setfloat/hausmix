import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Router from "next/router";
import { adopt } from "react-adopt";
import {
  FormStyled,
  FieldsetStyled,
  SubmitButtonStyled,
  InputLabelStyled,
  InvalidAlert
} from "./styles/formStyles";
import { AUTHED_USER_QUERY } from "./User";
// import { eventNames } from "cluster";

//  <Mutation
// mutation={ACCEPT_INVITE}
// variables={{ household: { id: this.props.query.joinToken },  }}
// ></Mutation>

// acceptInvite: ({render}) => <Mutation
// mutation={ACCEPT_INVITE}
// variables={{ household: id: this.props.query.joinToken }}
// >{render}</Mutation>

const ACCEPT_INVITE_MUTATION = gql`
  mutation ACCEPT_INVITE_MUTATION(
    $inviteToken: String!
    $email: String!
    $password: String!
    $name: String!
  ) {
    acceptInvite(
      inviteToken: $inviteToken
      email: $email
      password: $password
      name: $name
    ) {
      id
      name
      email
    }
  }
`;

const INVITE_QUERY = gql`
  query INVITE_QUERY($inviteToken: String!) {
    invite(inviteToken: $inviteToken) {
      id
      household {
        id
        name
        houseMembers {
          id
          name
        }
        headsOfHouse {
          id
          name
        }
      }
      invitedBy {
        id
        name
      }
      invitedEmail
      invitedIsUser
      inviteToken
      inviteTokenExpiry
    }
  }
`;

const Composed = adopt({
  invite: ({ render, inviteToken }) => {
    return (
      <>
        {inviteToken && (
          <Query query={INVITE_QUERY} variables={{ inviteToken }}>
            {render}
          </Query>
        )}
      </>
    );
  },
  acceptInvite: (props) => {
    return (
      <Mutation
        mutation={ACCEPT_INVITE_MUTATION}
        variables={{
          inviteToken: props.inviteToken,
          email: props.invite.data.invite.invitedEmail,
          password: props.password,
          name: props.name
        }}
        awaitRefetchQueries
        refetchQueries={[{ query: AUTHED_USER_QUERY }]}
      >
        {props.render}
      </Mutation>
    );
  }
});

class JoinHousehold extends Component {
  static propTypes = {
    joinToken: PropTypes.string.isRequired
  };

  state = {
    form: {
      name: "",
      password: "",
      confirmPassword: ""
    },
    invalidAlert: "",
    resInvite: {
      email: ""
    }
  };

  updateInputState = (event) => {
    if (this.state.invalidAlert.length) {
      const form = { ...this.state.form };
      form[event.target.name] = event.target.value;
      this.setState({
        // [event.target.name]: event.target.value
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
  prevalidatePasswords = ({ password, confirmPassword }) => {
    // match
    if (password !== confirmPassword) {
      this.setState({ invalidAlert: "Passwords do not match" });
      return false;
      // min length
    } else if (password.length < 9) {
      this.setState({
        invalidAlert: "Password must be 9 characters or longer."
      });
      return false;
      // TODO: includes number
      // } else if (password.match(/\d+/g) !== null) {
      //   this.setState({ invalidAlert: "Password must contain a number." });
      //   return false;
    } else {
      this.setState({ invalidAlert: "" });

      return true;
    }
  };

  render() {
    const { children, joinToken } = this.props;
    const { name, email, password, confirmPassword } = this.state.form;
    const { invalidAlert, resInvite } = this.state;

    return (
      <Composed
        inviteToken={joinToken}
        name={name}
        email={resInvite.email}
        password={password}
      >
        {({ invite, acceptInvite }) => {
          return (
            <FormStyled
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                if (this.prevalidatePasswords(this.state.form)) {
                  const res = await acceptInvite();
                  const form = {
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                  };
                  this.setState({ form });
                  console.log(res);
                  Router.push("/");
                }
              }}
            >
              <h3>{children}</h3>
              <FieldsetStyled>
                <InputLabelStyled htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={this.updateInputState}
                  />
                </InputLabelStyled>
                <InputLabelStyled htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.updateInputState}
                  />
                </InputLabelStyled>
                <InputLabelStyled htmlFor="confirmPassword">
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={this.updateInputState}
                  />
                </InputLabelStyled>
              </FieldsetStyled>
              {invalidAlert.length > 0 && (
                <InvalidAlert>{invalidAlert}</InvalidAlert>
              )}
              <SubmitButtonStyled type="submit">Submit</SubmitButtonStyled>
            </FormStyled>
          );
        }}
      </Composed>
    );
  }
}

export default JoinHousehold;
