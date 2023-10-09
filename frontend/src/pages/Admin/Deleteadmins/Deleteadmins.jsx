
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setAdmins, deleteAdmin } from "../../../service/redux/adminSlice";

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
  const admins = useSelector((state) => state.admins.admins);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("")
  const handleClose = () => setOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);
  const dispatch = useDispatch();
  
  const token = useSelector((state) =>state.login.token);
  const getAllusers = () => {
    axios
      .get("http://localhost:5000/users")
      .then((result) => {
        console.log(result.data.admins);
        dispatch(setAdmins(result.data.admins));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: "2vw" }}>Admin id</TableCell>
              <TableCell align="left" style={{ minWidth: "2vw" }}>
                First Name
              </TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {admins.map((admin) => (
              <TableRow
                key={admin.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {admin.id}
                </TableCell>
                <TableCell align="left">{admin.firstname}</TableCell>
                <TableCell align="left">
                 {admin.lastname}
                </TableCell>
                <TableCell align="left">
                  {admin.email}
                </TableCell>
                <TableCell align="left">Admin</TableCell>
                <TableCell align="left">
                  <div>                    
                    <Button
                      onClick={() => {
                        setDeleteOpen(true);
                        setId(admin.id);
                      }}
                    >
                      <DeleteForeverIcon style={{ color: "red" }} />
                    </Button>
                    {id===admin.id&&<Modal
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
                          Are you sure you want to delete this admin?
                        </Typography>
                        <Button
                          onClick={() => {
                            axios
                              .put(
                                `http://localhost:5000/users/delete/${admin.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then((result) => {
                                dispatch(deleteAdmin(id));
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
                    </Modal>}
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



