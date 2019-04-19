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

const CREATE_HOUSEHOLD_MUTATION = gql`
  mutation CREATE_HOUSEHOLD_MUTATION($name: String!) {
    createHousehold(name: $name) {
      id
      name
    }
  }
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

  render() {
    const { name } = this.state;
    return (
      <Mutation mutation={CREATE_HOUSEHOLD_MUTATION} variables={{ name }}>
        {(createHousehold, { error, loading }) => {
          return (
            <FormStyled
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                console.log(this.state);
                const res = await createHousehold();
                console.log(res);
                this.setState({ name: "" });
              }}
            >
              <FieldsetStyled>
                <InputLabelStyled>
                  What do your household call your home?
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={this.updateInputState}
                  />
                </InputLabelStyled>
                <SubmitButtonStyled type="submit">
                  Create your Chore fighting Household!
                </SubmitButtonStyled>
              </FieldsetStyled>
            </FormStyled>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateHousehold;
