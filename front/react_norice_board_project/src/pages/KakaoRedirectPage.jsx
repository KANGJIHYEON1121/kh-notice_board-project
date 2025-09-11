import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../slices/loginSlice";
import useCustomMove from "../hooks/useCustomMove";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const dispatch = useDispatch();
  const { moveToHome, moveToMyPage } = useCustomMove();

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      console.log(accessToken);

      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log(" -------------------------- ");
        console.log(memberInfo);
        dispatch(login(memberInfo));

        if (memberInfo && !memberInfo.social) {
          moveToHome();
        } else {
          moveToMyPage();
          window.location.reload();
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
