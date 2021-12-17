import {
  ShowingBarWrapper,
  AvatarWrapper,
  MessageWrapper,
  MessageContentWrapper,
} from "./styles";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import "../../App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Tooltip } from "antd";

export const ShowingBar = ({
  selectedId,
  setSelectedId,
  selectedConversation,
  setSelectedConversation,
}) => {
  const [loadingState, setLoadingState] = useState(false);
  const [censoredState, setCensoredState] = useState(true);
  useEffect(() => {
    fetchApi(selectedId.id);
  }, [selectedId.id]);

  const fetchApi = async (selectedId) => {
    try {
      setLoadingState(true);
      const fetchedData = await axios.get(
        `https://gg-api-app.herokuapp.com/conversations/${selectedId}`
      );
      setSelectedConversation(fetchedData.data);
      setLoadingState(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ShowingBarWrapper>
      {loadingState ? (
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
            timeout={3000} //3 secs
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
                    <div style={{ fontWeight: "bold" }}>
                      {conversation.author}
                    </div>
                    <div>
                      <Tooltip
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
                            conversation.messageValidated
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
  );
};
