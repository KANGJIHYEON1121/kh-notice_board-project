import React, { useEffect } from "react";
import {
  ItemHeader,
  ItemMain,
  ItemFooter,
  CardContainer,
} from "./PostItemStyle";
import Profile from "../Profile";
import SettingButton from "../SettingButton";
import Content from "../Content";
import LikeButton from "../LikeButton";
import { HOST_URL } from "../../api/HostUrl";
import useCustomMove from "../../hooks/useCustomMove";
import { useNavigate } from "react-router-dom";

const PostItem = ({ post }) => {
  const { moveToRead } = useCustomMove();
  const navigate = useNavigate();

  return (
    <CardContainer>
      <ItemHeader>
        <Profile
          writerProfileImage={post?.writerProfileImage}
          writer={post?.writerNickname}
          onClick={() => navigate(`list/${post?.writerNickname}`)}
        />
        <SettingButton writer={post?.writerNickname} pno={post?.pno} />
      </ItemHeader>
      <ItemMain onClick={() => moveToRead(post?.pno)}>
        <img
          src={
            post?.uploadFileNames?.[0]
              ? `${HOST_URL}/post/view/${post.uploadFileNames[0]}`
              : post?.imageDTOList?.[0]?.fileName
              ? `${HOST_URL}/post/view/${post.imageDTOList[0].fileName}`
              : `${HOST_URL}/post/view/default`
          }
          alt="게시글 이미지"
        />
      </ItemMain>
      <ItemFooter>
        <Content content={post?.content} regDate={post?.regDate} />
        <LikeButton count={post?.likeCount} pno={post?.pno} />
      </ItemFooter>
    </CardContainer>
  );
};

export default PostItem;
