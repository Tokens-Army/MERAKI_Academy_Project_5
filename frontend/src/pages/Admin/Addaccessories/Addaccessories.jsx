import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccessory,
  setAccessories,
  addAccessory,
  updateAccessory,
} from "../../../service/redux/accessorySlice";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import Loader from "../../../assets/Animations/Loader.jsX";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function myFunction() {
  alert("Kindly fill all the blanks!");
}
function addedSuccessfuly() {
  alert("Accessory added successfully");
}
function updatedSuccessfuly() {
  alert("Accessory updated successfully");
}
function deletedSuccessfuly() {
  alert("Accessory deleted successfully");
}

const AddAccessories = () => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState(0);
  const [accessoryName, setAccessoryName] = useState("");
  const [accessoryDesc, setAccessoryDesc] = useState("");
  const [accessoryImg, setAccessoryImg] = useState("");
  const [accessoryPrice, setAccessoryPrice] = useState(0);

  const handleDeleteClose = () => setDeleteOpen(false);

  const token = useSelector((state) => {
    return state.login.token;
  });

  const dispatch = useDispatch();

  const accessories = useSelector((state) => {
    return state.accessories.accessories;
  });

  const getAllAccessories = () => {
    axios
      .get("http://localhost:5000/accessories")
      .then((result) => {
        dispatch(setAccessories(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllAccessories();
  }, []);

  return (
    <>
      {accessories.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: "2vw" }}>Accessory id</TableCell>
                <TableCell align="left" style={{ minWidth: "2vw" }}>
                  Accessory Name
                </TableCell>
                <TableCell align="left">Accessory Desc.</TableCell>
                <TableCell align="left">Accessory Img</TableCell>
                <TableCell align="left">Accessory price</TableCell>
                <TableCell align="left">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Add Accessory</TableCell>
                <TableCell>
                  <Input
                    placeholder="Accessory Name"
                    onChange={(e) => setAccessoryName(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Accessory Desc."
                    onChange={(e) => setAccessoryDesc(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Accessory Img"
                    onChange={(e) => setAccessoryImg(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Accessory price"
                    onChange={(e) => setAccessoryPrice(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      if (
                        !accessoryName ||
                        !accessoryImg ||
                        !accessoryDesc ||
                        !accessoryPrice
                      ) {
                        myFunction();
                      } else {
                        axios
                          .post(
                            "http://localhost:5000/accessories",
                            {
                              name: accessoryName,
                              img: accessoryImg,
                              description: accessoryDesc,
                              price: accessoryPrice,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          .then((results) => {
                            dispatch(addAccessory(results.data.result[0]));
                            addedSuccessfuly();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                      setAccessoryName("");
                      setAccessoryDesc("");
                      setAccessoryImg("");
                      setAccessoryPrice(0);
                    }}
                  >
                    Add New
                  </Button>
                </TableCell>
              </TableRow>
              {accessories.map((accessory) => (
                <TableRow
                  key={accessory.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {accessory.id}
                  </TableCell>
                  <TableCell align="left">{accessory.name}</TableCell>
                  <TableCell align="left">
                    <details>
                      <summary>Description</summary>
                      <p>{accessory.description}</p>
                    </details>
                  </TableCell>
                  <TableCell align="left">
                    <details>
                      <summary>Link</summary>
                      <p>{accessory.img}</p>
                    </details>
                  </TableCell>
                  <TableCell align="left">{accessory.price} JD</TableCell>
                  <TableCell align="left">
                    <div>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setId(accessory.id);
                          setAccessoryName(accessory.name);
                          setAccessoryDesc(accessory.description);
                          setAccessoryImg(accessory.img);
                          setAccessoryPrice(accessory.price);
                        }}
                      >
                        <EditIcon style={{ color: "blue" }} />
                      </Button>
                      <Button
                        onClick={() => {
                          setDeleteOpen(true);
                          setId(accessory.id);
                        }}
                      >
                        <DeleteForeverIcon style={{ color: "red" }} />
                      </Button>
                      {id === accessory.id && (
                        <Modal
                          open={open}
                          onClose={() => setOpen(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Update accessory
                              <input
                                className="updateAccessoryInputs"
                                placeholder="New name"
                                type="text"
                                onChange={(e) =>
                                  setAccessoryName(e.target.value)
                                }
                              />
                              <input
                                className="updateAccessoryInputs"
                                placeholder="New img"
                                type="text"
                                onChange={(e) =>
                                  setAccessoryImg(e.target.value)
                                }
                              />
                              <input
                                className="updateAccessoryInputs"
                                placeholder="New description"
                                type="text"
                                onChange={(e) =>
                                  setAccessoryDesc(e.target.value)
                                }
                              />
                              <input
                                className="updateAccessoryInputs"
                                placeholder="New price"
                                type="number"
                                onChange={(e) =>
                                  setAccessoryPrice(e.target.value)
                                }
                              />
                              <Button
                                onClick={() => {
                                  axios
                                    .put(
                                      `http://localhost:5000/accessories/${id}`,
                                      {
                                        name: accessoryName,
                                        img: accessoryImg,
                                        description: accessoryDesc,
                                        price: accessoryPrice,
                                      },
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    )
                                    .then((results) => {
                                      dispatch(
                                        updateAccessory(
                                          results.data.accessories[0]
                                        )
                                      );
                                      updatedSuccessfuly();
                                      setOpen(false);
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              >
                                Update
                              </Button>
                            </Typography>
                          </Box>
                        </Modal>
                      )}
                      {id === accessory.id && (
                        <Modal
                          open={deleteOpen}
                          onClose={handleDeleteClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Are you sure you want to delete this accessory?
                            </Typography>
                            <Button
                              onClick={() => {
                                axios
                                  .delete(
                                    `http://localhost:5000/accessories/${id}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  )
                                  .then((result) => {
                                    dispatch(deleteAccessory(id));
                                    deletedSuccessfuly();
                                    setDeleteOpen(false);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
                            >
                              Yes
                            </Button>
                            <Button onClick={handleDeleteClose}>No</Button>
                          </Box>
                        </Modal>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AddAccessories;
