import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  FormStyled,
  FieldsetStyled,
  SubmitButtonStyled,
  InputLabelStyled,
  InvalidAlert
} from "./styles/formStyles";
import Error from "./ErrorMessage";

// later add checkbox for 'is head of house' and pass the checkbox info with the mutation.

const CREATE_INVITE_MUTATION = gql`
  mutation CREATE_INVITE_MUTATION(
    $householdId: String!
    $invitedEmail: String!
  ) {
    createInvite(householdId: $householdId, invitedEmail: $invitedEmail) {
      id
      household {
        id
        name
      }
      invitedBy {
        id
        name
      }
      invitedEmail
      invitedIsUser
      inviteStatus
    }
  }
`;

class HouseholdInvite extends Component {
  state = {
    invitedEmail: ""
  };

  updateInputState = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  successMessage = () => {
    setTimeout(() => {
      this.setState({ success: undefined });
    }, 6000);
  };

  render() {
    const { invitedEmail, success } = this.state;
    return (
      <Mutation
        mutation={CREATE_INVITE_MUTATION}
        variables={{ householdId: this.props.id, invitedEmail }}
      >
        {(createInvite, { data, error, loading }) => {
          return (
            <FormStyled
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                // const res = await signIn();
                const res = await createInvite().catch((err) => {
                  console.log(err);
                });
                this.setState({
                  invitedEmail: "",
                  success: "Invite Successfully Sent!"
                });
                this.successMessage();
                console.log({ res });
              }}
            >
              {success && <h3>{success}</h3>}
              <FieldsetStyled>
                Email of the person you want to invite
                <InputLabelStyled>
                  <input
                    type="email"
                    name="invitedEmail"
                    placeholder="Join my household!"
                    value={invitedEmail}
                    onChange={this.updateInputState}
                  />
                </InputLabelStyled>
                {error && <Error error={error} />}
                <SubmitButtonStyled>Invite to house!</SubmitButtonStyled>
              </FieldsetStyled>
            </FormStyled>
          );
        }}
      </Mutation>
    );
  }
}

export default HouseholdInvite;
