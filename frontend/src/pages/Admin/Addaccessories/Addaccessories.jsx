import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccessory,
  setAccessories,
} from "../../../service/redux/accessorySlice";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const Addaccessories = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = useSelector((state) => {
    return state.login.token;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessories = useSelector((state) => {
    return state.accessories.accessories;
  });
  const getAllAccessories = () => {
    axios
      .get("http://localhost:5000/accessories")
      .then((result) => {
        console.log(result.data.result);
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
                    <Button onClick={handleOpen}>
                      <DeleteForeverIcon style={{ color: "red" }} />
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Are you sure to delete this accessory?
                        </Typography>
                        <Button
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:5000/accessories/${accessory.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then((result) => {
                                dispatch(deleteAccessory(accessory.id));
                                setOpen(false);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          Yes
                        </Button>
                        <Button onClick={handleClose}>No</Button>
                      </Box>
                    </Modal>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination /> */}
      </TableContainer>
    </>
  );
};

export default Addaccessories;
