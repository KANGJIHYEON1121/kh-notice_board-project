import styled from "styled-components";

export const DetailPostContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 50px;
`;

export const LeftSection = styled.div`
    img{
        width: 400px;
        height: 400px;
    }
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
    align-items: center;
`;