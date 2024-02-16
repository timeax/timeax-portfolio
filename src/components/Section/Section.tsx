import React from "react";
import Box from "../Box";

const Section: React.FC<React.PropsWithChildren<React.HTMLAttributes<any>>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <Box
            className={`ui-section ${className}`}
            {...props}
            variant="contained"
        >
            {children}
        </Box>
    );
};

export const Line = () => {
    return (
        <div className="classic-line">
            <span></span>
        </div>
    );
};

export const Skewed = () => {
    return (
        <div className="skewed">
            <span></span>
        </div>
    );
};

export default Section;

Section.defaultProps = {
    className: "",
};
