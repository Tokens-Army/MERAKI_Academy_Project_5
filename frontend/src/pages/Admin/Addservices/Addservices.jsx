import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  setServices,
  addServices,
  updateServices,
} from "../../../service/redux/serviceSlice";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";

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

const AddServices = () => {
  const [id, setId] = useState(0);
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceImg, setServiceImg] = useState("");
  const [servicePrice, setServicePrice] = useState(0);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);

  const token = useSelector((state) => {
    return state.login.token;
  });

  const dispatch = useDispatch();

  const services = useSelector((state) => {
    return state.services.services;
  });

  const getAllservices = () => {
    axios
      .get("http://localhost:5000/services")
      .then((result) => {
        dispatch(setServices(result.data.services));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllservices();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: "2vw" }}>Services id</TableCell>
              <TableCell align="left" style={{ minWidth: "2vw" }}>
                Service Name
              </TableCell>
              <TableCell align="left">Service Desc.</TableCell>
              <TableCell align="left">Service Img</TableCell>
              <TableCell align="left">Service price</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>Add Service</TableCell>
              <TableCell>
                <Input
                  placeholder="Service Name"
                  onChange={(e) => setServiceName(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="Service Desc."
                  onChange={(e) => setServiceDesc(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="Service Img"
                  onChange={(e) => setServiceImg(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="Service price"
                  onChange={(e) => setServicePrice(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    axios
                      .post(
                        "http://localhost:5000/services",
                        {
                          name: serviceName,
                          img: serviceImg,
                          description: serviceDesc,
                          price: servicePrice,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((results) => {
                        dispatch(addServices(results.data.service[0]));
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    setServiceName("");
                    setServiceDesc("");
                    setServiceImg("");
                    setServicePrice(0);
                  }}
                >
                  Add New
                </Button>
              </TableCell>
            </TableRow>
            {services.map((service) => (
              <TableRow
                key={service.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {service.id}
                </TableCell>
                <TableCell align="left">{service.name}</TableCell>
                <TableCell align="left">
                  <details>
                    <summary>Description</summary>
                    <p>{service.description}</p>
                  </details>
                </TableCell>
                <TableCell align="left">
                  <details>
                    <summary>Link</summary>
                    <p>{service.img}</p>
                  </details>
                </TableCell>
                <TableCell align="left">{service.price} JD</TableCell>
                <TableCell align="left">
                  <div>
                    <Button
                      onClick={() => {
                        setOpen(true);
                        setId(service.id);
                        setServiceName(service.name);
                        setServiceDesc(service.description);
                        setServiceImg(service.img);
                        setServicePrice(service.price);
                      }}
                    >
                      <EditIcon style={{ color: "blue" }} />
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteOpen(true);
                        setId(service.id);
                      }}
                    >
                      <DeleteForeverIcon style={{ color: "red" }} />
                    </Button>
                    {id === service.id && (
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
                            Update {serviceName} accessory
                            <input
                              className="updateAccessoryInputs"
                              placeholder="New name"
                              type="text"
                              onChange={(e) => setServiceName(e.target.value)}
                            />
                            <input
                              className="updateAccessoryInputs"
                              placeholder="New img"
                              type="text"
                              onChange={(e) => setServiceImg(e.target.value)}
                            />
                            <input
                              className="updateAccessoryInputs"
                              placeholder="New description"
                              type="text"
                              onChange={(e) => setServiceDesc(e.target.value)}
                            />
                            <input
                              className="updateAccessoryInputs"
                              placeholder="New price"
                              type="number"
                              onChange={(e) => setServicePrice(e.target.value)}
                            />
                            <Button
                              onClick={() => {
                                axios
                                  .put(
                                    `http://localhost:5000/services/${id}`,
                                    {
                                      name: serviceName,
                                      img: serviceImg,
                                      description: serviceDesc,
                                      price: servicePrice,
                                    },
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  )
                                  .then((results) => {
                                    dispatch(
                                      updateServices(results.data.result)
                                    );
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
                    {id === service.id && (
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
                            Are you sure you want to delete this service?
                          </Typography>
                          <Button
                            onClick={() => {
                              axios
                                .delete(
                                  `http://localhost:5000/services/${id}`,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                )
                                .then((result) => {
                                  dispatch(deleteService(id));
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
    </>
  );
};

export default AddServices;
