import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { CREATE_INVITE_MUTATION } from "./HouseholdInvite";
import BetterInput from "./BetterInput";
import { SubmitButtonStyled } from "./styles/buttons";

const Fieldset = styled.fieldset`
  border: 1px solid rgba(180, 180, 180, 1);
  background-color: rgba(170, 240, 170, 0.5);
  margin: 0.5rem;
`;

const BlueSubmit = styled(SubmitButtonStyled)`
  background-color: rgba(162, 220, 246, 1);
`;

class MemberInvite extends Component {
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
            <form
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
                console.log({ res });
              }}
            >
              {success && <h3>{success}</h3>}
              <Fieldset>
                <BetterInput
                  changeUpdate={this.updateInputState.bind(this)}
                  labelText="Invite a housemate!"
                  pieceOfState={{ invitedEmail }}
                  heldInPlace="Email"
                />
                {error && <Error error={error} />}
                <div>
                  <BlueSubmit>Join my house!</BlueSubmit>
                </div>
              </Fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

MemberInvite.propTypes = {
  householdId: PropTypes.string.isRequired
};

export default MemberInvite;
