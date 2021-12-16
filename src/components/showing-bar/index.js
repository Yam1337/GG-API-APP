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

export const ShowingBar = ({
  selectedId,
  setSelectedId,
  selectedConversation,
  setSelectedConversation,
}) => {
  const [avatarSource, setAvatarSource] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  useEffect(() => {
    fetchApi(selectedId.id);
  }, [selectedId.id]);

  function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good;
    img.onerror = bad;
    img.src = imageSrc;
  }

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

  function imgError(image) {
    image.onerror = "";
    image.src =
      "https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png";
    return true;
  }
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
                    <div className="tooltip" style={{ cursor: "pointer" }}>
                      {conversation.message}
                      {console.log(conversation)}
                      <span className="tooltiptext">
                        {conversation.messageValidated
                          ? conversation.messageValidated
                          : "Brak walidacji :("}
                      </span>
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
