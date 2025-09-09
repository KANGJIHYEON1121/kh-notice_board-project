import React, { useState, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import styled from "styled-components";
import ProfileImg from "../../assets/Profile.svg";
import {
  deleteProfileImage,
  myProfile,
  updateMember,
} from "../../api/memberApi";
import { HOST_URL } from "../../api/HostUrl";

const MyPageComponent = () => {
  const [memberInfo, setMemberInfo] = useState({
    email: "",
    nickname: "",
    profileImage: "",
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = async () => {
    try {
      await deleteProfileImage(); // DELETE 요청 전송
      setProfileImageFile(null);
      setPreviewUrl(null);
      setMemberInfo((prev) => ({ ...prev, profileImage: "" }));
      alert("프로필 이미지가 삭제되었습니다.");
    } catch (err) {
      console.error("이미지 삭제 실패", err);
      alert("프로필 이미지 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const getMyProfile = async () => {
    await myProfile().then((data) => {
      setMemberInfo({
        email: data.email,
        nickname: data.nickname,
        profileImage: data.profileImage,
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nickname", memberInfo.nickname);
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    } else if (memberInfo.profileImage === "") {
      formData.append("profileImage", null); // handle image deletion with null
    }

    try {
      const result = await updateMember(formData);

      const updated = {
        ...memberInfo,
        ...(result.profileImage && { profileImage: result.profileImage }), // profileImage가 있을 때만 덮어쓰기
      };

      setMemberInfo(updated);
      setPreviewUrl(null);
      alert("회원정보가 수정되었습니다.");
      getMyProfile();
    } catch (err) {
      console.error(err);
      alert("회원정보 수정 실패");
    }
  };

  return (
    <InfoContainer>
      <label htmlFor="profile-upload">
        <img
          src={
            previewUrl
              ? previewUrl
              : memberInfo.profileImage
              ? `${HOST_URL}/member/profile-image/${memberInfo.profileImage}`
              : ProfileImg
          }
          alt="프로필 사진"
        />
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </label>
      {(previewUrl || memberInfo.profileImage) && (
        <RemoveButton onClick={handleRemoveImage}>×</RemoveButton>
      )}
      <p>이메일</p>
      <div>
        <Input
          type="email"
          name="email"
          value={memberInfo.email}
          onChange={handleChange}
          placeholder={"이메일을 입력해 주세요."}
        />
      </div>
      <p>닉네임</p>
      <div>
        <Input
          type="text"
          name="nickname"
          value={memberInfo.nickname}
          onChange={handleChange}
          placeholder={"닉네임"}
        />
      </div>
      <Button onClick={handleSubmit} text={"저장"} />
    </InfoContainer>
  );
};

export default MyPageComponent;

const InfoContainer = styled.div`
  position: relative;
  margin: auto auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  img {
    width: 150px;
    border-radius: 100%;
    cursor: pointer;
  }

  div {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 80px;
  background: none;
  border: none;
  font-size: 24px;
  color: red;
  cursor: pointer;
`;
