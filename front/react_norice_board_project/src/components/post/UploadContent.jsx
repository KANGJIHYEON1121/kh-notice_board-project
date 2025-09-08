import React from "react";
import styled from "styled-components";

const UploadContent = ({ setContent }) => {
  return (
    <TextArea
      placeholder="게시글 내용을 입력해 주세요"
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

export default UploadContent;

const TextArea = styled.textarea`
  width: 100%;
  height: 230px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
`;
