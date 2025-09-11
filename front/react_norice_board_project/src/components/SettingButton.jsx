import styled from "styled-components";
import SettingBtn from "../assets/State=Default.svg";
import useCustomMove from "../hooks/useCustomMove";
import { userNickName } from "../api/HostUrl";

const SettingDiv = styled.div`
  cursor: pointer;
  width: 40px;
  padding: 10px;
`;

const SettingButton = ({ writer, pno }) => {
  const { moveToModify } = useCustomMove();

  const isCheck = userNickName === writer;

  return isCheck ? (
    <SettingDiv>
      <img src={SettingBtn} onClick={() => moveToModify(pno)} alt="설정 버튼" />
    </SettingDiv>
  ) : null;
};

export default SettingButton;
