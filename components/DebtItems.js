import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import { AUTHED_USER_QUERY } from "./User";
import DebtItem from "./DebtItem";
import { EmptyArray } from "./EmptyArray";
import { firstLetterCase } from "../tools/formatStrings";

const PAY_DEBT_MUTATION = gql`
  mutation PAY_DEBT_MUTATION($id: String!) {
    settleDebt(id: $id) {
      id
    }
  }
`;

const CANCEL_DEBT_MUTATION = gql`
  mutation CANCEL_DEBT_MUTATION($id: String!) {
    cancelDebt(id: $id) {
      id
    }
  }
`;

const UNPAY_DEBT_MUTATION = gql`
  mutation UNPAY_DEBT_MUTATION($id: String!) {
    unpayDebt(id: $id) {
      id
    }
  }
`;

const Composed = adopt({
  settleDebt: ({ id, render }) => {
    return (
      <Mutation
        mutation={PAY_DEBT_MUTATION}
        variables={{ id }}
        refetchQueries={[
          {
            query: AUTHED_USER_QUERY
          }
        ]}
      >
        {render}
      </Mutation>
    );
  },
  cancelDebt: ({ id, render }) => {
    return (
      <Mutation
        mutation={CANCEL_DEBT_MUTATION}
        variables={{ id }}
        refetchQueries={[
          {
            query: AUTHED_USER_QUERY
          }
        ]}
      >
        {render}
      </Mutation>
    );
  },
  unpayDebt: ({ id, render }) => {
    return (
      <Mutation
        mutation={UNPAY_DEBT_MUTATION}
        variables={{ id }}
        refetchQueries={[
          {
            query: AUTHED_USER_QUERY
          }
        ]}
      >
        {render}
      </Mutation>
    );
  }
});

const DebtItems = ({ debts, tabStatus, callRequery }) => {
  let filteredDebts = debts.filter((debt) => {
    return debt.settled === tabStatus ? true : false;
  });
  return (
    <>
      {!filteredDebts.length && (
        <EmptyArray>
          {{ text: `There are no ${firstLetterCase(tabStatus)} debts` }}
        </EmptyArray>
      )}
      {filteredDebts &&
        filteredDebts.map((debt) => {
          const { id } = debt;
          return (
            <Composed key={id} id={id}>
              {({ settleDebt, cancelDebt, unpayDebt }) => {
                return (
                  <DebtItem
                    mutationEquations={{
                      settleDebt,
                      cancelDebt,
                      unpayDebt
                    }}
                    debt={debt}
                    callRequery={callRequery}
                  />
                );
              }}
            </Composed>
          );
        })}
    </>
  );
};

export default DebtItems;
