import styled from "styled-components";

const ContentDiv = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 18px;
  }
  p {
    font-size: 14px;
    color: #737373;
  }
`;

const Content = ({ content, regDate }) => {
  return (
    <ContentDiv>
      <h3>{content}</h3>
      <p>
        {regDate != null ? String(regDate).split("-").join(".").slice(2) : ""}
      </p>
    </ContentDiv>
  );
};

export default Content;
