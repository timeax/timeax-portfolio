import React from "react";
import BoxBase from "../Box/BoxBase";

const Typography: React.FC<React.PropsWithChildren<Props>> = ({
    size,
    variant,
    children,
    className,
    weight,
    ...props
}) => {
    let styleClass = getStyleClass(variant as any, size) + " ui-typography " + className;
    //---------
    return (
        <BoxBase {...props} tag={variant} className={styleClass.trim()}>
            {children}
        </BoxBase>
    );
};

function getStyleClass(variant: Variant, size: Props["size"]) {
    let className: string[] = [size as string];
    switch (variant) {
        case "h1":
            className.push("ui-banner-title");
            break;
        case "h2":
            className.push("ui-title");
            break;
        case "h3":
            className.push("ui-subtitle");
            break;
        case "h4":
            className.push("ui-heading");
            break;
        case "h5":
            className.push("ui-sub_heading");
            break;
        case "h6":
            className.push("ui-strong");
            break;
        case "label":
            className.push("ui-label");
            break;
        case "small":
            className.push("ui-small_text");
            break;
        case "p":
            className.push("ui-paragraph");
            break;
        case "span":
            className.push("ui-text");
            break;
    }
    return className.join(" ");
}

export default Typography;

Typography.defaultProps = {
    variant: "span",
    weight: "normal",
    size: "",
    className: "",
};

interface Props extends React.HTMLAttributes<any> {
    variant?: Variant;
    weight?: number | string;
    size?: `font-${number}` | '';
    className?: string;
}

type Variant =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "small"
    | "p"
    | "span";
