import React from "react";

function BoxBase<T extends string>({ tag, children, ...props }: Props<T>) {
    const CustomTag = `${tag}` as unknown as React.FC<React.PropsWithChildren>;

    if (children) return <CustomTag {...props}>{children}</CustomTag>;
    return <CustomTag {...props} />;
}

BoxBase.defaultProps = {
    tag: "div",
};

interface Props<T extends string>
    extends React.PropsWithChildren,
        React.AllHTMLAttributes<T> {
    tag?: T;
}

export default BoxBase;
