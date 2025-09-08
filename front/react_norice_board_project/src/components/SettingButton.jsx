import styled from "styled-components";
import SettingBtn from "../assets/State=Default.svg";
import useCustomMove from "../hooks/useCustomMove";

const SettingDiv = styled.div`
  cursor: pointer;
  width: 40px;
  padding: 10px;
`;

const SettingButton = ({ pno }) => {
  const { moveToModify } = useCustomMove();

  return (
    <SettingDiv>
      <img src={SettingBtn} onClick={() => moveToModify(pno)} alt="설정 버튼" />
    </SettingDiv>
  );
};

export default SettingButton;
