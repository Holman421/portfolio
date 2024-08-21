import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainPallete } from "../../Config/Colors";
import { StoreType } from "../../Redux/store/store";
import useScreenSize from "../../Utils/CustomHooks/useScreenSize";
import {
  breakpointUp1300px,
  breakpointLower800px,
} from "../../Utils/HelperFunctions/breakpoints";
import { createClipPath } from "../../Utils/HelperFunctions/createClipPath";
import { toggleCursor } from "../../Redux/reducers/cursorReducer";
import useSelectAppropriateText from "../../Utils/CustomHooks/useSelectAppropriateText";
import AbstractDescBars from "../AbstractDescBars";
import DownloadIcon from "@mui/icons-material/Download";

type SkillContainerProps = {
  title: string;
  number: string;
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
  pdf?: any;
  isComplete?: boolean;
  orientation: "left" | "right";
};

const SkillContainer: React.FC<SkillContainerProps> = ({
  title,
  number,
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
  pdf,
  isComplete = true,
  orientation,
}) => {
  const isAbove1300px = useScreenSize();
  const isBellow800px = useScreenSize(800, "bellow");
  const dispatch = useDispatch();

  const {
    clipPathOutside: certificationClipPathOutside,
    clipPathInside: certificationClipPathInside,
  } = createClipPath<5>(
    [
      { x: "0%", y: "0%" },
      {
        x: `100% - ${isAbove1300px ? "2.2rem" : "1.75rem"}`,
        y: "0%",
      },
      { x: "100%", y: "100%" },
      { x: "0% + .5rem", y: "100%" },
      { x: "0%", y: "100% - .5rem" },
    ],
    [
      { x: "+ 1px", y: "+ 1px" },
      { x: "- 1px", y: "+ 1px" },
      { x: "- 2px", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
    ],
  );

  const {
    clipPathOutside: certificationClipPathOutsideSmall,
    clipPathInside: certificationClipPathInsideSmall,
  } = createClipPath<6>(
    [
      { x: "0%", y: "0%" },
      { x: `100%`, y: "0%" },
      { x: "100%", y: "100% - .5rem" },
      { x: "100% - .5rem", y: "100%" },
      { x: "0% + .5rem", y: "100%" },
      { x: "0%", y: "100% - .5rem" },
    ],
    [
      { x: "+ 1px", y: "+ 1px" },
      { x: "- 1px", y: "+ 1px" },
      { x: "- 2px", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
    ],
  );

  const { clipPathOutside: titleClipPathOutside, clipPathInside: titleClipPathInside } =
    createClipPath<11>(
      [
        { x: "0%", y: "0% + 1rem" },
        { x: "0% + 1rem", y: "0%" },
        { x: "100% - 4rem", y: "0%" },
        { x: "100% - 3.5rem", y: "0% + .5rem" },
        { x: "100% - .5rem", y: "0% + .5rem" },
        { x: "100%", y: "0% + 1rem" },
        { x: "100%", y: "100% - 1rem" },
        { x: "100% - 1rem", y: "100%" },
        { x: "100% - 4rem", y: "100%" },
        {
          x: `100% - ${isAbove1300px ? "6.4rem" : "6rem"}`,
          y: `100% - ${isAbove1300px ? "2.4rem" : "2rem"}`,
        },
        {
          x: "0%",
          y: `100% - ${isAbove1300px ? "2.4rem" : "2rem"}`,
        },
      ],
      [
        { x: "+ 1px", y: "" },
        { x: "", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "- 1px", y: "" },
        { x: "- 1px", y: "" },
        { x: "", y: "- 1px" },
        { x: "", y: "- 1px" },
        { x: "", y: "- 1px" },
        { x: "+ 1px", y: "- 1px" },
      ],
    );

  const {
    clipPathOutside: titleClipPathOutsideSmall,
    clipPathInside: titleClipPathInsideSmall,
  } = createClipPath<6>(
    [
      { x: "0%", y: "0% + .75rem" },
      { x: "0% + .75rem", y: "0%" },
      { x: "100% - .75rem", y: "0%" },
      { x: "100%", y: "0% + .75rem" },
      { x: `100%`, y: `100% - 2rem` },
      { x: "0%", y: `100% - 2rem` },
    ],
    [
      { x: "+ 1px", y: "" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
    ],
  );

  const { showSkillsContainers, selectedMode } = useSelector(
    (state: StoreType) => state.avatarState,
  );

  const certificationText = useSelectAppropriateText("Certification", "Certifikace");

  return (
    <Box
      sx={{
        opacity: showSkillsContainers ? opacity : "0",
        visibility: showSkillsContainers ? "visible" : "hidden",
        transition:
          selectedMode === "skills" ? "all 1000ms ease-out" : "all 250ms ease-out",
        position: "absolute",
        maxWidth: "10rem",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        transform: `rotate(${angle})`,
        ...breakpointLower800px({
          top: topSmall,
          left: leftSmall,
          transform: `rotate(${angle}) scale(.65)`,
        }),
        ...breakpointUp1300px({
          maxWidth: "15rem",
          top: topBig,
          left: leftBig,
        }),
      }}
    >
      <a href={isComplete ? pdf : undefined} rel="noreferrer" target="_blank">
        <Box
          onMouseEnter={() => {
            isComplete && dispatch(toggleCursor(true));
          }}
          onMouseLeave={() => {
            isComplete && dispatch(toggleCursor(false));
          }}
          sx={{
            height: "1.75rem",
            width: "8.6rem",
            cursor: isComplete ? "pointer" : "auto",
            marginTop: "2.5rem",
            clipPath: certificationClipPathOutside,
            backgroundColor: mainPallete.secondaryLight,
            position: "absolute",
            transition: "all 500ms ease",
            "&:hover": {
              "&::before": {
                width: isComplete ? "96%" : "100%",
                height: isComplete ? "92%" : "100%",
              },
            },
            ...breakpointLower800px({
              clipPath: certificationClipPathOutsideSmall,
              height: "2rem",
              width: "10.6rem",
            }),
            ...breakpointUp1300px({
              marginTop: "3.1rem",
              height: "2.2rem",
              width: "11.6rem",
            }),
            "&::before": {
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              background: `linear-gradient(180deg, ${mainPallete.secondaryGradientLight} 0%, ${mainPallete.secondaryGraidentDark} 100%)`,
              clipPath: certificationClipPathInside,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "20",
              ...breakpointLower800px({
                clipPath: certificationClipPathInsideSmall,
              }),
              transition: "width 250ms ease, height 250ms ease",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              zIndex: "50",
              left: ".7rem",
              bottom: ".5rem",
              fontSize: ".8rem",
              cursor: isComplete ? "pointer" : "auto",
              display: "flex",
              alignItems: "center",
              ...breakpointLower800px({
                fontSize: ".9rem",
                left: ".9rem",
              }),
              ...breakpointUp1300px({
                fontSize: "1rem",
              }),
            }}
          >
            {isComplete && <DownloadIcon sx={{ marginRight: ".3rem", fontSize: "1.1rem" }} />}
            {isComplete ? certificationText : "In progress"}
          </Box>
        </Box>
      </a>

      <Box
        sx={{
          width: "13rem",
          height: "4.25rem",
          background: mainPallete.mainLight,
          clipPath: titleClipPathOutside,
          position: "relative",
          transition: "all 500ms ease",
          ...breakpointLower800px({
            width: "10.5rem",
            clipPath: titleClipPathOutsideSmall,
          }),
          "&::before": {
            content: '""',
            position: "absolute",
            background: `linear-gradient(180deg, ${mainPallete.mainGradientLight} 0%, ${mainPallete.mainGradientDark} 100%)`,
            width: "100%",
            height: "100%",
            clipPath: titleClipPathInside,
            zIndex: "20",
            ...breakpointLower800px({
              clipPath: titleClipPathInsideSmall,
            }),
          },
          ...breakpointUp1300px({
            width: "16rem",
            height: "5.25rem",
          }),
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: "50",
          right: "-2.4rem",
          top: ".8rem",
          ...breakpointUp1300px({
            right: "-.4rem",
            top: ".8rem",
          }),
          ...breakpointLower800px({
            fontSize: ".75rem",
            right: "-.2rem",
            top: "2.7rem",
          }),
        }}
      >
        {number}
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: "50",
          left: "1rem",
          top: ".75rem",
          fontSize: ".8rem",
          ...breakpointLower800px({
            left: ".9rem",
            fontSize: "1rem",
            top: ".5rem",
          }),
          ...breakpointUp1300px({
            top: ".9rem",
            fontSize: "1.1rem",
          }),
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: "50",
          bottom: ".25rem",
          right: "-1.9rem",
          transform: "scale(.65, .8) skew(53deg)",
          opacity: ".3",
          transition: "all 500ms ease",
          ...breakpointUp1300px({
            bottom: ".4rem",
            right: ".2rem",
            transform: "scale(.7, 1) skew(57deg)",
          }),
          ...breakpointLower800px({
            display: "none",
          }),
        }}
      >
        <AbstractDescBars colorScheme="monochrome" />
      </Box>
    </Box>
  );
};

export default SkillContainer;
