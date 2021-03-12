import React, { Component } from "react";
import styled from "styled-components";

import Links from "./Links";

import logo from "../logo.png";

const Wrapper = styled.a.attrs({
  className: "navbar-brand",
})`
  max-width: 1100px;
`;

const Container = styled.div.attrs({
  className: "container",
})``;

const Nav = styled.nav.attrs({
  className: "navbar navbar-expand-lg navbar-dark bg-dark",
})`
  margin-bottom: 20 px;
`;

class NavBar extends Component {
  render() {
    return (
      <Container>
        <Nav>
          <Wrapper href="https://theobmgit.github.io/dscwebdev">
            <img src={logo} width="50" alt="Homepage logo" />
          </Wrapper>
          <Links />
        </Nav>
      </Container>
    );
  }
}

export default NavBar;
