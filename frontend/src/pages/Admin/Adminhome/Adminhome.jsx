import React,{useState,useEffect} from "react";
import "./Adminhome.css"
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;



const Adminhome = () => {
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false);
    // const { window } = props;
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const rightBar =[{name:"Add Admins",nav:"addadmins"},{name:"Delete Admins",nav:"deleteadmins"},{name:"Add Services",nav:"addservices"},{name:"Update Services",nav:"updateservices"},{name:"Delete Services",nav:"deleteservices"},{name:"Add Accessories",nav:"addaccessories"},{name:"Update Accessories",nav:"updateaccessories"},{name:"Delete Accessories",nav:"deleteaccessories"}]
    const HelpRightBar = [{name:"About",nav:"/about"},{name:"Contact Us",nav:"/contact-us"}]
    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <List>
          {rightBar.map((text, index) => (
            <ListItem key={text.name} disablePadding onClick={()=>{navigate(text.nav)}}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {HelpRightBar.map((text, index) => (
            <ListItem key={text.name} disablePadding onClick={()=>{navigate(text.nav)}}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    );
    

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
            <Outlet/>
        </Box>
      </Box>
    );
  return <div className="adminhomepage"> 

    <div className="adminleftbar">

    <button className="adminbuttons" onClick={()=>{
        navigate("addadmins")
    }}>Add Admins</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("deleteadmins")
    }}>Delete Admins</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("addservices")
    }}>Add Services</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("updateservices")
    }}>Update Services</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("deleteservices")
    }}>Delete Services</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("addaccessories")
    }}>Add Accessories</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("updateaccessories")
    }}>Update Accessories</button>
    <button className="adminbuttons" onClick={()=>{
        navigate("deleteaccessories")
    }}>Delete Accessories</button>
    </div>
    <div className="adminrightbar">
    <Outlet/>
    </div>
      
  </div>;
};

export default Adminhome;
