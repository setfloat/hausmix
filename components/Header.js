import styled from "styled-components";
import NProgress from "nprogress";
import Nav from "./Nav";
import Router from "next/router";
// import Search from "./Search";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.header`
  /* build my own header setup here */
`;

const Header = () => (
  <StyledHeader>
    <div>
      <Nav />
    </div>
    {/* <div>
            <Search />
        </div> */}
  </StyledHeader>
);

export default Header;
