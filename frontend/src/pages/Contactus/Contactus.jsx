import React, { useEffect, useState } from "react";
import socketInit from "../../service/api/socket_server";
import Messages from "./Messages.jsx";
import { useSelector, useDispatch } from "react-redux";

const ContactUs = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const token = useSelector((state) => {
    return state.login.token;
  });
  const user_id = useSelector((state) => {
    return state.login.userId;
  });

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
    <div style={{minHeight: "80%"}}>
      <button
        onClick={() => {
          setSocket(socketInit({ user_id, token }));
        }}
      >
        Talk with Customer Service
      </button>
      {isConnected && (
        <Messages
          socket={socket}
          user_id={user_id}
          setSocket={setSocket}
          token={token}
          admin={false}
          user={null}
        />
      )}
    </div>
  );
};

export default ContactUs;
