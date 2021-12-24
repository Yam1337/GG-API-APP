import { useState, useEffect } from "react";
import {
  SelectBarWrapper,
  ConversationCardWrapper,
  PersonDetails,
  PaginationWrapper,
} from "./styles";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Pagination } from "antd";

export const SelectBar = ({
  selectedId,
  setSelectedId,
  selectedConversation,
  setSelectedConversation,
  sortingState,
  fetchApiToggler,
  loadingSelectState,
  setLoadingSelectState,
  loadingShowingState,
  setLoadingShowingState,
}) => {
  const [conversationsList, setConversationsList] = useState([]);
  const [numberOfDbResults, setNumberOfDbResults] = useState(0);
  const fetchApi = async (page, limit, sort_by, increasing) => {
    // setLoadingState(true);
    try {
      const fetchedData = await axios.get(
        `https://gg-api-app.herokuapp.com/conversations?page=${page}&limit=${limit}&sort_by=${sort_by}&increasing=${increasing}`
      );
      setNumberOfDbResults(fetchedData.data.count);
      if (sortingState === "date") {
        setConversationsList(
          fetchedData.data.conversations.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          })
        );
      }
      if (sortingState === "number") {
        console.log(sortingState);
        setConversationsList(
          fetchedData.data.conversations.sort((a, b) => b.__v - a.__v)
        );
      }

      setLoadingSelectState(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApi(0, 10, "date", false);
  }, [sortingState, fetchApiToggler]);

  return (
    <div>
      <SelectBarWrapper>
        {loadingSelectState ? (
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
            {conversationsList.map((item) => (
              <ConversationCardWrapper
                key={item._id}
                onClick={() => {
                  setLoadingShowingState(true);
                  setSelectedId({
                    id: item._id,
                    personOne: item.personOne,
                    personTwo: item.personTwo,
                    personOneDetails: item.personOneDetails,
                    personTwoDetails: item.personTwoDetails,
                  });
                }}
                cardColor={item._id === selectedId.id ? "#1360e8" : "#ecb800"}
                borderColor={item._id === selectedId.id ? "red" : "#ecb800"}
              >
                <div className="tooltip">
                  <span
                    className="tooltiptext"
                    style={{
                      left: "-350px",
                      top: "70px",
                      height: "350px",
                      width: "350px",
                    }}
                  >
                    <img
                      src={`https://avatars.gg.pl/user,${item.personTwo}/s,500x500`}
                      alt={`${item.personTwo}'s avatar`}
                    />
                  </span>
                  <img
                    src={`http://avatars.gadu-gadu.pl/${item.personTwo}?default=http://avatars.gg.pl/default,100`}
                    alt="User avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://www.pathwaysvermont.org/wp-content/uploads/2017/03/avatar-placeholder-e1490629554738.png";
                    }}
                  />
                  {/* <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    {item.personTwoDetails[0] !== undefined &&
                    item.personTwoDetails[0].substring(5) !== "niepodano"
                      ? `${item.personTwoDetails[0].substring(5)}`
                      : ""}
                    {item.personTwoDetails[3] !== undefined &&
                    item.personTwoDetails[3].substring(5) !== "niepodano"
                      ? `${
                          item.personTwoDetails[3].substring(5) === "kobieta"
                            ? " K"
                            : " M"
                        }`
                      : ""}{" "}
                    {item.personTwoDetails[2] !== undefined &&
                    item.personTwoDetails[2].substring(13) !== "niepodano"
                      ? `${
                          " " +
                          2021 -
                          Number(item.personTwoDetails[2].substring(13))
                        }`
                      : ""}
                  </div>
                </div> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>{`Rozmowa ${
                    item.personOneDetails[0] &&
                    item.personOneDetails[0] !== "nick:niepodano"
                      ? `${item.personOneDetails[0].substring(5)} (${
                          item.personOne
                        })`
                      : item.personOne
                  } z ${
                    item.personTwoDetails[0] &&
                    item.personTwoDetails[0] !== "nick:niepodano"
                      ? `${item.personTwoDetails[0].substring(5)} (${
                          item.personTwo
                        })`
                      : item.personTwo
                  }`}</div>
                  <div>{`Wymienili ${item.__v} wiadomości`}</div>
                </div>

                <div className="tooltip">
                  <span
                    className="tooltiptext"
                    style={{
                      left: "70px",
                      top: "70px",
                      height: "350px",
                      width: "350px",
                    }}
                  >
                    <img
                      src={`https://avatars.gg.pl/user,${item.personOne}/s,500x500`}
                      alt={`${item.personOne}'s avatar`}
                    />
                  </span>
                  <img
                    src={`https://avatars.gg.pl/user,${item.personOne}/s,100x100`}
                    alt="User avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://www.pathwaysvermont.org/wp-content/uploads/2017/03/avatar-placeholder-e1490629554738.png";
                    }}
                  />
                </div>
              </ConversationCardWrapper>
            ))}
          </>
        )}
      </SelectBarWrapper>
      <PaginationWrapper>
        <Pagination
          defaultCurrent={1}
          total={numberOfDbResults}
          onChange={(e) => {
            setLoadingSelectState(true);
            fetchApi(e - 1, 10, "date", false);
          }}
          showSizeChanger={false}
        />
      </PaginationWrapper>
    </div>
  );
};
