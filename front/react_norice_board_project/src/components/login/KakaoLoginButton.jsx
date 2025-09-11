import styled from "styled-components";
import React from "react";
import { getKakaoLoginLink } from "../../api/kakaoApi";

const StyledButton = styled.a`
  display: inline-block;
  background-color: #fee500;
  color: #000;
  font-weight: bold;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

const KakaoLoginButton = () => {
  const link = getKakaoLoginLink();

  return <StyledButton href={link}>KAKAO</StyledButton>;
};

export default KakaoLoginButton;
