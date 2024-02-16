import React from "react";

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    variant,
    icon,
    iconPos,
    size,
    href,
    hrefComponent,
    className,
    children,
    color,
    ...props
}) => {
    const buttonClassName = getStyleClass(
        variant as any,
        Boolean(icon),
        Boolean(href),
        size as any
    );
    return (
        <button
            className={`ui-button ${buttonClassName} ${className} ${color} ui-button-icon-${iconPos}`}
            {...props}
        >
            {icon ? (
                <>
                    <div className={`ui-button-icon_container ui-btn-icon`}>{icon}</div>
                    {children ? (
                        <div className="ui-button-text">{children}</div>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;

Button.defaultProps = {
    variant: "outline",
    size: "responsive",
    className: "",
    iconPos: "left",
    color: "transparent",
};

interface Props1 extends React.ButtonHTMLAttributes<any> {
    icon?: null;
    iconPos?: null;
}

interface GProps {
    variant?: Variant;
    href?: string;
    hrefComponent?: React.ReactNode;
    size?: Size;
    color?: "theme" | "theme2" | "transparent";
}

interface Props2 extends React.ButtonHTMLAttributes<any> {
    icon: React.ReactNode;
    iconPos?: IconPos;
}

type Size = number | "xs" | "sm" | "l" | "xl" | "responsive";

type Variant = "contained" | "outline" | "none";

type ButtonProps = (Props1 | Props2) & GProps;

type IconPos = "left" | "right" | "top" | "bottom";

function getStyleClass(
    variant: Variant,
    hasIcon: boolean,
    hasHref: boolean,
    size: Size
) {
    const className: string[] = ["ui-button-" + variant];
    if (typeof size === "string") className.push("ui-button-" + size);

    if (hasIcon) {
        className.push("ui-button-icon");
    }

    return className.join(" ");
}
