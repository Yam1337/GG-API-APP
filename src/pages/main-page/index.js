import { useState } from "react";

import { SelectBar } from "../../components/select-bar";
import { ShowingBar } from "../../components/showing-bar";
import { MainPageWrapper } from "./styles";

export const MainPage = () => {
  const [selectedConversation, setSelectedConversation] = useState([]);
  const [selectedId, setSelectedId] = useState({
    id: "",
    personOne: 0,
    personTwo: 0,
  });
  return (
    <>
      <MainPageWrapper>
        <SelectBar
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <ShowingBar
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </MainPageWrapper>
    </>
  );
};
