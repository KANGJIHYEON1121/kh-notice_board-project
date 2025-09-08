import React, { useState } from "react";
import UploadImage from "./UploadImage";
import UploadContent from "./UploadContent";
import Button from "../Button";
import styled from "styled-components";
import { userId } from "../../api/HostUrl";
import { addPost } from "../../api/postApi";

const UploadComponrnt = () => {
  const [files, setFiles] = useState(null);
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState(userId); // 로그인 정보 변경 필요(임시)

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("content", content);
    formData.append("writer", writer);

    try {
      const result = await addPost(formData);
      alert("업로드 완료!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <UploadWrapper>
        <UploadImage setFiles={setFiles} />
        <ContentBox>
          <UploadContent setContent={setContent} />
          <Button onClick={handleSubmit} />
        </ContentBox>
      </UploadWrapper>
    </Container>
  );
};

export default UploadComponrnt;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 100px 0;
  background-color: #ffffff;
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  width: 1000px;
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
`;
