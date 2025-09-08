import styled from "styled-components";

const InputComponent = styled.input`
  width: 100%;
  height: 30px;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #f2f2f2;
`;

const Input = ({ newComment, setNewComment, placeholder }) => {
  return (
    <>
      <InputComponent
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder={placeholder}
      ></InputComponent>
    </>
  );
};

export default Input;
