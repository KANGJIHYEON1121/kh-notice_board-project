import { useNavigate } from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();

  // home 이동
  const moveToHome = (value) => {
    navigate({ pathname: `/` }, { replace: value });
  };

  // 특정 게시물 상세보기로 이동
  const moveToRead = (pno) => {
    navigate(`/read/${pno}`);
  };

  // 게시물 등록 페이지로 이동
  const moveToWrite = () => {
    navigate("/post/write");
  };

  // 회원가입 페이지로 이동
  const moveToJoin = () => {
    navigate("/join");
  };

  // 마이 페이지로 이동
  const moveToMyPage = () => {
    navigate("/mypage");
  };

  // 게시물 수정 페이지로 이동
  const moveToModify = (pno) => {
    navigate(`/modify/${pno}`);
  };

  // 리스트 페이지로 이동
  const moveToList = (writer) => {
    navigate(`/list/${writer}`);
  };

  return {
    moveToRead,
    moveToWrite,
    moveToModify,
    moveToList,
    moveToHome,
    moveToJoin,
    moveToMyPage,
  };
};

export default useCustomMove;
