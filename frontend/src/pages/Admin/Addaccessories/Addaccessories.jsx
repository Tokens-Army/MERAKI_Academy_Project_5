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
    // const columns = [
    //   { id: "id", label: "Accessory id", minWidth: 20 },
    //   { id: "name", label: "Accessory Name", minWidth: 100 },
    //   {
    //     id: "description",
    //     label: "Accessory Desc.",
    //     minWidth: 170,
    //     align: "right",
    //     format: (value) => value.toLocaleString("en-US"),
    //   },
    //   {
    //     id: "img",
    //     label: "Accessory Img",
    //     minWidth: 170,
    //     align: "right",
    //     format: (value) => value.toLocaleString("en-US"),
    //   },
    //   {
    //     id: "Accessory price",
    //     label: "price",
    //     minWidth: 170,
    //     align: "right",
    //     format: (value) => value.toFixed(2),
    //   },
    // ];
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Accessory id</TableCell>
            <TableCell align="right">Accessory Name</TableCell>
            <TableCell align="right">Accessory Desc.</TableCell>
            <TableCell align="right">Accessory Img</TableCell>
            <TableCell align="right">Accessory price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Addaccessories;
