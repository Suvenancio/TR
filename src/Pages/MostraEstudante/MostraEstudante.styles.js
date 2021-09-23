import styled from 'styled-components';

export const Tabela = styled.div`
    width: 50%;
    margin-left: 25%;
    align-items: center;
    display: grid;
    grid-template-columns: 15% 25% 25% 25% 25%;
    grid-template-rows: 1fr;
    margin-top: 10px;
  
    >p{
        border-bottom: 1px solid grey;
        padding: 2px;
        text-align: center;
        align-content: center;
    }
    >div{
        text-align: center;
        background-color: #FFFFFF;
        height: 50px;
       
    }
`;
export const Btn = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center ;
`
export const Body = styled.body`
    background-color: #F2F2F2;
    padding: 20px;
  
`
export const Menu = styled.div`
   display:flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
   padding: 20px;
   >img{
       width: 200px;
   }
   
`
export const Container = styled.div`
    background-color: #F4F5F9;
    border: solid black;
    border-radius: 20px;
`