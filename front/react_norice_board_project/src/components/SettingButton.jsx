import styled from "styled-components";
import SettingBtn from "../assets/State=Default.svg";

const SettingDiv = styled.div`
  cursor: pointer;
  width: 40px;
  padding: 10px;
`;

const SettingButton = () => {
  return (
    <SettingDiv>
      <img src={SettingBtn} alt="설정 버튼" />
    </SettingDiv>
  );
};

export default SettingButton;
