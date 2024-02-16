import React from "react";
import Box from "../../components/Box";
import Typography from "../../components/Typography";

const Stat: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    count,
    className,
    ...props
}) => {
    return (
        <Box {...props} className={`d-flex align-items-center ${className}`}>
            <Typography style={{ lineHeight: 0, fontFamily: 'Poppins SemiBold', fontWeight: 500}} className="color-theme pe-2 m-0" variant="h1">{count}</Typography>
            <Typography className="caps m-0 color-p" variant="small">{children}</Typography>
        </Box>
    );
};

interface Props extends React.HTMLAttributes<any> {
    count: number;
}

export default Stat;
