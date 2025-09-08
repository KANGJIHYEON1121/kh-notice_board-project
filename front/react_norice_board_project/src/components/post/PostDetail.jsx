import Profile from "../Profile";
import LikeButton from "../LikeButton";
import SettingButton from "../SettingButton";
import Input from "../Input";
import {
  DetailPostContainer,
  RightHeader,
  RightMain,
  RightSection,
  LeftSection,
  RightFooter,
} from "./PostDetailStyle";
import Content from "../Content";
import Button from "../Button";
import DetailCarousel from "./DetailCarousel";

const PostDetail = ({ post }) => {
  return (
    <DetailPostContainer>
      <LeftSection>
        <DetailCarousel uploadFileNames={post?.uploadFileNames ?? []} />
      </LeftSection>
      <RightSection>
        <RightHeader>
          <Profile writer={post?.writer} />
          <div>
            <LikeButton count={post?.likeCount} />
            <SettingButton />
          </div>
        </RightHeader>
        <RightMain>
          <div>
            <Profile writer={post?.writer} />
            <Content content={post?.content} />
          </div>
        </RightMain>
        <RightFooter>
          <Input />
          <Button text={"등록"} />
        </RightFooter>
      </RightSection>
    </DetailPostContainer>
  );
};

export default PostDetail;
