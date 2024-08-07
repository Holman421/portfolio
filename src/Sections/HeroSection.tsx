import React from "react";
import { Box } from "@mui/material";
import SectionWrapper from "../Components/SectionWrapper";
import DescriptionContainer from "../Components/HeroSection/DescriptionContainer";
import ShowProjectsButton from "../Components/HeroSection/ShowProjectsButton";
import HeadingContainer from "../Components/HeroSection/HeadingContainer";
import {
  breakpointUp1300px,
  breakpointLower650px,
} from "../Utils/HelperFunctions/breakpoints";
import Navbar from "../Components/Navbar";
import DonwloadCVButton from "../Components/HeroSection/DonwloadCVButton";

const HeroSection: React.FC = () => {
  return (
    <SectionWrapper
      nameForNavigation="#hero"
      index={0}
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(49.64% 42.91% at 36.89% 52%, rgba(60, 149, 220, 0.23) 0%, rgba(0, 0, 0, 0.00) 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: "1",
          transition: "all 600ms ease",
          ...breakpointUp1300px({
            transform: "scale(1.3)",
          }),
          ...breakpointLower650px({
            transform: "translateY(-1rem)",
          }),
        }}
      >
        <Box sx={{ position: "relative" }}>
          <DonwloadCVButton />
          <HeadingContainer />
          <DescriptionContainer />
          <ShowProjectsButton />
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default HeroSection;
