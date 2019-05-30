import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MediumButton, MediumButtonAlt } from "./styles/buttons";
import formatMoney from "../tools/formatMoney";

const DebtItemStyled = styled.div`
  padding: 1rem 0.6rem 1rem 0.6rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(160, 160, 160, 1);
  border-left: 1px solid rgba(160, 160, 160, 1);
  border-top: 1px solid rgba(160, 160, 160, 1);
  border-bottom: 1px solid rgba(160, 160, 160, 1);
  margin-bottom: 0.5rem;
  background-color: white;
`;

const DebtRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 1rem;
`;

const DebtRowRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 1rem;
`;

const PayDebtButton = styled(MediumButton)`
  align-self: flex-end;
`;

const PayDebtButtonAlt = styled(MediumButtonAlt)`
  align-self: flex-end;
`;

const DebtItem = ({
  callRequery,
  debt,
  mutationEquations: { settleDebt, cancelDebt, unpayDebt }
}) => {
  const { settled, amount, debtor, creditor } = debt;
  return (
    <DebtItemStyled>
      <DebtRow>
        <h4>{settled}</h4>
        <h4>
          {debtor.name} owes {formatMoney(amount, 2)}
        </h4>
      </DebtRow>
      <h5>{formatMoney(amount)}</h5>
      <DebtRowRight>
        <PayDebtButtonAlt
          hidden={settled === "UNPAID"}
          onClick={async (event) => {
            event.preventDefault();
            const unpaidDebt = await unpayDebt();
            callRequery();
          }}
        >
          Mark as Unpaid
        </PayDebtButtonAlt>
        <PayDebtButtonAlt
          hidden={settled === "CANCELLED"}
          onClick={async (event) => {
            event.preventDefault();
            const cancelledDebt = await cancelDebt();
            callRequery();
          }}
        >
          Cancel this debt
        </PayDebtButtonAlt>
        <PayDebtButton
          hidden={settled === "PAID" || settled === "CANCELLED"}
          onClick={async (event) => {
            event.preventDefault();
            const settledDebt = await settleDebt();
            callRequery();
          }}
        >
          Pay {creditor.name}
        </PayDebtButton>
      </DebtRowRight>
    </DebtItemStyled>
  );
};

DebtItem.propTypes = {
  debt: PropTypes.shape({
    settled: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    debtor: PropTypes.object.isRequired,
    creditor: PropTypes.object.isRequired
  }),
  mutationEquations: PropTypes.shape({
    settleDebt: PropTypes.func.isRequired,
    cancelDebt: PropTypes.func.isRequired,
    unpayDebt: PropTypes.func.isRequired
  })
};

export default DebtItem;
