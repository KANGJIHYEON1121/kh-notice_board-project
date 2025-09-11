import UploadComponrnt from "../components/post/UploadComponrnt";
import useCustomLogin from "../hooks/useCustomLogin";
import Footer from "../include/Footer";
import Header from "../include/Header";

const UploadPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    alert("로그인을 해주세요");
    return moveToLoginReturn();
  }

  return (
    <div>
      <Header />
      <UploadComponrnt />
    </div>
  );
};

export default UploadPage;
