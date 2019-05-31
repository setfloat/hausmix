import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Router from "next/router";
import { adopt } from "react-adopt";
import Head from "next/head";
import { FormStyled, FieldsetStyled, InvalidAlert } from "./styles/formStyles";
import { SubmitButtonStyled } from "./styles/buttons";
import { AUTHED_USER_QUERY } from "./User";
import BetterInput from "./BetterInput";

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

  render() {
    const { children, joinToken } = this.props;
    const { name, password, confirmPassword } = this.state.form;
    const { invalidAlert, resInvite } = this.state;

    return (
      <>
        <Head>
          <title>Join Hausmix</title>
        </Head>
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
                      password: "",
                      confirmPassword: ""
                    };
                    this.setState({ form });
                    // console.log(res);
                    Router.push("/");
                  }
                }}
              >
                <h3>{children}</h3>
                <FieldsetStyled>
                  <BetterInput
                    changeUpdate={this.updateInputState.bind(this)}
                    labelText="Name"
                    pieceOfState={{ name }}
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
                </FieldsetStyled>
                {invalidAlert.length > 0 && (
                  <InvalidAlert>{invalidAlert}</InvalidAlert>
                )}
                <SubmitButtonStyled type="submit">Submit</SubmitButtonStyled>
              </FormStyled>
            );
          }}
        </Composed>
      </>
    );
  }
}

JoinHousehold.propTypes = {
  children: PropTypes.string.isRequired,
  joinToken: PropTypes.string.isRequired
};

export default JoinHousehold;
