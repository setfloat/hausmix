import React, { Component } from "react";
import styled from "styled-components";
import Head from "next/head";
import PropTypes from "prop-types";
import { TabRow, TabHeader } from "./styles/tablature";
import DebtItems from "./DebtItems";
import UserDebts from "./UserDebts";
import PageHeader from "./PageHeader";
import { firstLetterCase } from "../tools/formatStrings";

const debtStatuses = ["UNPAID", "PAID", "CANCELLED"];

const MoneyStyled = styled.div`
  width: 100%;
`;

const HouseDebtsStyled = styled.section`
  background-color: rgba(230, 230, 230, 1);
  padding: 2rem 1rem 2rem 1rem;
  border: 1px solid rgba(160, 160, 160, 1);
  border-radius: 1.5rem;
  background-color: rgba(170, 240, 170, 0.7);
  margin-bottom: 1rem;
`;

const DebtContainer = styled.div`
  max-height: 70vh;
  overflow: auto;
`;

class Money extends Component {
  state = {
    tabStatus: "UNPAID",
    requery: false
  };

  callRequery = () => {
    this.setState({ requery: true });
  };

  clearRequery = () => {
    this.setState(() => ({ requery: false }));
  };

  render() {
    const { household, loggedInUser } = this.props;
    const { debts, name } = household;
    const { tabStatus, requery } = this.state;
    if (!loggedInUser) return <div>Error</div>;
    return (
      <MoneyStyled>
        <Head>
          <title>{name} | Money</title>
        </Head>
        <PageHeader>💰 House Finances</PageHeader>
        <UserDebts
          household={household}
          loggedInUser={loggedInUser}
          requery={requery}
          clearRequery={this.clearRequery.bind(this)}
        />
        <HouseDebtsStyled>
          <TabRow>
            {debtStatuses.map((status) => (
              <TabHeader
                key={status}
                onClick={() => this.setState({ tabStatus: status })}
                tabStatus={tabStatus}
              >
                {firstLetterCase(status)}
              </TabHeader>
            ))}
          </TabRow>
          <DebtContainer>
            {
              <DebtItems
                tabStatus={tabStatus}
                debts={debts}
                callRequery={this.callRequery.bind(this)}
                household={household}
              />
            }
          </DebtContainer>
        </HouseDebtsStyled>
      </MoneyStyled>
    );
  }
}

Money.propTypes = {
  household: PropTypes.shape({
    debts: PropTypes.arrayOf(PropTypes.object).isRequired,
    name: PropTypes.string.isRequired
  }),
  loggedInUser: PropTypes.object
};

export default Money;
