import React from "react";
import Header from "./ui/Header";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import routes from "./routes";
import Section, { Line, Skewed } from "./components/Section/Section";
import Titlebar from "./ui/Titlebar";
import Typography from "./components/Typography";
import Box from "./components/Box";
import Button from "./components/Button";
import { BsCode, BsXDiamond, BsArrowRight as Right } from "react-icons/bs";
import IconBox from "./components/IconBox";
import { BiLogoFigma } from "react-icons/bi";
import { Link } from "react-router-dom";

const App: React.FC = () => {
    return (
        <>
            <Header routes={routes} />
            <Section className="any-query">
                <Box className="row">
                    <Box className="col-6">
                        <Titlebar sub="Contact">
                            Any Type of query <br /> & discussion
                        </Titlebar>
                        <Typography variant="p">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Reprehenderit placeat similique quos
                        </Typography>

                        <Button
                            className="ui-section-btn"
                            variant="none"
                            icon={<Right />}
                            iconPos="right"
                        >
                            Contact me
                        </Button>
                    </Box>

                    <Box className="col-6">
                        <Titlebar variant="text">
                            You Cant Use Up Creativity,
                            <br /> The More You Use, More You Have In Your
                            Significant Mind
                        </Titlebar>
                        <Typography variant="p">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Reprehenderit placeat similique quos
                            perferendis voluptatibus suscipit voluptates hic
                            harum! Laboriosam
                        </Typography>
                    </Box>
                </Box>
            </Section>
            <Section className="skills-section">
                <Line />
                <Skewed />
                <Box className="row">
                    <IconBox
                        title="Web Development"
                        icon={<BsCode />}
                        className="col-4"
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Magni eaque omnis ex cumque non. Illum sequi,
                        rerum, atque repudiandae
                    </IconBox>
                    <IconBox
                        title="Graphics design"
                        icon={<BiLogoFigma />}
                        className="col-4"
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Magni eaque omnis ex cumque non. Illum sequi,
                        rerum, atque repudiandae
                    </IconBox>
                    <IconBox
                        title="Software Development"
                        icon={<BsXDiamond />}
                        className="col-4"
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Magni eaque omnis ex cumque non. Illum sequi,
                        rerum, atque repudiandae
                    </IconBox>
                </Box>
            </Section>
            <Section>
                <Box className="col-6">
                    <Titlebar sub="featured projects">
                        All creative works
                        <br /> selected projects
                    </Titlebar>
                    <Typography variant="p">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Distinctio ducimus doloribus labore voluptas quae
                    </Typography>

                    <Button
                        className="ui-section-btn"
                        variant="none"
                        icon={<Right />}
                        iconPos="right"
                    >
                        Expore more
                    </Button>
                </Box>
            </Section>
            <Section className="estimate-section border-top border-bottom">
                <Box className="row">
                    <Box className="col-6">
                        <Titlebar sub="Hire me">
                            Got a project <br /> let's talk...
                        </Titlebar>
                        <Typography variant="p">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Reprehenderit placeat similique quos
                        </Typography>

                        <Button
                            className="ui-section-btn"
                            variant="none"
                            icon={<Right />}
                            iconPos="right"
                        >
                            Hire me
                        </Button>
                    </Box>

                    <Box className="col-6">
                        <Titlebar variant="text">
                            Estimate your project,
                            <br /> let me know here
                        </Titlebar>
                        <Typography variant="p">
                            Please fill the form below. You can also fill the <Link className="text-decoration-underline" to={'/questionnaire'}>Questionnaire</Link> - <strong>Recommended</strong>
                        </Typography>
                    </Box>
                </Box>
            </Section>
            <Section className="footer">
                <Typography>
                    Timeax
                </Typography>
                <Box className="d-flex">
                    links
                </Box>
                <Typography>David Okpako - All rights reserved</Typography>
            </Section>
        </>
    );
};

export default App;
