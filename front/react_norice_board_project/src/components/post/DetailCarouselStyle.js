import styled from "styled-components";

export const CarouselContainer = styled.div`
  margin-top: 30px;
  width: 500px;
  height: 500px;
  overflow: hidden;


    @media (max-width: 430px) {
            width: 430px;
            height: auto;
            border-radius: 10px;
        }

        @media (max-width: 414px) {
            width: 414px;
            height: auto;
            border-radius: 10px;
        }

        @media (max-width: 390px) {
            width: 390px;
            height: auto;
            border-radius: 10px;
        }

        @media (max-width: 375px) {
            width: 375px;
            height: auto;
            border-radius: 10px;
        }
    
    div {
        position: relative;
        display: flex;
        transition: all 0.5s; 
    }
`

export const Cell = styled.div`

    img {
        width: 500px;
        height: 470px;
        border-radius: 20px;

        @media (max-width: 430px) {
            width: 430px;
            height: auto;
            border-radius: 10px;
        }

        @media (max-width: 414px) {
            width: 414px;
            height: auto;
            border-radius: 10px;
        }

        @media (max-width: 390px) {
            width: 390px;
            height: auto;
            border-radius: 10px;
        }

        @media (max-width: 375px) {
            width: 375px;
            height: auto;
            border-radius: 10px;
        }
    }

    h3 {
        position: absolute;
        bottom: 100px;
        left: 50px;
        font-size: 70px;
        font-weight: 600;
        color: white;

        @media (max-width: 500px) {
            font-size: 30px;
            bottom: 80px;
        }
    }

    p {
        position: absolute;
        bottom: 50px;
        left: 50px;
        font-size: 50px;
        font-weight: 500;
        color: white;
        @media (max-width: 500px) {
            font-size: 20px;
            bottom: 40px;
        }
    }
`

export const PrevBtn = styled.button`
    position: absolute;
    top: -260px;
    left: -250px;
    margin-left: 250px;
    cursor: pointer;
    margin-top: 20px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
    display: inline-block;
    background-color: transparent;
    border: none;
    font-size: 40px;
    color: #999;

    @media (max-width: 500px) {
        top: -190px;
    }
`

export const NextBtn = styled.button`
    position: absolute;
    top: -260px;
    right: 0px;
    cursor: pointer;
    margin-top: 20px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
    display: inline-block;
    background-color: transparent;
    border: none;
    font-size: 40px;
    color: #999;

        @media (max-width: 500px) {
        top: -190px;
    }
`

export const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

export const IndicatorDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => (props.active ? '#dfdf05ed' : '#ccc')};
  transition: background-color 0.3s;
`;