import styled from "styled-components";

const ButtonComponent = styled.button`
  cursor: pointer;
  width: 56px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: #dfdf05ed;
  font-weight: 700;
  font-size: 15px;
`;

const Button = ({ onClick }) => {
  return <ButtonComponent onClick={onClick}>등록</ButtonComponent>;
};

export default Button;
