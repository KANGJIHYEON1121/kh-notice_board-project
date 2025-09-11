import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import homeLogo from "../assets/Header_Logo.svg";
import Profile from "../components/Profile";
import useCustomLogin from "../hooks/useCustomLogin";
import useCustomMove from "../hooks/useCustomMove";
import { userNickName } from "../api/HostUrl";
import Button from "../components/Button";
import { removeCookie } from "../util/cookie";
import { myProfile } from "../api/memberApi";

const Nav = styled.nav`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 30px;

  img {
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

const Header = () => {
  const { isLogin } = useCustomLogin();
  const { moveToHome, moveToMyPage } = useCustomMove();
  const [profileImg, setProfileImg] = useState(null);
  const navigate = useNavigate();

  const getProfile = async () => {
    await myProfile().then((data) => {
      setProfileImg(data.profileImage);
    });
  };

  getProfile();

  return (
    <Nav>
      <img src={homeLogo} alt="홈 이미지 로고" onClick={moveToHome} />

      {isLogin ? (
        <div>
          <Profile
            writer={userNickName}
            writerProfileImage={profileImg}
            onClick={moveToMyPage}
          />
          <Button
            text={"logout"}
            onClick={() => {
              removeCookie("member");
              window.location.reload();
            }}
          >
            logout
          </Button>
        </div>
      ) : (
        <div>
          <Button text={"login"} onClick={() => navigate("/login")}>
            login
          </Button>
        </div>
      )}
    </Nav>
  );
};

export default Header;
