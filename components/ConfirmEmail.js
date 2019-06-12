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

const ACCEPT_EMAIL_CONFIRMATION = gql`
  mutation ACCEPT_EMAIL_CONFIRMATION($inviteToken: String!) {
    acceptEmailConfirmation(inviteToken: $inviteToken) {
      id
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
  acceptEmailConfirmation: (props) => {
    return (
      <Mutation
        mutation={ACCEPT_EMAIL_CONFIRMATION}
        variables={{
          inviteToken: props.inviteToken
        }}
        awaitRefetchQueries
        refetchQueries={[{ query: AUTHED_USER_QUERY }]}
      >
        {props.render}
      </Mutation>
    );
  }
});

class ConfirmEmail extends Component {
  render() {
    const { confirmToken } = this.props;

    return (
      <>
        <Head>
          <title>Confirm Hausmix Email</title>
        </Head>
        <Composed inviteToken={confirmToken}>
          {({ invite, acceptEmailConfirmation }) => {
            return (
              <FormStyled
                method="post"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const res = await acceptEmailConfirmation();
                  Router.push("/");
                }}
              >
                <h2>Thank you for signing up with Hausmix!</h2>
                <h3>Press confirm to complete your email verification.</h3>
                <SubmitButtonStyled type="submit">Confirm</SubmitButtonStyled>
              </FormStyled>
            );
          }}
        </Composed>
      </>
    );
  }
}

ConfirmEmail.propTypes = {
  confirmToken: PropTypes.string.isRequired
};

export default ConfirmEmail;
