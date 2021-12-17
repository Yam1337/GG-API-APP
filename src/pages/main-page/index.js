import { useState } from "react";
import { Select } from "antd";

import { SelectBar } from "../../components/select-bar";
import { ShowingBar } from "../../components/showing-bar";
import { MainPageWrapper, HeaderWrapper } from "./styles";

export const MainPage = () => {
  const [selectedConversation, setSelectedConversation] = useState([]);
  const [selectedId, setSelectedId] = useState({
    id: "",
    personOne: 0,
    personTwo: 0,
  });
  const [sortingState, setSortingState] = useState("date");

  const { Option } = Select;

  const handleChange = (e) => {
    console.log(e);
    setSortingState(e);
  };

  return (
    <>
      <MainPageWrapper>
        <HeaderWrapper>
          <>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginRight: "5px",
              }}
            >
              Sortuj po
            </div>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <Select
                defaultValue="date"
                style={{ width: 220 }}
                onChange={handleChange}
              >
                <Option value="date">dacie ostatniej wiadomości</Option>
                <Option value="number">liczbie wiadomości</Option>
              </Select>
            </div>
          </>
        </HeaderWrapper>
        <div style={{ display: "flex" }}>
          <SelectBar
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            sortingState={sortingState}
          />
          <ShowingBar
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </div>
      </MainPageWrapper>
    </>
  );
};
