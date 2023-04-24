import React from "react";
import Button from "../button";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../logo";
// mui-components
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function Navbar() {
  // states
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // handle connect
  const _handleConnect = () => {
    alert("Connect wallet....");
  };

  // navlinks
  const navigate = useNavigate();
  const navLinks = [
    { url: "/", label: "L3 Bridge" },
    { url: "/data", label: "L3 Data" },
  ];

  return (
    <nav className="navbar shadow navbar-expand sticky-top app-navbar">
      <div className="container">
        {/* logo */}
        <Logo />
        {/* nav-links */}
        <ul className="navbar-nav me-auto d-none d-md-flex">
          {navLinks.length > 0 &&
            navLinks.map((link, key) => (
              <li className="nav-link" key={key}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "navlink isActive" : "navlink"
                  }
                  to={link.url}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
        </ul>
        {/* wallet */}
        <Button
          text="Connect wallet"
          styling="fancy"
          onClick={_handleConnect}
        />

        <IconButton
          color="inherit"
          aria-label="open drawer"
          className="d-block d-md-none"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor={"right"}
        ModalProps={{
          keepMounted: false, // Better open performance on mobile.
        }}
      >
        <div className="mb-4 p-3 text-center">
          <Logo />
        </div>
        {/* nav-links */}
        <ul className="navbar-nav">
          {navLinks.length > 0 &&
            navLinks.map((link, key) => (
              <ListItem key={key} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(link.url);
                    handleDrawerToggle();
                  }}
                  className="border-bottom-grey"
                  style={{ width: 210, borderBottom: "1px #d5d5d5" }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
        </ul>
      </Drawer>
    </nav>
  );
}

export default Navbar;
