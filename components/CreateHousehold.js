import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { FormStyled, FieldsetStyled, FlexRowEnd } from "./styles/formStyles";
import { SubmitButtonStyled } from "./styles/buttons";
import BetterInput from "./BetterInput";
import { AUTHED_USER_QUERY } from "./User";

const CREATE_HOUSEHOLD_MUTATION = gql`
  mutation CREATE_HOUSEHOLD_MUTATION($name: String!) {
    createHousehold(name: $name) {
      id
      name
    }
  }
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding-top: 4rem;
`;

const WelcomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  padding: 0 2rem 2rem 2rem;
  min-width: 320px;
  width: 100vw;
  max-width: 500px;
  min-height: 150px;
  max-height: 800px;
  overflow: auto;
`;

const HouseWelcome = () => (
  <WelcomeStyled>
    <h2>Thank you for joining Hausmix!</h2>
    <h3>To get started, let's create your household.</h3>
  </WelcomeStyled>
);

class CreateHousehold extends Component {
  state = {
    name: ""
  };
  updateInputState = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  clearState = () => {
    this.setState(() => ({ name: "" }));
  };

  render() {
    const { name } = this.state;
    return (
      <Mutation
        refetchQueries={[{ query: AUTHED_USER_QUERY }]}
        mutation={CREATE_HOUSEHOLD_MUTATION}
        variables={{ name }}
      >
        {(createHousehold, { error, loading }) => {
          return (
            <Centered>
              <HouseWelcome />
              <FormStyled
                method="post"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const res = await createHousehold();
                  // console.log(res);
                  await this.clearState();
                }}
              >
                <FieldsetStyled>
                  <BetterInput
                    changeUpdate={this.updateInputState.bind(this)}
                    labelText="What do you call your home?"
                    pieceOfState={{ name }}
                    heldInPlace="Name"
                  />
                  <FlexRowEnd>
                    <SubmitButtonStyled type="submit">
                      Create Household
                    </SubmitButtonStyled>
                  </FlexRowEnd>
                </FieldsetStyled>
              </FormStyled>
            </Centered>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateHousehold;
