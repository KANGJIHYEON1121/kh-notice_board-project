import React, { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import UploadContent from "./UploadContent";
import Button from "../Button";
import styled from "styled-components";
import { userId } from "../../api/HostUrl";
import { deletePost, getPost, updatePost } from "../../api/postApi";
import { useParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";

const ModifyComponent = () => {
  const param = useParams();
  const [files, setFiles] = useState(null);
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState(userId); // 로그인 정보 변경 필요(임시)
  const [previewUrls, setPreviewUrls] = useState([]);
  const [defaultFileNames, setDefaultFileNames] = useState([]);
  const { moveToHome } = useCustomMove();

  const getOnePost = async () => {
    await getPost(param.pno).then((data) => {
      setContent(data.content);
      setDefaultFileNames(data.uploadFileNames);
      const imageUrls = data.uploadFileNames.map(
        (name) => `/post/view/${name}`
      );
      setPreviewUrls(imageUrls);
    });
  };

  useEffect(() => {
    getOnePost();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (files) {
      files.forEach((file) => formData.append("files", file));
    }
    if (defaultFileNames.length > 0) {
      defaultFileNames.forEach((fileName) =>
        formData.append("uploadFileNames", fileName)
      );
    }
    formData.append("content", content);
    formData.append("writer", writer);

    try {
      const result = await updatePost(formData, param.pno);
      alert("수정 완료!");
      moveToHome();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const result = confirm("삭제 하시겠습니까?");

    if (result) {
      await deletePost(param.pno)
        .then((data) => {
          moveToHome();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Container>
      <UploadWrapper>
        <UploadImage
          setFiles={setFiles}
          defaultUrls={previewUrls}
          defaultFileNames={defaultFileNames}
          setDefaultFileNames={setDefaultFileNames}
        />
        <ContentBox>
          <UploadContent content={content} setContent={setContent} />
          <div>
            <Button onClick={handleSubmit} text={"수정"} />
            <DeleteBtn onClick={() => handleDelete()}>삭제</DeleteBtn>
          </div>
        </ContentBox>
      </UploadWrapper>
    </Container>
  );
};

export default ModifyComponent;

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

  div {
    button {
      margin: 5px;
    }
  }
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  width: 56px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: #ee1e07;
  color: white;
  font-weight: 700;
  font-size: 15px;
`;
