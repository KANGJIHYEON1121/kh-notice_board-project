import React from "react";
import ModifyComponent from "../components/post/ModifyComponent";
import useCustomLogin from "../hooks/useCustomLogin";
import Header from "../include/Header";

const ModifyPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  if (!isLogin) {
    alert("로그인을 해야만 볼수있는 페이집니다");
    return moveToLoginReturn();
  }

  return (
    <div>
      <Header />
      <ModifyComponent />
    </div>
  );
};

export default ModifyPage;
