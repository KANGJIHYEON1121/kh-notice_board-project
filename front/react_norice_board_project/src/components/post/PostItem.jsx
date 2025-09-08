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

const PostItem = ({ post }) => {
  const { moveToRead } = useCustomMove();

  return (
    <CardContainer>
      <ItemHeader>
        <Profile writer={post?.writer} />
        <SettingButton />
      </ItemHeader>
      <ItemMain onClick={() => moveToRead(post?.pno)}>
        <img
          src={
            post?.uploadFileNames?.[0]
              ? `${HOST_URL}/post/view/${post.uploadFileNames[0]}`
              : `${HOST_URL}/post/view/default`
          }
          alt="게시글 이미지"
        />
      </ItemMain>
      <ItemFooter>
        <Content content={post?.content} regDate={post?.regDate} />
        <LikeButton count={post?.likeCount} />
      </ItemFooter>
    </CardContainer>
  );
};

export default PostItem;
