import styled from "styled-components";
import LikeBtn from "../assets/State=Like.svg";
import UnLikeBtn from "../assets/State=UnLike.svg";
import { useEffect, useState } from "react";
import { getLikeStatus, toggleLike, getLikeCount } from "../api/likeAPi";

const Div = styled.div`
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  p {
    color: red;
  }
`;

const LikeBox = styled.div`
  cursor: pointer;
  width: 40px;
  height: 28px;
  overflow-y: hidden;
  text-align: center;
`;

const LikeButton = ({ count, pno }) => {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(count);

  useEffect(() => {
    const fetchLikeStatusAndCount = async () => {
      try {
        const statusData = await getLikeStatus(pno); // 로그인 사용자 기준 좋아요 상태
        setIsLike(statusData.liked);

        const countData = await getLikeCount(pno); // 좋아요 수 갱신
        setLikeCount(countData.likeCount);
      } catch (error) {
        console.error("좋아요 상태/수 조회 실패", error);
      }
    };

    fetchLikeStatusAndCount();
  }, [pno]);

  const onClickLike = async () => {
    try {
      const data = await toggleLike(pno);
      setIsLike(data.liked); // 좋아요 or 좋아요 취소 여부

      const countData = await getLikeCount(pno);
      setLikeCount(countData.likeCount); // 갱신된 좋아요 수
    } catch (err) {
      console.error("좋아요 토글 실패", err);
    }
  };

  return (
    <Div>
      <LikeBox onClick={onClickLike}>
        {isLike ? (
          <img src={LikeBtn} alt="좋아요 버튼" />
        ) : (
          <img src={UnLikeBtn} alt="좋아요 버튼" />
        )}
      </LikeBox>
      <p>{likeCount}</p>
    </Div>
  );
};

export default LikeButton;
