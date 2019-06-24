import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { InputLabelStyled } from "./styles/formStyles";

const EditProfile = styled.div`
  width: 30rem;
  min-height: 10rem;
  border: 1px solid rgba(160, 160, 160, 1);
  border-radius: 1.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($name: String) {
    updateUser(name: $name) {
      id
      name
    }
  }
`;

const RENAME_HOUSEHOLD_MUTATION = gql`
  mutation RENAME_HOUSEHOLD_MUTATION($name: String!, $householdId: String!) {
    renameHousehold(name: $name, householdId: $householdId) {
      id
      name
    }
  }
`;

const UpdateUser = ({ name }) => (
  <Mutation mutation={UPDATE_USER_MUTATION}>
    {(updateUser, { error, loading }) => {
      return (
        <InputLabelStyled>
          Name
          {loading ? (
            <div>Updating</div>
          ) : (
            <input
              placeholder={name}
              defaultValue={name}
              onBlur={async (event) => {
                event.preventDefault();
                if (event.target.value !== name) {
                  const updatedUser = await updateUser({
                    variables: { name: event.target.value }
                  });
                }
              }}
            />
          )}
          {error && <div>{error.message}</div>}
        </InputLabelStyled>
      );
    }}
  </Mutation>
);

const RenameHousehold = ({ id, name }) => (
  <Mutation mutation={RENAME_HOUSEHOLD_MUTATION}>
    {(renameHousehold, { error, loading }) => {
      if (error) return <div>{error.message}</div>;
      return (
        <InputLabelStyled>
          Household Name
          {loading ? (
            <div>Updating</div>
          ) : (
            <input
              placeholder={name}
              defaultValue={name}
              onBlur={async (event) => {
                event.preventDefault();
                if (event.target.value !== name) {
                  const updatedHousehold = await renameHousehold({
                    variables: { name: event.target.value, householdId: id }
                  });
                }
              }}
            />
          )}
        </InputLabelStyled>
      );
    }}
  </Mutation>
);

const UpdateHouseholds = ({ households }) => (
  <div>
    {households.map((household) => {
      return (
        <div key={household.id}>
          hello
          <RenameHousehold id={household.id} name={household.name} />
        </div>
      );
    })}
  </div>
);

export default ({ loggedInUser: { name, householdsManaged } }) => {
  return (
    <div>
      <h1>Settings</h1>
      <EditProfile>
        <h3>Edit your Profile</h3>
        <UpdateUser name={name} />
      </EditProfile>
      {householdsManaged.length && (
        <EditProfile>
          <h3>Edit your Household</h3>
          <UpdateHouseholds households={householdsManaged} />
        </EditProfile>
      )}
    </div>
  );
};
