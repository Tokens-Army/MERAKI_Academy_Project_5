import React, { useEffect, useState } from "react";
import socketInit from "../../service/api/socket_server";
import Messages from "./Messages.jsx";
import { useSelector, useDispatch } from "react-redux";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
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

    <div>
      {!isConnected && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15vh",
          }}
        >
          <div className="container">
            <div className="content">
              <div className="left-side">
                <div className="address details">
                  <i className="fas fa-map-marker-alt">
                    <LocationOnOutlinedIcon />
                  </i>
                  <div className="topic">Address</div>
                  <div className="text-one">Surkhet, NP12</div>
                  <div className="text-two">Birendranagar 06</div>
                </div>
                <div className="phone details">
                  <i className="fas fa-phone-alt"></i>
                  <div className="topic">Phone</div>
                  <div className="text-one">+96278754895</div>
                  <div className="text-two">+96278754895</div>
                </div>
                <div className="email details">
                  <i className="fas fa-envelope"></i>
                  <div className="topic">Email</div>
                  <div className="text-one">codinglab@gmail.com</div>
                  <div className="text-two">info.codinglab@gmail.com</div>
                </div>
              </div>
              <div className="right-side">
                <div className="topic-text">Send us a message</div>
                <p>
                  If you have any work from me or any types of quries related to
                  my tutorial, you can send me message from here. It's my
                  pleasure to help you.
                </p>
                <button
                  onClick={() => {
                    setSocket(socketInit({ user_id, token }));
                  }}
                >
                  Talk with Customer Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    <div style={{minHeight: "80%"}}>
      <button
        onClick={() => {
          setSocket(socketInit({ user_id, token }));
        }}
      >
        Talk with Customer Service
      </button>
      {isConnected && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Messages
            socket={socket}
            user_id={user_id}
            setSocket={setSocket}
            token={token}
            admin={false}
            user={null}
          />
        </div>
      )}
    </div>
    </div>
  );
};

export default ContactUs;
