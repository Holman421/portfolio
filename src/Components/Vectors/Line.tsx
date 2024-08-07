import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/store/store";
import {
  breakpointUp1300px,
  breakpointLower800px,
} from "../../Utils/HelperFunctions/breakpoints";

type LineProps = {
  name?: string;
  color?: string;
  length: string;
  thickness?: string;
  angle?: string;
  top?: any;
  bottom?: any;
  left?: any;
  right?: any;
  transformOrigin?: string;
  children?: React.ReactNode;
  transition?: string;
  topBig?: string;
  topSmall?: string;
  leftBig?: string;
  leftSmall?: string;
  opacity?: string;
  shouldShrink?: boolean;
  applyFastOpacityTransition?: boolean;
};

const Line: React.FC<LineProps> = ({
  color = "#ce6c29",
  length,
  thickness = "3px",
  angle,
  top,
  bottom,
  left,
  right,
  transformOrigin = "left",
  transition,
  children,
  topBig,
  topSmall,
  leftBig,
  leftSmall,
  opacity,
  shouldShrink = true,
  applyFastOpacityTransition = false,
}) => {
  const {
    areAvatarTransitionsOn,
    applyFirstAppearTransition,
  } = useSelector((state: StoreType) => state.avatarState);

  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: color,
        height: thickness,
        width: length,
        transform: `rotate(${angle})`,
        transformOrigin: transformOrigin,
        top: top,
        left: left,
        bottom: bottom,
        right: right,
        opacity: opacity,
        transition: areAvatarTransitionsOn
          ? applyFirstAppearTransition
            ? transition
            : applyFastOpacityTransition
            ? "all 750ms ease-out, opacity 300ms ease"
            : "all 750ms ease-out"
          : "",
        ...breakpointLower800px({
          width: shouldShrink ? "0" : length,
          transform: `rotate(${angle})`,
          top: topSmall,
          left: leftSmall,
        }),
        ...breakpointUp1300px({
          top: topBig,
          left: leftBig,
        }),
      }}
    >
      {children}
    </Box>
  );
};

export default Line;
