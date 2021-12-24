import styled from "styled-components";

export const SelectBarWrapper = styled.div`
  img {
    height: 70px;
    border-radius: 50%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35vw;
  height: calc(100vh - 100px);
  background-color: #ad8f00;
  overflow: auto;
  direction: rtl;
  border-top: solid 1px black;
`;

export const ConversationCardWrapper = styled.div`
  &:hover {
    background-color: #6886ba;
    transition: background-color 0.5s;
    cursor: pointer;
  }
  &:active {
    transform: scale(0.98);
    transition: transform 0.2s;
  }
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  max-height: 150px;
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.cardColor};
  box-shadow: -5px 5px 25px black;
  border-radius: 5px;
  margin: 7px;
  padding: 5px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #ecb800;
  border-top: 1px solid black;
`;
