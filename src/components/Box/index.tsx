import React from "react";
import BoxBase from "./BoxBase";

const Box: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    variant,
    ...props
}) => {
    return (
        <BoxBase {...props}>
            {variant === "contained" ? (
                <div className="container">{children}</div>
            ) : (
                children
            )}
        </BoxBase>
    );
};

export default Box;

Box.defaultProps = {
    tag: "div",
};

interface Props extends React.HTMLAttributes<any> {
    variant?: Variant;
    tag?: string;
}

type Variant = "contained" | "normal";
