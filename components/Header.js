import styled from "styled-components";
import NProgress from "nprogress";
import Nav from "./Nav";
import Router from "next/router";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => <Nav />;

export default Header;
