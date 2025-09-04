import styled from "styled-components";

const ContentDiv = styled.div`
  padding: 20px;

  h3 {
    font-size: 18px;
  }
  p {
    font-size: 14px;
    color: #737373;
  }
`;

const Content = () => {
  return (
    <ContentDiv>
      <h3>Text</h3>
      <p>YY.MM.DD</p>
    </ContentDiv>
  );
};

export default Content;
