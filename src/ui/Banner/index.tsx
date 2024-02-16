import React from "react";
import { BiPlay, BiMouse } from "react-icons/bi";
import Box from "../../components/Box";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import Carousel from "./Carousel";
import Stat from "./Stat";

const Banner: React.FC = () => {
    return (
        <Box className="ui-banner position-relative" variant="contained">
            <Box className="banner-main">
                <Typography variant="h1" className="background-text">
                    Enhance
                </Typography>
                <Typography variant="h1" className="">
                    Magnify your <br />
                    online <span className="color-theme">presence</span>
                </Typography>
                <Typography variant="p" className="pl-4">
                    Ready to power your business to new heights with our
                    software developement services and technology platform
                </Typography>
                <Box className="call-to-action">
                    <Button
                        color="theme"
                        variant="contained"
                    >
                        Get Started
                    </Button>
                    <Button
                        className="watch-intro"
                        variant="none"
                        icon={<BiPlay />}
                    >
                        Watch Intro
                    </Button>
                </Box>
                <Box className="d-flex align-items-center scroller">
                    <BiMouse className="me-2 mouse" />
                    <Typography variant="p" className="align-self-end p-0 m-0">
                        Scroll down to continue
                    </Typography>
                </Box>
            </Box>
            <Box className="banner-right">
                <Box className="mb-5">
                    <Carousel
                        header="Information gathering"
                        content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam alias voluptas et aperiam quod quasi assumenda qui optio laudantium, architecto cum placeat beatae minus sequi, molestias quas ipsum perspiciatis itaque?"
                    />
                </Box>

                <Box className="d-flex mt-2">
                    <Stat className="me-5" count={5}>
                        years <br />
                        of experience
                    </Stat>
                    <Stat count={20}>
                        Satisfied <br /> clients
                    </Stat>
                </Box>
            </Box>
        </Box>
    );
};

export default Banner;
