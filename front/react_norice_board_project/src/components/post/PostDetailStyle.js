import styled from "styled-components";

export const DetailPostContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 50px;
`;

export const LeftSection = styled.div`
  margin-right: 10px;
`

export const RightSection = styled.div`
    width: 100%;
`

export const RightHeader = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }


`;

export const RightMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: 400px;
  border-top:1px solid #f2f2f2;
  

  div {
    display: flex;
  }
`;

export const RightFooter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`