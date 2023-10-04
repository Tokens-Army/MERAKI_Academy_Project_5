import React, { useEffect, useState } from "react";
import socketInit from "../../service/api/socket_server";
import Messages from "./Messages.jsx";

const ContactUs = () => {
  const [user_id, setUser_id] = useState("");
  const [token, setToken] = useState("");
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket?.on("connect", () => {
      setIsConnected(true);
    });
    socket?.on("connect_error", (error) => {
      console.log(error.message);
      setIsConnected(false);
    });
    return () => {
      socket?.close();
      socket?.removeAllListeners();
      setIsConnected(false);
    };
  }, [socket]);

  return (
    <div>
      <h1>Socket Io</h1>
      <input
        type="text"
        placeholder="user_id"
        onChange={(e) => {
          setUser_id(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="token"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setSocket(socketInit({ user_id, token }));
        }}
      >
        connect
      </button>
      {isConnected && <Messages socket={socket} user_id={user_id} />}
    </div>
  );
};

export default ContactUs;
