import React from "react";
import Box from "../../components/Box";
import Typography from "../../components/Typography";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import Button from "../../components/Button";

const Navbar: React.FC<{ routes: any[] }> = ({routes}) => {
    return (
        <Box tag="header">
            <Box tag="nav" className="navbar" variant="contained">
                <Typography className="navbar-brand">
                    <Link to={"/"}></Link>
                </Typography>
                <Box className="navbar-nav" tag="ul">
                    {routes.map((item) => {
                        return <NavItem key={item.name} route={item} />;
                    })}
                </Box>
                <Box>
                    <Button variant="contained" color="theme">
                        Hire me
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Navbar;
