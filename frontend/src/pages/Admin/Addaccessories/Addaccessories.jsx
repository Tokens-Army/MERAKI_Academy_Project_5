import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessories } from "../../../service/redux/accessorySlice";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const Addaccessories = () => {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Accessory id</TableCell>
            <TableCell align="left">Accessory Name</TableCell>
            <TableCell align="left">Accessory Desc.</TableCell>
            <TableCell align="left">Accessory Img</TableCell>
            <TableCell align="left">Accessory price</TableCell>
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
              <TableCell align="left">{accessory.description}</TableCell>
              <TableCell align="left">{accessory.img}</TableCell>
              <TableCell align="left">{accessory.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination />
    </TableContainer>
  );
};

export default Addaccessories;
