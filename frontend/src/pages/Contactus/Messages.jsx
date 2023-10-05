import React, { useEffect, useState } from "react";
import "./Contactus.css";
import axios from "axios";

const Messages = ({ socket, user_id }) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    if (allMessages.length === 0) {
      axios
        .get(`http://localhost:5000/users/message/${user_id}`)
        .then((result) => {
          // console.log();
          setAllMessages(result.data.allMessages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [allMessages]);

  const sendMessage = () => {
    socket.emit("message", { to: 7, from: Number(user_id), message });
  };

  const receiveMessage = (data) => {
    console.log(data);
    setAllMessages([...allMessages, data]);
  };

  return (
    <div>
      <h2>Messages</h2>
      <input
        placeholder="message"
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <input
        placeholder="to"
        type="text"
        onChange={(e) => {
          setTo(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        send
      </button>
      {/* {allMessages.length > 0 &&
        allMessages.map((message) => {
          return (
            <p key={message.message}>
              <small>from{message.from}: </small>
              {message.message}
            </p>
          );
        })} */}
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-6">
              <div className="card card-bordered">
                <div className="card-header">
                  <h4 className="card-title">
                    <strong>Customer service</strong>
                  </h4>
                </div>

                <div
                  className="ps-container ps-theme-default ps-active-y"
                  id="chat-content"
                >
                  <div className="media media-meta-day">Today</div>
                  {allMessages.length > 0 &&
                    allMessages.map((message) => {
                      console.log(user_id, message.from);
                      return (
                        <>
                          <div
                            key={message.id}
                            className={
                              user_id == message.from
                                ? "media media-chat"
                                : "media media-chat media-chat-reverse"
                            }
                          >
                            {Number(user_id) == message.from ? (
                              <div
                                className="media-body"
                                style={{
                                  display: "flex",
                                  justifyContent: "start",
                                }}
                              >
                                <p>{message.message}</p>
                                <p className="meta">
                                  <time dateTime="2018">23:58</time>
                                </p>
                              </div>
                            ) : (
                              <div
                                className="media-body"
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <p>{message.message}</p>
                                <p className="meta">
                                  <time dateTime="2018">23:58</time>
                                </p>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                  <div className="media media-chat media-chat-reverse"></div>

                  <div
                    className="ps-scrollbar-x-rail"
                    style={{ left: "0px", bottom: "0px" }}
                  >
                    <div
                      className="ps-scrollbar-x"
                      tabIndex="0"
                      style={{ left: "0px", bottom: "0px" }}
                    ></div>
                  </div>
                  <div
                    className="ps-scrollbar-y-rail"
                    style={{ top: "0px", height: "0px", right: "2px" }}
                  >
                    <div
                      className="ps-scrollbar-y"
                      tabIndex="0"
                      style={{ top: "0px", height: "2px" }}
                    ></div>
                  </div>
                </div>

                <div className="publisher bt-1 border-light">
                  <img
                    className="avatar avatar-xs"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  />
                  <input
                    className="publisher-input"
                    type="text"
                    placeholder="Write something"
                  />
                  <button>Send</button>
                  <span className="publisher-btn file-group"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
