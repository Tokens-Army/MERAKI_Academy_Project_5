import React, { useEffect, useState } from "react";
import socketInit from "../../../service/api/socket_server";

import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button } from "@mui/material";
import Messages from "../../Contactus/Messages";
import axios from "axios";
const AdminMessage = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState({});
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/users")
      .then((result) => {
        setAllUsers(result.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div>
        <Button
          onClick={() => {
            setSocket(socketInit({ user_id, token }));
          }}
        >
          Connect
        </Button>
        {allUsers &&
          allUsers.map((user) => {
            return (
              <div key={user.id}>
                <Avatar
                  onClick={() => {
                    setUser(user);
                    setSocket(socketInit({ user_id, token }));
                  }}
                >
                  {user.firstname[0]}
                </Avatar>{" "}
                {user.firstname} {user.lastname}
              </div>
            );
          })}
      </div>
      {isConnected ? (
        <Messages
          socket={socket}
          user_id={user_id}
          setSocket={setSocket}
          token={token}
          admin={true}
          user={user}
        />
      ) : (
        <div>wlecomeee</div>
      )}
    </div>
  );
};

export default AdminMessage;
