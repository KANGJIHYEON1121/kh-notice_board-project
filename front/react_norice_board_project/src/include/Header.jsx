import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

const Header = () => {
  return (
    <Nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/upload"}>Upload</Link>
      <Link to={"/list"}>List</Link>
      <Link to={"/list"}>login</Link>
    </Nav>
  );
};

export default Header;
