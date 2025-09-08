import React, { useState } from "react";
import styled from "styled-components";

const UploadImage = ({ setFiles }) => {
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const readers = selectedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setPreviewUrls(results);
    });
  };

  return (
    <Label>
      <ImageUpload>
        {previewUrls.length > 0 ? (
          previewUrls.map((url, idx) => (
            <PreviewImage key={idx} src={url} alt={`preview-${idx}`} />
          ))
        ) : (
          <>
            <UploadIcon>📷</UploadIcon>
            <UploadText>여기를 눌러 이미지를 선택하세요</UploadText>
          </>
        )}
      </ImageUpload>
      <HiddenInput multiple type="file" onChange={handleFileChange} />
    </Label>
  );
};

export default UploadImage;

const Label = styled.label`
  display: inline-block;
  width: 50%;
`;

const ImageUpload = styled.div`
  width: 90%;
  height: 280px;
  background-color: #e6e6e6;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  overflow: hidden;
  padding: 10px;
`;

const UploadIcon = styled.div`
  font-size: 32px;
`;

const UploadText = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #888;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
`;
