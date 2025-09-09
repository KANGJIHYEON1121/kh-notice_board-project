import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import homeLogo from "../assets/Header_Logo.svg";
import Profile from "../components/Profile";
import useCustomLogin from "../hooks/useCustomLogin";
import useCustomMove from "../hooks/useCustomMove";

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;

  img {
    cursor: pointer;
  }
`;

const Header = () => {
  const { isLogin } = useCustomLogin();
  const { moveToHome, moveToMyPage } = useCustomMove();

  return (
    <Nav>
      <img src={homeLogo} alt="홈 이미지 로고" onClick={moveToHome} />
      <Link to={"/upload"}>Upload</Link>
      <Link to={"/list"}>List</Link>

      {isLogin ? (
        <>
          <Profile onClick={moveToMyPage} />
          <Link to={"/login"}>logout</Link>
        </>
      ) : (
        <Link to={"/login"}>login</Link>
      )}
    </Nav>
  );
};

export default Header;
