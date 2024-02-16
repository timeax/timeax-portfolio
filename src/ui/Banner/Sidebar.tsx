import React from "react";
import Box from "../../components/Box";
import Button from "../../components/Button";
import { BsFacebook as Facebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoMdMail as Mail } from "react-icons/io";
import Typography from "../../components/Typography";
import { BiLogoFigma } from "react-icons/bi";
const Sidebar: React.FC = () => {
    return (
        <Box className="header-sidebar">
            <Box className="d-flex flex-column align-items-center h-100">
                <Typography variant="p" className="m-0 app-logo mb-auto">
                    <BiLogoFigma />
                </Typography>
                <span className="sidebar-line"></span>
                <Box className="d-flex align-items-center justify-content-center flex-column m-auto w-100">
                    <Button
                        variant="none"
                        className="mb-5"
                        icon={<Facebook />}
                    />
                    <Button
                        variant="none"
                        className="mb-5"
                        icon={<BsTwitter />}
                    />
                    <Button variant="none" className="mb-5" icon={<Mail />} />
                    <Button
                        variant="none"
                        className="mb-5"
                        icon={<BsInstagram />}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
