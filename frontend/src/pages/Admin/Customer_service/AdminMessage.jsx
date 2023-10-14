import React, { useEffect, useState } from "react";
import "./AdminMessages.css";
import socketInit from "../../../service/api/socket_server";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { useSelector } from "react-redux";
import { ListItemButton } from "@mui/material";
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
    <div
      className="customer-service-page"
      style={{
        display: "flex",
        gap: "3vw",
      }}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <div style={{ alignSelf: "center" }}>
          <ListItem>
            <ListItemButton>
              <h3>All Registerd User</h3>
            </ListItemButton>
          </ListItem>
          {allUsers &&
            allUsers.map((user) => {
              return (
                <div key={user.id}>
                  <ListItem
                    key={user.id}
                    onClick={() => {
                      setUser(user);
                      setSocket(socketInit({ user_id, token }));
                    }}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#03a9f4" }}>
                          {user.firstname[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstname} ${user.lastname}`}
                        style={{ color: "blue" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              );
            })}
        </div>
      </List>
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
        <div>
          <img
            src="https://t4.ftcdn.net/jpg/03/65/60/33/360_F_365603381_jl2eSsk2nsz7hFbGpfZSWwfXLxO1Unp4.jpg"
            width="850vw"
          />
        </div>
      )}
    </div>
  );
};

export default AdminMessage;
