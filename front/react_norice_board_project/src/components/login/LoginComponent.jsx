import React from "react";
import Input from "../Input";
import styled from "styled-components";
import logo from "../../assets/Logo.svg";

const LoginComponent = () => {
  return (
    <LoginContainer>
      <img src={logo} alt="포스트잇 로고" />
      <div>
        <p>이메일</p>
        <Input placeholder={"이메일을 입력해 주세요."} />
      </div>
      <div>
        <p>비밀번호</p>
        <Input placeholder={"비밀번호를 입력해 주세요."} />
      </div>
      <LoginButton>로그인</LoginButton>
      <JoinBtn>회원가입</JoinBtn>
    </LoginContainer>
  );
};

export default LoginComponent;

const LoginContainer = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  margin: auto auto;
  width: 280px;

  img {
    width: 280px;
    cursor: pointer;
  }

  div {
    width: 260px;
  }

  p {
    margin-bottom: 5px;
  }
`;

const LoginButton = styled.button`
  cursor: pointer;
  width: 280px;
  height: 48px;
  border-radius: 10px;
  border: none;
  background-color: #dfdf05ed;
  font-weight: 700;
  font-size: 15px;
  padding: 10px;
`;

const JoinBtn = styled.p`
  width: 50px;
  margin: 0 auto;
  font-size: 14px;
  color: #a2a1a1;
  cursor: pointer;
`;
