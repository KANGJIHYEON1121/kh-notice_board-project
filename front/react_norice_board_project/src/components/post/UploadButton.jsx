import styled from "styled-components";
import UploadImg from "../../assets/Property 1=Default.svg";
import useCustomMove from "../../hooks/useCustomMove";

const UploadButtonContainer = styled.div`
  position: fixed;
  bottom: 0px;
  right: 240px;

  img {
    width: 100px;
    cursor: pointer;
  }
`;

const UploadButton = () => {
  const { moveToUpload } = useCustomMove();

  return (
    <UploadButtonContainer>
      <img
        onClick={() => moveToUpload()}
        src={UploadImg}
        alt="게시글 업로드 버튼"
      />
    </UploadButtonContainer>
  );
};

export default UploadButton;
