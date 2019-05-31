import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { FormStyled, FieldsetStyled } from "./styles/formStyles";
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
  width: 100%;
  justify-content: center;
  padding-top: 4rem;
`;

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
                  />
                  <SubmitButtonStyled type="submit">
                    Create your Chore fighting Household!
                  </SubmitButtonStyled>
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
