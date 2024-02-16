import React from "react";
import Box from "../../components/Box";
import Sidebar from "../Banner/Sidebar";
import World from "../Banner/World";
import Navbar from "./Navbar";
import Banner from "../Banner";

const Header: React.FC<Props> = ({ routes }) => {
    return (
        <Box className="landing-section">
            <Sidebar />
            <World />
            <Navbar routes={routes} />
            <Banner />
        </Box>
    );
};

interface Props {
    routes: any[];
}

export default Header;
