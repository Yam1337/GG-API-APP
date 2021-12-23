import {
  ShowingBarWrapper,
  AvatarWrapper,
  MessageWrapper,
  MessageContentWrapper,
  SendMessageBarWrapper,
  ShowingBarContentWrapper,
} from "./styles";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import "../../App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Tooltip, Select, Input, Button } from "antd";

export const ShowingBar = ({
  selectedId,
  setSelectedId,
  selectedConversation,
  setSelectedConversation,
  fetchApiToggler,
  loadingSelectState,
  setLoadingSelectState,
  loadingShowingState,
  setLoadingShowingState,
}) => {
  const [censoredState, setCensoredState] = useState(true);
  const [sendMessageDetails, setSendMessageDetails] = useState({
    to: null,
    content: "",
  });
  useEffect(() => {
    fetchApi(selectedId.id);
  }, [selectedId.id, fetchApiToggler]);
  useEffect(() => {
    setSendMessageDetails({
      to: "Wybierz numer",
      content: "",
    });
  }, [selectedId.id]);

  const fetchApi = async (selectedId) => {
    try {
      // setLoadingState(true);
      const fetchedData = await axios.get(
        `https://gg-api-app.herokuapp.com/conversations/${selectedId}`
      );
      await setSelectedConversation(fetchedData.data);
      setLoadingShowingState(false);
    } catch (err) {
      console.log(err);
    }
  };

  const { Option } = Select;

  const sendMessage = () => {
    axios.post(
      `https://gg-api-app.herokuapp.com/send/${sendMessageDetails.to}`,
      sendMessageDetails.content
    );
    setSendMessageDetails({
      ...sendMessageDetails,
      content: "",
    });
  };

  return (
    <ShowingBarContentWrapper>
      <ShowingBarWrapper>
        {loadingShowingState ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Loader
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={10000} //3 secs
            />
          </div>
        ) : (
          <>
            {selectedConversation.conversation &&
              selectedConversation.conversation.map((conversation) => (
                <>
                  <MessageWrapper
                    style={{
                      display: "flex",
                      flexDirection:
                        conversation.author === selectedId.personOne
                          ? "row"
                          : "row-reverse",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <AvatarWrapper>
                      <img
                        id="user-avatar"
                        src={`http://avatars.gadu-gadu.pl/${conversation.author}?default=http://avatars.gg.pl/default,100`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://www.pathwaysvermont.org/wp-content/uploads/2017/03/avatar-placeholder-e1490629554738.png";
                        }}
                        alt="User avatar"
                      />
                    </AvatarWrapper>
                    <MessageContentWrapper>
                      <div style={{ fontStyle: "italic", fontSize: "12px" }}>
                        {moment(conversation.date)
                          .local()
                          .format("YYYY-MM-DD HH:mm:ss")}
                      </div>
                      <div
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`http://status.gadu-gadu.pl/users/status.asp?id=${conversation.author}&styl=0`}
                          height={"18px"}
                          alt={`${conversation.author} status`}
                        />
                        <div style={{ marginLeft: "5px" }}>
                          {selectedConversation.personOneDetails !==
                            undefined &&
                          selectedConversation.personOneDetails.length !== 0 &&
                          selectedConversation.personOneDetails[0] !==
                            "nick:niepodano" &&
                          conversation.author === selectedConversation.personOne
                            ? `${selectedConversation.personOneDetails[0].substring(
                                5
                              )} (${conversation.author})`
                            : selectedConversation.personTwoDetails !==
                                undefined &&
                              selectedConversation.personTwoDetails[0] !==
                                "nick:niepodano" &&
                              selectedConversation.personTwoDetails.length !==
                                0 &&
                              conversation.author ===
                                selectedConversation.personTwo
                            ? `${selectedConversation.personTwoDetails[0].substring(
                                5
                              )} (${conversation.author})`
                            : conversation.author}
                        </div>
                      </div>
                      <div>
                        <Tooltip
                          overlayStyle={{ whiteSpace: "pre-line" }}
                          placement="bottom"
                          title={
                            conversation.messageValidated.substr(
                              conversation.messageValidated.length - 3
                            ) === "jpg" ||
                            conversation.messageValidated.substr(
                              conversation.messageValidated.length - 3
                            ) === "JPG" ||
                            conversation.messageValidated.substr(
                              conversation.messageValidated.length - 3
                            ) === "png" ||
                            conversation.messageValidated.substr(
                              conversation.messageValidated.length - 3
                            ) === "png" ||
                            conversation.messageValidated.substr(
                              conversation.messageValidated.length - 4
                            ) === "jpeg" ||
                            conversation.messageValidated.substr(
                              conversation.messageValidated.length - 4
                            ) === "JPEG" ? (
                              <div
                                style={
                                  censoredState
                                    ? { filter: "blur(15px)" }
                                    : { filter: "blur(0px)" }
                                }
                              >
                                <img
                                  src={conversation.message.replace(
                                    "https://www.gg.pl/dysk/",
                                    "https://p.gg.pl/thumb/p/d/"
                                  )}
                                  onClick={() => setCensoredState(false)}
                                  height="100%"
                                  width="100%"
                                  alt={`${conversation.author}`}
                                />
                              </div>
                            ) : (
                              <>{`OLD: ${conversation.messageValidated}
                          NEW: ${
                            conversation.messageValidatedNew
                              ? conversation.messageValidatedNew
                              : "Brak nowej walidacji"
                          }`}</>
                            )
                          }
                        >
                          <div
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => {
                              if (
                                conversation.messageValidated.substr(
                                  conversation.messageValidated.length - 3
                                ) === "jpg" ||
                                conversation.messageValidated.substr(
                                  conversation.messageValidated.length - 3
                                ) === "JPG" ||
                                conversation.messageValidated.substr(
                                  conversation.messageValidated.length - 3
                                ) === "png" ||
                                conversation.messageValidated.substr(
                                  conversation.messageValidated.length - 3
                                ) === "png" ||
                                conversation.messageValidated.substr(
                                  conversation.messageValidated.length - 4
                                ) === "jpeg" ||
                                conversation.messageValidated.substr(
                                  conversation.messageValidated.length - 4
                                ) === "JPEG"
                              ) {
                                setCensoredState(true);
                              }
                            }}
                          >
                            {conversation.message}
                          </div>
                        </Tooltip>
                      </div>
                    </MessageContentWrapper>
                  </MessageWrapper>
                </>
              ))}
          </>
        )}
      </ShowingBarWrapper>
      <SendMessageBarWrapper>
        <div className="message-bar">
          <Input.Group
            compact
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              WebkitAlignItems: "center",
              width: "90%",
            }}
          >
            <Select
              onChange={(e) => {
                setSendMessageDetails({
                  ...sendMessageDetails,
                  to: e,
                });
              }}
              style={{ width: "150px" }}
              disabled={selectedConversation.personOne ? false : true}
              value={sendMessageDetails.to}
            >
              <Option value={selectedConversation.personOne}>
                {selectedConversation.personOne}
              </Option>
              <Option value={selectedConversation.personTwo}>
                {selectedConversation.personTwo}
              </Option>
            </Select>
            <Input
              placeholder="Wpisz swoją wiadomość..."
              value={sendMessageDetails.content}
              onChange={(e) => {
                setSendMessageDetails({
                  ...sendMessageDetails,
                  content: e.target.value,
                });
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                sendMessage();
              }}
              disabled={sendMessageDetails.to === "Wybierz numer"}
            >
              Wyślij
            </Button>
          </Input.Group>
        </div>
      </SendMessageBarWrapper>
    </ShowingBarContentWrapper>
  );
};
