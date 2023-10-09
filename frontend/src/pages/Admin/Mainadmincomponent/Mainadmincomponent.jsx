import React,{useState,useEffect} from 'react'
import "./Mainadmincomponent.css"
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { setMain, setOrders } from '../../../service/redux/mainSlice'
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router'

function preventDefault(event) {
    event.preventDefault();
}


function preventDefaults(event) {
    event.preventDefaults();
}
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
          <a href='http://localhost:5173/admin/ordersadmin'>
            View balance
          </a>
        </div>
      </React.Fragment>
    );
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
    },
}),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function createData(time, amount) {
    return { time, amount };
}


const Mainadmincomponent = () => {
    const navigate = useNavigate()
    const token = useSelector((state)=>state.login.token)
    const count = useSelector((state)=>state.main.data)
    const orders = useSelector((state)=>state.main.orders)
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get("http://localhost:5000/orders//pendingorders/count",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((results)=>{
            dispatch(setMain(results.data))
            
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])   
    useEffect(()=>{
      axios.get("http://localhost:5000/orders/last/5orders")
      .then((results)=>{
          dispatch(setOrders(results.data.orders))
      })
      .catch((err)=>{
        console.log(err);
      })
    },[])
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
                  <TableCell align="right">Employee id</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders&&orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.created_at}</TableCell>
                    <TableCell>{order.user_id}</TableCell>
                    <TableCell>{order.order_status}</TableCell>
                     {order.scheduled_time?<TableCell>{order.scheduled_time}</TableCell>:<TableCell>Not scheduled</TableCell>}
                    {order.employee_id?<TableCell align="right">{`${order.employee_id}`}</TableCell>:<TableCell align="right" className='addEmpolyeebtn' onClick={()=>{
                      navigate("/admin/employeesadmin")
                    }} >Add Employee</TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={()=>{
                navigate("/admin/ordersAdmin")
            }} sx={{ mt: 3 }}>
              See more orders
            </Link>
          </React.Fragment>
        );
      }
      function Chart() {
        const theme = useTheme();
        const data = [
            createData(0,0),
            createData(1, 300),
            createData(2, 600),
            createData(3, 800),
            createData(4, 1500),
            createData(5, 2000),
            createData(6, 2400),
            createData(7, 2400),
            createData(8, undefined),
        ];
        return (
          <React.Fragment>
            <ResponsiveContainer>
              <LineChart
              
                data={orders&&orders.map((order)=>{
                    
                    return createData(order.id,(new Date(order.created_at).getDate()))
                })}
                margin={{
                    top: 16,
                  right: 16,
                  // bottom: 10,
                  left: 24,
                }}
              >
                <XAxis
                  dataKey="time"
                  stroke={theme.palette.text.secondary}
                  style={theme.typography.body2}
                  // className='xaxis'
                  >
                    <Label
                    position="middle"
                    style={{
                      textAnchor: 'middle',
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
                      textAnchor: 'middle',
                      fill: theme.palette.text.primary,
                      ...theme.typography.body1,
                    }}
                  >
                    Days
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
        <div className='countCards'>
         <div className='acceptedOrdersCount'>
            <img className='usersCountImg' src='https://static.prod01.ue1.p.pcomm.net/blackbaud/user_content/photos/000/006/6783/a6132a5cd55abcae190bc82567ca8a47-original-users.png'/>
            <img className='fireImg' src='https://media.istockphoto.com/id/1323529010/vector/fire-vector-isolated.jpg?s=612x612&w=0&k=20&c=ta6bKkXZDuqy2H3tRhR79sSl_-fdGhKyoenbbjEr3l0='/>
            {/* {count&&<div className='allCount'>{count?.usersCount[0]?.count}</div>} */}
            </div>
            <div>
            <img className='pendingOrderImg' src='https://c.mql5.com/31/28/pending-order-placer-logo-200x200-6150.png'/><br/>
            <img className='fireImg' src='https://media.istockphoto.com/id/1323529010/vector/fire-vector-isolated.jpg?s=612x612&w=0&k=20&c=ta6bKkXZDuqy2H3tRhR79sSl_-fdGhKyoenbbjEr3l0='/>
        {/* {count&&<div className='allCount'>{count?.pendingOrdersCount[0]?.count}</div>} */}
            </div>
            <div>
            <img className='acceptedOrdersImg' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrtGGZ9vU5VYVNiHM9Cle6cUT9KBRvHK7quQ&usqp=CAU'/><br/>
            <img className='fireImg' src='https://media.istockphoto.com/id/1323529010/vector/fire-vector-isolated.jpg?s=612x612&w=0&k=20&c=ta6bKkXZDuqy2H3tRhR79sSl_-fdGhKyoenbbjEr3l0='/>
         {/* {count&&<div className='allCount'>{count?.acceptedOrdersCount[0]?.count}</div>} */}
            </div>
        </div>
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </div>
  )
}
export default Mainadmincomponent