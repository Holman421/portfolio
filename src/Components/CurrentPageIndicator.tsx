import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../Redux/store/store";
import { breakpointLower650px } from "../Utils/HelperFunctions/breakpoints";
import { Link } from "react-scroll";

const MainBox: React.FC = () => {
  const currentIndex = useSelector(
    (state: StoreType) => state.themeState.currentPageIndex,
  );
  return (
    <Box
      sx={{
        border: "solid 3px #CF6C29",
        width: ".9rem",
        height: ".9rem",
        position: "absolute",
        top: `${currentIndex * 1.4 - 0.1}rem`,
        transition: "top 200ms ease",
      }}
    />
  );
};

const CurrentPageIndicator: React.FC = () => {
  const boxStyling = {
    border: "solid 1px #29C4CE",
    width: ".7rem",
    height: ".7rem",
    cursor: "pointer",
    transition: "border 200ms ease",
    "&:hover": {
      borderColor: "#CF6C29",
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: ".7rem",
        position: "fixed",
        top: "50%",
        right: "2rem",
        zIndex: "100",
        transform: "translateY(-50%)",
        ...breakpointLower650px({
          right: "1rem",
        }),
      }}
    >
      <MainBox />
      <Link to="#hero" spy={true} smooth={true} offset={50} duration={1400}>
        <Box sx={boxStyling} />
      </Link>
      <Link to="#projects" spy={true} smooth={true} offset={50} duration={1400}>
        <Box sx={boxStyling} />
      </Link>
      <Link to="#avatar" spy={true} smooth={true} offset={50} duration={1400}>
        <Box sx={boxStyling} />
      </Link>
      <Link to="#contactMe" spy={true} smooth={true} offset={50} duration={1400}>
        <Box sx={boxStyling} />
      </Link>
    </Box>
  );
};

export default CurrentPageIndicator;
