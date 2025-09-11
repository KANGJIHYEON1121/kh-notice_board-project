import React, { useState } from "react";
import Input from "../Input";
import styled from "styled-components";
import logo from "../../assets/Logo.svg";
import { useDispatch } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  email: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const dispatch = useDispatch();
  const { doLogin, moveToPath } = useCustomLogin();
  const { moveToJoin } = useCustomMove();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    doLogin(loginParam)
      // loginSlice 의 비동기 호출
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert("이메일과 패스워드를 다시 확인하세요");
        } else {
          alert("로그인 성공");
          moveToPath("/");
          window.location.reload();
        }
      });
  };

  return (
    <LoginContainer>
      <img src={logo} alt="포스트잇 로고" />
      <div>
        <p>이메일</p>
        <Input
          type="email"
          name="email"
          value={loginParam.email}
          onChange={handleChange}
          placeholder={"이메일을 입력해 주세요."}
        />
      </div>
      <div>
        <p>비밀번호</p>
        <Input
          type="password"
          name="pw"
          value={loginParam.pw}
          onChange={handleChange}
          placeholder={"비밀번호를 입력해 주세요."}
        />
      </div>
      <LoginButton onClick={handleClickLogin}>로그인</LoginButton>
      <JoinBtn onClick={moveToJoin}>회원가입</JoinBtn>
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
