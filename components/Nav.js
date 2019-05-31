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
      { path: "/", displayText: "Home" },
      { path: "/about", displayText: "Meet the Developer" },
      { path: "/signin", displayText: "Sign In" },
      { path: "/signin", displayText: "Sign Up" }
    ]
  },
  signedIn: {
    desk: [
      { path: "/", displayText: "Home" },
      { path: "/chores", displayText: "Chores" },
      { path: "/money", displayText: "Money" },
      { path: "/add", displayText: "Add Chore" },
      { path: "/about", displayText: "About" }
    ],
    mob: [
      { path: "/", displayText: "Home" },
      { path: "/add", displayText: "Add Chore" },
      { path: "/chores", displayText: "Chores" },
      { path: "/money", displayText: "Money" },
      { path: "/invite", displayText: "Invite" },
      { path: "/about", displayText: "Meet the Developer" }
    ]
  }
};

const MobNavLink = ({ navOpen, handleBurger, item: { displayText, path } }) => {
  return (
    <MobLinkLi onClick={() => handleBurger(navOpen)}>
      <Link href={path}>
        <a>{displayText}</a>
      </Link>
    </MobLinkLi>
  );
};

const MobNavLinks = ({ navList, navOpen, handleBurger }) => {
  return navList.map((item) => (
    <MobNavLink
      key={item.displayText}
      navOpen={navOpen}
      handleBurger={handleBurger}
      item={item}
    />
  ));
};

const DeskNavLink = ({ path, displayText }) => {
  return (
    <li>
      <LinkButton onClick={() => Router.push(path)}>{displayText}</LinkButton>
    </li>
  );
};

const DeskNavLinks = ({ navList }) => {
  return navList.map(({ path, displayText }) => (
    <DeskNavLink key={displayText} path={path} displayText={displayText} />
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
    const { navList, children } = this.props;
    console.log(Router);
    return (
      <MobNavStyled>
        <MobNavUL>
          {!navOpen && (
            <FlexRow>
              <MobLinkLi>
                <BoringH3>
                  <Link href="/">
                    <a>🏡 Hausmix</a>
                  </Link>
                </BoringH3>
              </MobLinkLi>
              <NavBurger onClick={() => this.handleBurger(navOpen)}>
                |||
              </NavBurger>
            </FlexRow>
          )}
          {navOpen && (
            <>
              <FlexRow>
                <MobLinkLi>
                  <BoringH3>
                    <Link href="/">
                      <a>🏡 Hausmix</a>
                    </Link>
                  </BoringH3>
                </MobLinkLi>
                <NavBurger onClick={() => this.handleBurger(navOpen)}>
                  |||
                </NavBurger>
              </FlexRow>
              <MobNavLinks
                navOpen={navOpen}
                handleBurger={this.handleBurger.bind(this)}
                navList={navList}
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

const DeskBar = ({ className, children, navList }) => (
  <DeskNav className={className}>
    <LeftFlexSelf>
      <h1>
        <Link href="/">
          <a>🏡 Hausmix</a>
        </Link>
      </h1>
    </LeftFlexSelf>
    <NavUL>
      <DeskNavLinks navList={navList} />
      {children}
    </NavUL>
  </DeskNav>
);

const GreetDesk = ({ className }) => (
  <DeskBar className={className} navList={navLists.signedOut.desk} />
);

const GreetMob = () => <MobNav navList={navLists.signedOut.mob} />;

const Nav = () => (
  <User>
    {({ data: { loggedInUser } }) => (
      <>
        {loggedInUser && (
          <>
            <DeskBar navList={navLists.signedIn.desk}>
              <InnerButtonLinkLi>
                <SignOut />
              </InnerButtonLinkLi>
            </DeskBar>
            <MobNav navList={navLists.signedIn.mob}>
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
