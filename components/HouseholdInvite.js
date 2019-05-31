import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { FormStyled, FieldsetStyled, FlexRowEnd } from "./styles/formStyles";
import { SubmitButtonStyled } from "./styles/buttons";
import Error from "./ErrorMessage";
import BetterInput from "./BetterInput";
import styled from "styled-components";

// later add checkbox for 'is head of house' and pass the checkbox info with the mutation.

const DashForm = styled(FormStyled)`
  border: 1px solid rgba(140, 140, 140, 1);
  padding: 2rem;
  min-width: 320px;
  width: 100vw;
  max-width: 400px;
  min-height: 140px;
  max-height: 800px;
  overflow: auto;
`;

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
    const { householdId } = this.props;

    return (
      <Mutation
        mutation={CREATE_INVITE_MUTATION}
        variables={{ householdId, invitedEmail }}
      >
        {(createInvite, { data, error, loading }) => {
          return (
            <DashForm
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                const res = await createInvite().catch((err) => {
                  console.log(err);
                });
                this.setState({
                  invitedEmail: "",
                  success: "Invite Successfully Sent!"
                });
                this.successMessage();
                // console.log({ res });
              }}
            >
              {success && <h3>{success}</h3>}
              <FieldsetStyled>
                <BetterInput
                  changeUpdate={this.updateInputState.bind(this)}
                  labelText="Invite a housemate!"
                  pieceOfState={{ invitedEmail }}
                  heldInPlace="Email"
                />
                {error && <Error error={error} />}
                <FlexRowEnd>
                  <SubmitButtonStyled>Join my house!</SubmitButtonStyled>
                </FlexRowEnd>
              </FieldsetStyled>
            </DashForm>
          );
        }}
      </Mutation>
    );
  }
}

HouseholdInvite.propTypes = {
  householdId: PropTypes.string.isRequired
};

export default HouseholdInvite;
export { CREATE_INVITE_MUTATION };
