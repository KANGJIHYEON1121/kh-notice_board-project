import styled from "styled-components";
import defaultProfileImg from "../assets/Type=Default.svg";
import { HOST_URL } from "../api/HostUrl";

const ProfileBox = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;

  p {
    font-size: 18px;
    font-weight: 600;
  }

  img {
    width: 60px;
    border-radius: 100%;
  }
`;

const Profile = ({ writer, writerProfileImage, onClick }) => {
  return (
    <ProfileBox onClick={onClick}>
      {console.log(`${HOST_URL}/member/profile-image/${writerProfileImage}`)}
      <img
        src={
          writerProfileImage
            ? `${HOST_URL}/member/profile-image/${writerProfileImage}`
            : defaultProfileImg
        }
        alt="프로필 이미지"
      />
      <p>{writer}</p>
    </ProfileBox>
  );
};

export default Profile;
