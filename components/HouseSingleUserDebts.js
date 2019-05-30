import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import formatMoney from "../tools/formatMoney";
import { AUTHED_USER_QUERY } from "./User";
import {
  FlexContainer,
  FlexRow,
  Itemized,
  FlexCard,
  FlexRowEnd,
  SubmitButton,
  LeftPadDiv,
  BoldHR
} from "./styles/houseSingleUserDebtsStyled";

const HOUSE_SINGLE_USER_DEBTS_QUERY = gql`
  query HOUSE_SINGLE_USER_DEBTS_QUERY(
    $specificUserId: String!
    $householdId: String!
  ) {
    houseSingleUserDebts(
      householdId: $householdId
      specificUserId: $specificUserId
    ) {
      id
      amount
      settled
      amountPaid
      debtor {
        id
        name
      }
      creditor {
        id
        name
      }
      from {
        id
        name
      }
    }
  }
`;

const SETTLE_ALL_DEBTS_MUTATION = gql`
  mutation SETTLE_ALL_DEBTS_MUTATION(
    $specificUserId: String!
    $householdId: String!
    $totalPayment: Float!
  ) {
    settleAllDebts(
      householdId: $householdId
      specificUserId: $specificUserId
      totalPayment: $totalPayment
    ) {
      id
    }
  }
`;

const Composed = adopt({
  houseSingleUserDebts: ({ render, household, houseSingleUser }) => (
    <Query
      variables={{
        householdId: household.id,
        specificUserId: houseSingleUser.id
      }}
      query={HOUSE_SINGLE_USER_DEBTS_QUERY}
      fetchPolicy="network-only"
    >
      {render}
    </Query>
  ),
  settleAllDebts: ({ render, household, houseSingleUser }) => (
    <Mutation
      mutation={SETTLE_ALL_DEBTS_MUTATION}
      refetchQueries={[
        {
          query: HOUSE_SINGLE_USER_DEBTS_QUERY,
          variables: {
            householdId: household.id,
            specificUserId: houseSingleUser.id
          }
        },
        {
          query: AUTHED_USER_QUERY
        }
      ]}
    >
      {render}
    </Mutation>
  )
});

const SettledWithUser = ({ name }) => (
  <FlexCard>
    <FlexContainer>
      <FlexRow>
        <h4>🤝 You are settled with {name}</h4>
      </FlexRow>
    </FlexContainer>
  </FlexCard>
);

const SettleDebtsSubmit = ({
  specificUserId,
  householdId,
  totalPayment,
  settleAllDebts
}) => (
  <SubmitButton
    onClick={async () => {
      if (
        confirm(
          "You are about to mark all these debts as paid. This cannot be reversed. Are you sure you want to proceed?"
        )
      ) {
        const res = await settleAllDebts({
          variables: {
            householdId,
            specificUserId,
            totalPayment
          }
        });

        console.log(res);
      }
    }}
  >
    Mark as Receieved
  </SubmitButton>
);

class HouseSingleUserDebts extends Component {
  state = {
    toggleItemized: false
  };

  toggleDebts = () => {
    this.setState((state) => ({
      toggleItemized: !state.toggleItemized
    }));
  };

  render() {
    const { household, houseSingleUser } = this.props;
    const { toggleItemized } = this.state;

    return (
      <Composed household={household} houseSingleUser={houseSingleUser}>
        {(data) => {
          if (
            !data ||
            !data.houseSingleUserDebts ||
            data.houseSingleUserDebts.error
          ) {
            return <div>error</div>;
          }
          if (data.houseSingleUserDebts.loading) <div>Loading...</div>;
          let { houseSingleUserDebts } = data.houseSingleUserDebts.data;
          let { settleAllDebts } = data;
          if (
            houseSingleUserDebts === undefined ||
            houseSingleUserDebts === null
          ) {
            return <SettledWithUser name={houseSingleUser.name} />;
          }

          const currentDebt = houseSingleUserDebts.reduce(
            (accumulator, debt, index, arr) => {
              if (debt.debtor.id === houseSingleUser.id) {
                return accumulator + debt.amount;
              } else {
                return accumulator - debt.amount;
              }
            },
            0
          );

          return (
            <FlexCard>
              <FlexContainer>
                <FlexRow>
                  {currentDebt > 0 && (
                    <h3>
                      {houseSingleUser.name} owes you {formatMoney(currentDebt)}
                    </h3>
                  )}
                  {currentDebt < 0 && (
                    <h3>
                      You owe {houseSingleUser.name}{" "}
                      {formatMoney(currentDebt * -1)}
                    </h3>
                  )}
                </FlexRow>
                {toggleItemized && (
                  <>
                    {/* <BoldHR /> */}
                    {houseSingleUserDebts.map(
                      ({ id, amount, creditor, debtor }) => {
                        return (
                          <LeftPadDiv key={id}>
                            {debtor.name} owes {creditor.name}{" "}
                            {formatMoney(amount)}
                          </LeftPadDiv>
                        );
                      }
                    )}
                  </>
                )}

                <FlexRowEnd>
                  <Itemized onClick={() => this.toggleDebts()}>
                    {!toggleItemized ? "Show" : "Hide"} Itemized
                  </Itemized>
                  <SettleDebtsSubmit
                    settleAllDebts={settleAllDebts}
                    householdId={household.id}
                    specificUserId={houseSingleUser.id}
                    totalPayment={currentDebt}
                  />
                </FlexRowEnd>
              </FlexContainer>
            </FlexCard>
          );
        }}
      </Composed>
    );
  }
}

export default HouseSingleUserDebts;
export { HOUSE_SINGLE_USER_DEBTS_QUERY };
