import React, { useState, useEffect } from "react";
import "./Mainadmincomponent.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../../service/redux/mainSlice";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { useNavigate } from "react-router";

function Deposits() {
  return (
    <React.Fragment>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 1st Oct, 2023
      </Typography>
      <div>
        <a href="http://localhost:5173/admin/ordersadmin">View balance</a>
      </div>
    </React.Fragment>
  );
}

const defaultTheme = createTheme();

function createData(time, amount) {
  return { time, amount };
}

const Mainadmincomponent = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.token);
  const [count, setCount] = useState("");
  const orders = useSelector((state) => state.main.orders);
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/orders/pendingorders/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((results) => {
        setCount(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/orders/")
      .then((results) => {
        dispatch(setOrders(results.data.orders));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function Orders() {
    return (
      <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User Id</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Schedule date</TableCell>
              <TableCell align="center">Employee id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.slice(-5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.created_at}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>{order.order_status}</TableCell>
                  {order.scheduled_time ? (
                    <TableCell>{order.scheduled_time}</TableCell>
                  ) : (
                    <TableCell>Not scheduled</TableCell>
                  )}
                  {order.employee_id ? (
                    <TableCell align="right">{`${order.employee_id}`}</TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className="addEmpolyeebtn"
                      onClick={() => {
                        navigate("/admin/employeesadmin");
                      }}
                    >
                      Add Employee
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Link
          color="primary"
          href="#"
          onClick={() => {
            navigate("/admin/ordersAdmin");
          }}
          sx={{ mt: 3 }}
        >
          See more orders
        </Link>
      </React.Fragment>
    );
  }
  function Chart() {
    const theme = useTheme();
    return (
      <React.Fragment>
        <ResponsiveContainer>
          <LineChart
            data={
              orders &&
              orders.map((order) => {
                return createData(
                  order.id,
                  new Date(order.created_at).getMinutes()
                );
              })
            }
            margin={{
              top: 16,
              right: 16,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                position="middle"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                Orders
              </Label>
            </XAxis>
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                Minutes
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
  return (
    <div>
      <div className="countCards">
        <div className="acceptedOrdersCount">
          <img
            className="usersCountImg"
            src="https://static.prod01.ue1.p.pcomm.net/blackbaud/user_content/photos/000/006/6783/a6132a5cd55abcae190bc82567ca8a47-original-users.png"
          />
          <img
            className="fireImg"
            src="https://media.istockphoto.com/id/1323529010/vector/fire-vector-isolated.jpg?s=612x612&w=0&k=20&c=ta6bKkXZDuqy2H3tRhR79sSl_-fdGhKyoenbbjEr3l0="
          />
          {count && <div className="allCount">{count.usersAcouts.length}</div>}
        </div>
        <div>
          <img
            className="pendingOrderImg"
            src="https://c.mql5.com/31/28/pending-order-placer-logo-200x200-6150.png"
          />
          <br />
          <img
            className="fireImg"
            src="https://media.istockphoto.com/id/1323529010/vector/fire-vector-isolated.jpg?s=612x612&w=0&k=20&c=ta6bKkXZDuqy2H3tRhR79sSl_-fdGhKyoenbbjEr3l0="
          />
          {count && (
            <div className="allCount">{count.pendingOrders.length}</div>
          )}
        </div>
        <div>
          <img
            className="acceptedOrdersImg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrtGGZ9vU5VYVNiHM9Cle6cUT9KBRvHK7quQ&usqp=CAU"
          />
          <br />
          <img
            className="fireImg"
            src="https://media.istockphoto.com/id/1323529010/vector/fire-vector-isolated.jpg?s=612x612&w=0&k=20&c=ta6bKkXZDuqy2H3tRhR79sSl_-fdGhKyoenbbjEr3l0="
          />
          {count && (
            <div className="allCount">{count.acceptedOrders.length}</div>
          )}
        </div>
      </div>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Deposits />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};
export default Mainadmincomponent;
