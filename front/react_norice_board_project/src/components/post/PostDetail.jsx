import Profile from "../Profile";
import LikeButton from "../LikeButton";
import SettingButton from "../SettingButton";
import styled from "styled-components";
import {
  DetailPostContainer,
  RightHeader,
  RightMain,
  RightSection,
  LeftSection,
} from "./PostDetailStyle";
import Content from "../Content";

const PostDetail = () => {
  return (
    <DetailPostContainer>
      <LeftSection>
        <img
          src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_incoming&w=740&q=80"
          alt="게시글 이미지"
        />
      </LeftSection>
      <RightSection>
        <RightHeader>
          <Profile />
          <div>
            <LikeButton />
            <SettingButton />
          </div>
        </RightHeader>
        <RightMain>
          <Profile />
          <Content />
        </RightMain>
      </RightSection>
    </DetailPostContainer>
  );
};

export default PostDetail;
