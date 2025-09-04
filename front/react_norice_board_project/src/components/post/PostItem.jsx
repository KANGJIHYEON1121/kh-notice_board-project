import React from "react";
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

const PostItem = () => {
  return (
    <CardContainer>
      <ItemHeader>
        <Profile />
        <SettingButton />
      </ItemHeader>
      <ItemMain>
        <img src="" alt="게시글 이미지" />
      </ItemMain>
      <ItemFooter>
        <Content />
        <LikeButton />
      </ItemFooter>
    </CardContainer>
  );
};

export default PostItem;
