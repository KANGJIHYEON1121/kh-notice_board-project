import styled from "styled-components";
import LikeBtn from "../assets/State=Like.svg";
import UnLikeBtn from "../assets/State=UnLike.svg";
import { useState } from "react";

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
`;

const LikeButton = () => {
  const [isLike, setIsLike] = useState(false);

  const onClickLike = () => {
    setIsLike(!isLike);
  };

  return (
    <Div>
      <LikeBox onClick={() => onClickLike()}>
        {isLike ? (
          <img src={LikeBtn} alt="좋아요 버튼" />
        ) : (
          <img src={UnLikeBtn} alt="좋아요 버튼" />
        )}
      </LikeBox>
      <p>0</p>
    </Div>
  );
};

export default LikeButton;
