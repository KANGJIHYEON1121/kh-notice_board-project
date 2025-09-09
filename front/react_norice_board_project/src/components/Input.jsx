import styled from "styled-components";

const InputComponent = styled.input`
  width: 100%;
  height: 30px;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #f2f2f2;
`;

const Input = ({ name, value, setValue, onChange, placeholder, type }) => {
  const handleChange = (e) => {
    if (setValue) {
      if (name) {
        setValue(e); // 전달된 이벤트 자체를 넘김
      } else {
        setValue(e.target.value); // 단순 value만 넘김
      }
    } else if (onChange) {
      onChange(e);
    }
  };

  return (
    <InputComponent
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
