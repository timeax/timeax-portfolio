import React from "react";
import Box from "../../components/Box";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import { BsChevronLeft as Left, BsChevronRight as Right } from "react-icons/bs";

const Carousel: React.FC<Props> = ({ header, content, textLimit }) => {
    //-0--get text from limit
    const getText = () => {
        let build = "";
        for (let i = 0; i < (textLimit || 0); i++) {
            build += content.charAt(i);
        }

        return build;
    };
    return (
        <Box className="mb-4">
            <Box className="d-flex ui-carousel align-items-center">
                <Box className="content">
                    <Typography variant="p">
                        <span>{header} </span>- {getText()}
                        ... <a href="/">Read more</a>
                    </Typography>
                </Box>
                <Box className="d-flex my-auto">
                    <Button
                        color="theme"
                        className="me-4"
                        variant="contained"
                        icon={<Left />}
                    ></Button>
                    <Button
                        color="theme"
                        variant="contained"
                        icon={<Right />}
                    ></Button>
                </Box>
            </Box>
        </Box>
    );
};

interface Props extends React.HTMLAttributes<any> {
    content: string;
    header: string;
    textLimit?: number;
}

Carousel.defaultProps = {
    textLimit: 50,
};

export default Carousel;
