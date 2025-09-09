import React from "react";
import MyPageComponent from "../components/member/MyPageComponent";
import useCustomLogin from "../hooks/useCustomLogin";

const MyPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    alert("로그인을 해주세요");
    return moveToLoginReturn();
  }

  return (
    <div>
      <MyPageComponent />
    </div>
  );
};

export default MyPage;
