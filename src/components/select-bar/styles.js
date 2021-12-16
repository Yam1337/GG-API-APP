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
  height: 100vh;
  background-color: #fbd109;
  overflow: auto;
  direction: rtl;
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
  height: 100px;
  border: 1px solid #6886ba;
  background-color: #ecb800;
  box-shadow: -5px 5px 25px black;
  border-radius: 5px;
  margin: 7px;
  padding: 5px;
`;
