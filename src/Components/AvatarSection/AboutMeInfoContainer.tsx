import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/store/store";
import useGetDivWidth from "../../Utils/CustomHooks/useGetDivWidth";
import useScreenSize from "../../Utils/CustomHooks/useScreenSize";
import {
  breakpointLower800px,
  breakpointUp1300px,
} from "../../Utils/HelperFunctions/breakpoints";
import { createClipPath } from "../../Utils/HelperFunctions/createClipPath";
import {
  mainFont,
  secondaryFont,
} from "../../Config/Fonts";
import useSelectAppropriateText from "../../Utils/CustomHooks/useSelectAppropriateText";
import AbstractDescBars from "../AbstractDescBars";

type AboutMeInfoContainerProps = {
  title: string;
  number: string;
  description: string;
  top?: string;
  topBig?: string;
  topSmall?: string;
  left?: string;
  leftBig?: string;
  leftSmall?: string;
  right?: string;
  bottom?: string;
  angle?: string;
  opacity?: string;
  transition?: string;
};

const AboutMeInfoContainer: React.FC<
  AboutMeInfoContainerProps
> = ({
  title,
  number,
  description,
  top,
  topBig,
  topSmall,
  left,
  leftBig,
  leftSmall,
  right,
  bottom,
  angle,
  opacity = "1",
  transition,
}) => {
  const { ref, width } = useGetDivWidth();

  const isAbove1300px = useScreenSize();

  const font = useSelectAppropriateText(
    mainFont,
    secondaryFont
  );

  const {
    clipPathOutside: titleClipPathOutside,
    clipPathInside: titleClipPathInside,
  } = createClipPath<5>(
    [
      { x: "0%", y: "0% + .75rem" },
      { x: "0% + .75rem", y: "0%" },
      { x: "100%", y: "0%" },
      { x: "100% - 2rem", y: "100%" },
      { x: "0%", y: "100%" },
    ],
    [
      { x: "+ 1px", y: "" },
      { x: "", y: "+ 1px" },
      { x: "- 2px", y: "+ 1px" },
      { x: "", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
    ]
  );

  const {
    clipPathOutside: descriptionClipPathOutside,
    clipPathInside: descriptionClipPathInside,
  } = createClipPath<11>(
    [
      {
        x: "0%",
        y: `0% + ${isAbove1300px ? "2.7rem" : "2.2rem"}`,
      },
      {
        x: `0% + ${width - 30}px`,
        y: `0% + ${isAbove1300px ? "2.7rem" : "2.2rem"}`,
      },
      { x: `0% + ${width - 30}px + 2.2rem`, y: "0%" },
      { x: "100% - .75rem", y: "0%" },
      { x: "100%", y: "0% + .75rem" },
      { x: "100%", y: "100% - 1.5rem" },
      { x: "100% - .75rem", y: "100% - .75rem" },
      { x: "100% - 5rem", y: "100% - .75rem" },
      { x: "100% - 5.75rem", y: "100%" },
      { x: "0% + .75rem", y: "100%" },
      { x: "0%", y: "100% - .75rem" },
    ],
    [
      { x: "+ 1px", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "- 1px", y: "" },
      { x: "- 1px", y: "" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "+ 1px", y: "" },
    ]
  );

  const {
    showAboutMeContainers,
    applyFirstAppearTransition,
    selectedMode,
  } = useSelector((state: StoreType) => state.avatarState);

  return (
    <Box
      sx={{
        opacity: showAboutMeContainers ? opacity : "0",
        visibility: showAboutMeContainers
          ? "visible"
          : "hidden",
        transition: applyFirstAppearTransition
          ? transition
          : selectedMode === "aboutMe"
          ? "all 1000ms ease-out"
          : "all 250ms ease-out",
        position: "absolute",
        maxWidth: "10rem",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        transform: `rotate(${angle})`,
        ...breakpointLower800px({
          transform: `rotate(${angle}) scale(.65)`,
          top: topSmall,
          left: leftSmall,
        }),
        ...breakpointUp1300px({
          maxWidth: "15rem",
          top: topBig,
          left: leftBig,
        }),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: "50",
          right: "-.3rem",
          top: ".4rem",
          fontSize: ".75rem",
          ...breakpointUp1300px({
            fontSize: "1rem",
            right: ".8rem",
            top: ".6rem",
          }),
          ...breakpointLower800px({
            fontSize: ".75rem",
            right: "-.3rem",
            top: ".5rem",
          }),
        }}
      >
        {number}
      </Box>
      <Box
        ref={ref}
        sx={{
          height: "2rem",
          clipPath: titleClipPathOutside,
          backgroundColor: "rgba(41, 196, 206)",
          position: "absolute",
          ...breakpointUp1300px({
            height: "2.5rem",
          }),
          "&::before": {
            content: '""',
            position: "absolute",
            background:
              "linear-gradient(180deg, #1e9ca5 0%, #0c2e33 100%)",
            width: "100%",
            height: "100%",
            clipPath: titleClipPathInside,
            zIndex: "20",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: "30",
            top: "50%",
            transform: "translateY(-50%)",
            left: ".75rem",
            fontSize: ".8rem",
            paddingRight: "2.75rem",
            transition: "all 500ms ease",
            fontFamily: font,
            ...breakpointLower800px({
              fontSize: "1rem",
            }),
            ...breakpointUp1300px({
              fontSize: "1.2rem",
            }),
          }}
        >
          {title}
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          zIndex: "50",
          bottom: "-.4rem",
          left: ".5rem",
          transform: "scale(.8, .6) skew(40deg)",
          opacity: ".9",
          transition: "all 500ms ease",
          ...breakpointUp1300px({
            bottom: "-.25rem",
            left: "1.3rem",
            transform: "scale(1.1, .7) skew(40deg)",
          }),
        }}
      >
        <AbstractDescBars
          colorScheme="monochrome"
          version="aboutMe"
        />
      </Box>

      <Box
        sx={{
          minWidth: "11rem",
          maxWidth: "15rem",
          clipPath: descriptionClipPathOutside,
          backgroundColor: "rgba(41, 196, 206)",
          display: "inline-block",
          position: "relative",
          ...breakpointUp1300px({
            minWidth: "13rem",
            maxWidth: " 17rem",
          }),
          "&::before": {
            content: '""',
            position: "absolute",
            background:
              "linear-gradient(180deg, #1e9ca5 0%, #0c2e33 100%)",
            //  background: "black",
            width: "100%",
            height: "100%",
            clipPath: descriptionClipPathInside,
            zIndex: "20",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: "30",
            padding: "2.6rem .75rem 1.5rem .75rem",
            fontFamily: "'Exo 2', sans-serif",
            fontSize: ".7rem",
            display: "inline-block",
            transition: "all 500ms ease",
            ...breakpointLower800px({
              fontSize: ".9rem",
              padding: "2.6rem .75rem 1.75rem .75rem",
            }),
            ...breakpointUp1300px({
              fontSize: "1rem",
              padding: "3.2rem 1rem 1.75rem 1rem",
            }),
          }}
        >
          {description}
        </Box>
      </Box>
    </Box>
  );
};

export default AboutMeInfoContainer;
