import Input from "../Input";
import styled from "styled-components";
import logo from "../../assets/Logo.svg";
import { useState } from "react";
import { joinPost } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const JoinComponent = () => {
  const [joinData, setJoinData] = useState({
    email: "",
    pw: "",
    pwCheck: "",
    nickname: "",
  });
  const { moveToLogin } = useCustomLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJoinData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJoin = async () => {
    if (joinData.pw !== joinData.pwCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const member = {
      email: joinData.email,
      pw: joinData.pw,
      nickname: joinData.nickname,
      social: false,
      profileImage: null,
    };

    try {
      const result = await joinPost(member); // member: { email, pw, nickname, ... }

      if (result?.error === "Duplicated Email") {
        alert("이미 사용 중인 이메일입니다.");
        return;
      }

      if (result?.error === "Duplicated Nickname") {
        alert("이미 사용 중인 닉네임입니다.");
        return;
      }

      alert("회원가입 완료!");
      moveToLogin();
    } catch (e) {
      console.error(e);
      alert("회원가입 중 문제가 발생했습니다.");
    }
  };

  return (
    <LoginContainer>
      <img src={logo} alt="포스트잇 로고" />
      <div>
        <p>이메일</p>
        <Input
          type="email"
          name="email"
          value={joinData.email}
          onChange={handleChange}
          placeholder={"이메일을 입력해 주세요."}
        />
      </div>
      <div>
        <p>비밀번호</p>
        <Input
          type="password"
          name="pw"
          value={joinData.pw}
          onChange={handleChange}
          placeholder={"비밀번호를 입력해 주세요."}
        />
      </div>
      <div>
        <p>비밀번호 확인</p>
        <Input
          type="password"
          name="pwCheck"
          value={joinData.pwCheck}
          onChange={handleChange}
          placeholder={"비밀번호를 한 번 더 입력해 주세요."}
        />
      </div>
      <div>
        <p>닉네임</p>
        <Input
          type="text"
          name="nickname"
          value={joinData.nickname}
          onChange={handleChange}
          placeholder={"닉네임"}
        />
      </div>
      <JoininButton onClick={() => handleJoin()}>회원가입</JoininButton>
    </LoginContainer>
  );
};

export default JoinComponent;

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

const JoininButton = styled.button`
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
