import React from "react";
import Box from "./Box";
import Typography from "./Typography";

const IconBox: React.FC<Props> = ({ children, icon, title, className }) => {
    return (
        <Box className={`icon-box ${className}`}>
            {icon}
            <Typography variant="h4">{title}</Typography>
            <Typography variant="p">{children}</Typography>
        </Box>
    );
};

IconBox.defaultProps = {
    className: "",
};

interface Props {
    icon: React.ReactNode;
    children: React.ReactNode;
    title: string;
    className?: string;
}

export default IconBox;
