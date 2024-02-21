import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

import HelpOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import HelpIcon from "@mui/icons-material/Help";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditIcon from '@mui/icons-material/Edit';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PersonIcon from '@mui/icons-material/Person';
import profile from '../../assets/profile.png';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';

const Item = ({ title, to, clickedIcon, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.primary[900],
      }}
      onClick={() => setSelected(title)}
      // icon={icon}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        // marginBottom="5px"
      >
        <Box>
          {selected === title ? clickedIcon : icon}
        </Box>
        <Box>
          <Typography
            variant="h6"
          >
            {title}
          </Typography>
        </Box>

      <Link to={to} />
      </Box>
      
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("/");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          display: "flex",
          justifyContent: "center !important",
        },
        "& .pro-inner-item": {
          padding: "5px 5px 5px 5px !important",
        },
        "& .pro-inner-item:hover": {
          backgroundColor: "#d3d3d3",
          borderRadius: "10px",
          color: `${colors.primary[900]} !important`,
        },
        "& .pro-menu-item.active": {
          // color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar width="75px">
        <Menu iconShape="square">

          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Item
              title="Home"
              to="/"
              clickedIcon={<HomeIcon sx={{ fontSize: 30 }}/>}
              icon={<HomeOutlinedIcon sx={{ fontSize: 30 }}/>}
              selected={selected}
              setSelected={setSelected}
          />
            <Item
              title="Browse"
              to="/browse"
              clickedIcon={<ChromeReaderModeIcon sx={{ fontSize: 30 }}/>}
              icon={<ChromeReaderModeOutlinedIcon sx={{ fontSize: 30 }}/>}
              // icon={<Home}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Read"
              to="/browse/read"
              icon={<ChromereadermodeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Versions"
              to="/browse/versions"
              icon={<AutorenewOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="History"
              to="/browse/history"
              icon={<HistoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Edit"
              to="/edit"
              clickedIcon={<EditIcon sx={{ fontSize: 30 }}/>}
              icon={<EditOutlinedIcon sx={{ fontSize: 30 }}/>}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Create"
              to="/edit/create"
              icon={<AddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update"
              to="/edit/update"
              icon={<EditOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Delete"
              to="/edit/delete"
              icon={<RemoveOutlinedIcon />}Item
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Requests"
              to="/requests"
              clickedIcon={<ViewListIcon sx={{ fontSize: 30 }}/>}
              icon={<ViewListOutlinedIcon sx={{ fontSize: 30 }}/>}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Manage"
              to="/requests/manage"
              icon={<FormatListNumberedOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dashboard"
              to="/dashboard"
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="PCT"
              to="/dashboard/pct"
              clickedIcon={<PersonIcon sx={{ fontSize: 30 }}/>}
              icon={<PersonOutlinedIcon sx={{ fontSize: 30 }}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Admin"
              to="/dashboard/admin"
              clickedIcon={<SupervisorAccountIcon sx={{ fontSize: 30 }}/>}
              icon={<SupervisorAccountOutlinedIcon sx={{ fontSize: 30 }}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Help"
              to="/extra"
              clickedIcon={<HelpIcon sx={{ fontSize: 30 }}/>}
              icon={<HelpOutlinedIcon sx={{ fontSize: 30 }}/>}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="FAQ"
              to="/extra/faq"
              icon={<HelpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="QRG"
              to="/extra/qrg"
              icon={<QrCode2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Discussions"
              to="/extra/discussions"
              icon={<Diversity3OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;