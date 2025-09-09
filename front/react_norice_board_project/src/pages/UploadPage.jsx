import UploadComponrnt from "../components/post/UploadComponrnt";
import useCustomLogin from "../hooks/useCustomLogin";

const UploadPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    alert("로그인을 해주세요");
    return moveToLoginReturn();
  }

  return (
    <div>
      <UploadComponrnt />
    </div>
  );
};

export default UploadPage;
