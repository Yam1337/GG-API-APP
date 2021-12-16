import styled from "styled-components";

export const ShowingBarWrapper = styled.div`
  width: 65vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f0f0f0;
  box-shadow: -5px 0px 25px black;
`;

export const AvatarWrapper = styled.div`
  img {
    height: 70px;
    border-radius: 50%;
    margin: 0px 15px 0px 15px;
    box-shadow: -0px 0px 20px black;
  }
`;

export const MessageWrapper = styled.div`
  display: flex;
  margin: 15px 0px 0px 0px;
`;

export const MessageContentWrapper = styled.div`
  border-radius: 25px;
  padding: 10px 10px 10px 10px;
  background-color: #d2d2d2;
  box-shadow: -0px 0px 20px black;
`;
