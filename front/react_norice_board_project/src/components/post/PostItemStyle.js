import styled from "styled-components"

export const CardContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    border: 1px solid #f2f2f2;
    border-radius: 10px;
    margin-bottom: 20px;
`

export const ItemHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const ItemMain = styled.div`
    width: 100%;
    height: 500px;
    

    img {
        width: 100%;
        height: 100%;
        overflow: auto;
        background-position: center;
        cursor: pointer;
    }
`

export const ItemFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`