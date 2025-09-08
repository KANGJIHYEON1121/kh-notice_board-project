import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HOST_URL } from "../../api/HostUrl";

const UploadImage = ({
  setFiles,
  defaultUrls = [],
  defaultFileNames = [],
  setDefaultFileNames,
}) => {
  const [previewUrls, setPreviewUrls] = useState(defaultUrls);

  useEffect(() => {
    setPreviewUrls(defaultUrls);
  }, [defaultUrls]);

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
      setPreviewUrls((prev) => [...prev, ...results]);
    });
  };

  const handleDelete = (idx) => {
    const urlToDelete = previewUrls[idx];
    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
    if (urlToDelete.startsWith("/post/view") && setDefaultFileNames) {
      setDefaultFileNames((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <Label>
      <ImageUpload>
        {previewUrls.length > 0 ? (
          previewUrls.map((url, idx) => (
            <ImageContainer key={idx}>
              <PreviewImage
                src={url.startsWith("/post/view") ? `${HOST_URL}${url}` : url}
                alt={`preview-${idx}`}
                onClick={() => handleDelete(idx)}
              />
              <DeleteButton onClick={() => handleDelete(idx)}>X</DeleteButton>
            </ImageContainer>
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

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 5px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  width: 20px;
  height: 20px;
  line-height: 18px;
  text-align: center;
  color: #000000;
  font-weight: 700;
`;
