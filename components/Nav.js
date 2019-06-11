import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";
import User from "./User";
import SignOut from "./SignOut";
import { MobSignOut } from "./SignOut";
import Router from "next/router";
import {
  DeskNav,
  MobNavStyled,
  NavUL,
  MobNavUL,
  LinkLi,
  LinkButton,
  MobLinkLi,
  MobTitleLi,
  NavBurger,
  FlexRow,
  BoringH3,
  InnerButtonLinkLi,
  MobOutLinkLi
} from "./styles/navStyles";

const navLists = {
  signedOut: {
    desk: [
      { path: "/", displayText: "Home" },
      { path: "/about", displayText: "About" },
      { path: "/signin", displayText: "Sign In" },
      { path: "/signin", displayText: "Sign Up" }
    ],
    mob: [
      { path: "/", displayText: "Home", disableable: false },
      { path: "/about", displayText: "Meet the Developer", disableable: false },
      { path: "/signin", displayText: "Sign In", disableable: false },
      { path: "/signin", displayText: "Sign Up", disableable: false }
    ]
  },
  signedIn: {
    desk: [
      { path: "/", displayText: "Home" },
      { path: "/chores", displayText: "Chores", disableable: true },
      { path: "/money", displayText: "Money", disableable: true },
      { path: "/add", displayText: "Add Chore", disableable: true },
      { path: "/about", displayText: "About" }
    ],
    mob: [
      { path: "/", displayText: "Home", disableable: false },
      { path: "/add", displayText: "Add Chore", disableable: true },
      { path: "/chores", displayText: "Chores", disableable: true },
      { path: "/money", displayText: "Money", disableable: true },
      { path: "/invite", displayText: "Invite", disableable: true },
      { path: "/about", displayText: "Meet the Developer", disableable: false }
    ]
  }
};

const MobNavLink = ({
  disable,
  navOpen,
  handleBurger,
  item: { displayText, path }
}) => {
  return (
    <MobLinkLi disable={disable || false} onClick={() => handleBurger(navOpen)}>
      <Link href={path}>
        <a>{displayText}</a>
      </Link>
    </MobLinkLi>
  );
};

const MobNavLinks = ({ navList, navOpen, handleBurger, noHouse }) => {
  console.log(noHouse);
  return navList.map((item) => {
    return item.disableable && !noHouse ? null : (
      <MobNavLink
        key={item.displayText}
        navOpen={navOpen}
        handleBurger={handleBurger}
        disable={item.disableable && noHouse}
        item={item}
      />
    );
  });
};

const DeskNavLink = ({ path, displayText, disable }) => {
  return (
    <li>
      <LinkButton
        disabled={disable}
        disable={disable}
        onClick={() => Router.push(path)}
      >
        {displayText}
      </LinkButton>
    </li>
  );
};

const DeskNavLinks = ({ navList, noHouse }) => {
  return navList.map(({ path, displayText, disableable }) => (
    <DeskNavLink
      key={displayText}
      path={path}
      disable={disableable && noHouse}
      displayText={displayText}
    />
  ));
};

class MobNav extends Component {
  state = {
    navOpen: false
  };

  handleBurger = (navOpen) =>
    this.setState(() => ({
      navOpen: !navOpen
    }));

  render() {
    const { navOpen } = this.state;
    const { navList, children, noHouse } = this.props;
    return (
      <MobNavStyled>
        <MobNavUL>
          {!navOpen && (
            <FlexRow>
              <MobTitleLi>
                <BoringH3>
                  <Link href="/">
                    <a>🏡 Hausmix</a>
                  </Link>
                </BoringH3>
              </MobTitleLi>
              <NavBurger onClick={() => this.handleBurger(navOpen)}>
                |||
              </NavBurger>
            </FlexRow>
          )}
          {navOpen && (
            <>
              <FlexRow>
                <MobTitleLi>
                  <BoringH3>
                    <Link href="/">
                      <a>🏡 Hausmix</a>
                    </Link>
                  </BoringH3>
                </MobTitleLi>
                <NavBurger onClick={() => this.handleBurger(navOpen)}>
                  |||
                </NavBurger>
              </FlexRow>
              <MobNavLinks
                navOpen={navOpen}
                handleBurger={this.handleBurger.bind(this)}
                navList={navList}
                noHouse={noHouse}
              />
              {children}
            </>
          )}
        </MobNavUL>
      </MobNavStyled>
    );
  }
}

const LeftFlexSelf = styled.span`
  flex-grow: 8;
`;

const DeskBar = ({ className, children, navList, noHouse }) => (
  <DeskNav className={className}>
    <LeftFlexSelf>
      <h1>
        <Link href="/">
          <a>🏡 Hausmix</a>
        </Link>
      </h1>
    </LeftFlexSelf>
    <NavUL>
      <DeskNavLinks noHouse={noHouse} navList={navList} />
      {children}
    </NavUL>
  </DeskNav>
);

const GreetDesk = ({ className }) => (
  <DeskBar className={className} navList={navLists.signedOut.desk} />
);

const GreetMob = () => (
  <MobNav navList={navLists.signedOut.mob} noHouse={false} />
);

const Nav = () => (
  <User>
    {({ data: { loggedInUser } }) => (
      <>
        {loggedInUser && (
          <>
            <DeskBar
              noHouse={
                loggedInUser && !loggedInUser.households[0] ? true : false
              }
              navList={navLists.signedIn.desk}
            >
              <InnerButtonLinkLi>
                <SignOut />
              </InnerButtonLinkLi>
            </DeskBar>
            <MobNav
              noHouse={
                loggedInUser && !loggedInUser.households[0] ? false : true
              }
              navList={navLists.signedIn.mob}
            >
              <MobOutLinkLi>
                <MobSignOut />
              </MobOutLinkLi>
            </MobNav>
          </>
        )}
        {!loggedInUser && Router.router && Router.router.pathname !== "/" && (
          <>
            <GreetDesk />
            <GreetMob />
          </>
        )}
      </>
    )}
  </User>
);

MobNav.propTypes = {
  navList: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.any
};

DeskBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  navList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Nav;
export { GreetDesk, GreetMob };
