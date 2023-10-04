import React, { useEffect, useState } from "react";

const Messages = ({ socket, user_id }) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
  }, []);
  const sendMessage = () => {
    socket.emit("message", { to, from: user_id, message });
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
    </div>
  );
};

export default Messages;
