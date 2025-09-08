import { useNavigate } from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();

  // home 이동
  const moveToHome = () => {
    navigate(`/`);
  };

  // 특정 게시물 상세보기로 이동
  const moveToRead = (pno) => {
    navigate(`/read/${pno}`);
  };

  // 게시물 등록 페이지로 이동
  const moveToWrite = () => {
    navigate("/post/write");
  };

  // 게시물 수정 페이지로 이동
  const moveToModify = (pno) => {
    navigate(`/modify/${pno}`);
  };

  // 리스트 페이지로 이동
  const moveToList = () => {
    navigate("/post/list");
  };

  return {
    moveToRead,
    moveToWrite,
    moveToModify,
    moveToList,
    moveToHome,
  };
};

export default useCustomMove;
