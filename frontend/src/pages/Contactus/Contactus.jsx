import React, { useEffect, useState } from "react";
import socketInit from "../../service/api/socket_server";

const ContactUs = () => {
  const [user_id, setUser_id] = useState("");
  const [token, setToken] = useState("");
  const [socket, setSocket] = useState(null);

  return (
    <div>
      <h1>Socket Io</h1>
      <input type="text" placeholder="user_id" />
      <input type="text" placeholder="user_id" />
      <button onClick={() => {}}>connect</button>
    </div>
  );
};

export default ContactUs;
