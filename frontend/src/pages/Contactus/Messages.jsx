import React, { useEffect, useState } from "react";

const Messages = ({ socket, user_id }) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [allMessages]);
  const sendMessage = () => {
    socket.emit("message", { to, from: user_id, message });
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
      {allMessages.length > 0 &&
        allMessages.map((message) => {
          return (
            <p key={message.message}>
              <small>from{message.from}: </small>
              {message.message}
            </p>
          );
        })}
    </div>
  );
};

export default Messages;
