import { useState, useEffect } from "react";
import { Select, Switch } from "antd";

import { SelectBar } from "../../components/select-bar";
import { ShowingBar } from "../../components/showing-bar";
import { MainPageWrapper, HeaderWrapper } from "./styles";
import socketIOClient from "socket.io-client";

export const MainPage = () => {
  const [selectedConversation, setSelectedConversation] = useState([]);
  const [selectedId, setSelectedId] = useState({
    id: "",
    personOne: 0,
    personTwo: 0,
    personOneDetails: [],
    personTwoDetails: [],
  });
  const [sortingState, setSortingState] = useState("date");
  const [fetchApiToggler, setFetchApiToggler] = useState(false);
  const [loadingSelectState, setLoadingSelectState] = useState(true);
  const [loadingShowingState, setLoadingShowingState] = useState(false);
  const [validationSwitch, setValidationSwitch] = useState(true)

  const { Option } = Select;

  const handleChange = (e) => {
    console.log(e);
    setSortingState(e);
  };

  useEffect(() => {
    const socket = socketIOClient("https://gg-api-app.herokuapp.com");
    socket.on("FromAPI", (data) => {
      setFetchApiToggler((prev) => !prev);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <>
      <MainPageWrapper>
        <HeaderWrapper>
        Pokaz przerobioną wersję wiadomości (To co widzą widzi osoba która dostaje wiadomość)
          <div><Switch checked={validationSwitch} onChange={() => setValidationSwitch((prev) => !prev)} /></div>
          <>
            {/* <div
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
            </div> */}
          </>
        </HeaderWrapper>
        <div style={{ display: "flex" }}>
          <SelectBar
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            sortingState={sortingState}
            fetchApiToggler={fetchApiToggler}
            loadingSelectState={loadingSelectState}
            setLoadingSelectState={setLoadingSelectState}
            loadingShowingState={loadingShowingState}
            setLoadingShowingState={setLoadingShowingState}
          />
          <ShowingBar
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            fetchApiToggler={fetchApiToggler}
            loadingSelectState={loadingSelectState}
            setLoadingSelectState={setLoadingSelectState}
            loadingShowingState={loadingShowingState}
            setLoadingShowingState={setLoadingShowingState}
            validationSwitch={validationSwitch}
          />
        </div>
      </MainPageWrapper>
    </>
  );
};
