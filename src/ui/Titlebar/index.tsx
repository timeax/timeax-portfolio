import React from "react";
import Box from "../../components/Box";
import Typography from "../../components/Typography";

const Titlebar: React.FC<Props> = ({ variant, children, className, sub }) => {
    className += variant === "text" ? " ui-titlebar-small" : "";

    return (
        <Box className={`ui-titlebar ${className}`}>
            {sub ? (
                <Typography variant="p" className="sub-heading">
                    <hr className="line-dash" />
                    <span>{sub}</span>
                </Typography>
            ) : (
                ""
            )}
            <Typography variant="h2">{children}</Typography>
        </Box>
    );
};

interface Props {
    sub?: string;
    variant?: "main" | "text";
    children: React.ReactNode;
    className?: string;
}

Titlebar.defaultProps = {
    variant: "main",
    className: "",
    sub: "",
};

export default Titlebar;
