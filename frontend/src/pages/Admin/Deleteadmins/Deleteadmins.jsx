import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Await, useLoaderData } from "react-router-dom";
import axios from "axios";
import "./Deleteadmins.css";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../../../service/redux/serviceSlice";
import { setAdmins, deleteAdmin } from "../../../service/redux/adminSlice";
const Deleteadmins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true)
  const admins = useSelector((state) => state.admins.admins);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((results) => {
        dispatch(setAdmins(results.data.admins));
      })
      .catch((err) => {
        <>someThing went wrong kindly try again later</>;
        console.log(err);
      });
  }, []);
  return (
    <div>
      Deleteadmins
      <button
        onClick={() => {
          navigate("/admin");
        }}
      >
        Back to home page
      </button>
      <div className="adminAccountCardAll">
        {admins &&
          admins.map((user) => {
            return (
              <div key={user.id} className="adminaccountinfo">
                <div>{user.firstname}</div>
                <div>{user.lastname}</div>
                <div>{user.email}</div>
                <div>Admin</div>
                <div
                  className="deleteadminaccountbutton"
                  onClick={() => {
                    axios
                      .put(`http://localhost:5000/users/delete/${user.id}`)
                      .then((result) => {
                        dispatch(deleteAdmin(user.id));
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  ❌
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Deleteadmins;
