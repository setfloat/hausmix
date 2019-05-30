import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Head from "next/head";
import PropTypes from "prop-types";
import {
  FormStyled,
  FieldsetStyled,
  InputLabelStyled
} from "./styles/formStyles";
import { SubmitButtonStyled } from "./styles/buttons";
import BetterInput from "./BetterInput";
import BetterRadio from "./BetterRadio";

const CREATE_CHORE_TEMPLATE_MUTATION = gql`
  mutation CREATE_CHORE_TEMPLATE_MUTATION(
    $name: String!
    $description: String
    $choreTemplateCost: Float!
    $household: String!
    $frequency: String!
  ) {
    createChoreTemplate(
      name: $name
      description: $description
      choreTemplateCost: $choreTemplateCost
      household: $household
      frequency: $frequency
    ) {
      id
      name
      description
      createdBy {
        id
        name
      }
      choreTemplateCost
      household {
        id
      }
      frequency
      instances {
        id
      }
    }
  }
`;

class CreateChoreTemplate extends Component {
  state = {
    name: "",
    description: "",
    choreTemplateCost: 0,
    frequency: ""
  };

  updateRadioState = (val, radio) => {
    this.setState({
      [radio]: val
    });
  };

  updateInputState = (event) => {
    const { target } = event;
    let { value, name } = event.target;
    if (target.type === "checkbox") {
      value = target.checked;
    }
    if (target.type === "radio") {
      name = event.target.radioroup;
    }
    this.setState({
      [name]: value
    });
  };

  render() {
    const { name, description, choreTemplateCost, frequency } = this.state;
    const { household } = this.props;

    return (
      <>
        <Head>
          <title>{household.name} | Add Chore</title>
        </Head>
        <Mutation
          mutation={CREATE_CHORE_TEMPLATE_MUTATION}
          variables={{
            name,
            description,
            choreTemplateCost,
            household: household.id,
            frequency
          }}
        >
          {(createChoreTemplate) => {
            return (
              <FormStyled
                method="post"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const res = await createChoreTemplate();

                  Router.push(`/add?chore=${res.data.createChoreTemplate.id}`);
                }}
              >
                <h3> Create a New Chore </h3>
                <FieldsetStyled>
                  <BetterInput
                    changeUpdate={this.updateInputState.bind(this)}
                    labelText="Name Of Chore"
                    pieceOfState={{ name }}
                  />
                  <BetterInput
                    changeUpdate={this.updateInputState.bind(this)}
                    labelText="Description of Chore"
                    pieceOfState={{ description }}
                  />
                  <InputLabelStyled>
                    Cost of Chore $
                    <input
                      type="number"
                      name="choreTemplateCost"
                      value={choreTemplateCost}
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => this.updateInputState(event)}
                    />
                  </InputLabelStyled>
                  <BetterRadio
                    changeUpdate={this.updateRadioState.bind(this)}
                    labelText="Frequency"
                    radioOptions={[
                      "Once",
                      "Daily",
                      "Weekly",
                      "Monthly",
                      "Quarterly",
                      "Yearly"
                    ]}
                    pieceOfState={{ frequency }}
                  />
                </FieldsetStyled>
                <SubmitButtonStyled type="submit">Submit</SubmitButtonStyled>
              </FormStyled>
            );
          }}
        </Mutation>
      </>
    );
  }
}

CreateChoreTemplate.propTypes = {
  household: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default CreateChoreTemplate;
