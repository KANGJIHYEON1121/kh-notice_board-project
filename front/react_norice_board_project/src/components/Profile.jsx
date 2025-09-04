import styled from "styled-components";
import defaultProfileImg from "../assets/Type=Default.svg";

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
`;

const Profile = () => {
  return (
    <ProfileBox>
      <img src={defaultProfileImg} alt="프로필 이미지" />
      <p>Name</p>
    </ProfileBox>
  );
};

export default Profile;
