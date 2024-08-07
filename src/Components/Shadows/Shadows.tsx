import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  breakpointLower650px,
  breakpointUp1300px,
} from "../../Utils/HelperFunctions/breakpoints";

type ShadowsProps = {
  top?: string;
  left?: string;
  leftSmall?: string;
  right?: string;
  rightSmall?: string;
  scale?: number;
  zIndex?: string;
  className?: string;
};

const Shadows: React.FC<ShadowsProps> = ({
  top,
  left,
  leftSmall,
  right,
  rightSmall,
  scale = 1,
  zIndex,
  className,
}) => {
  const [variant] = useState(
    Math.floor(Math.random() * 4) + 1
  );
  const linearGradient =
    "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)";
  const height = "7rem";

  const shadowVariantHandler = () => {
    if (variant === 1) {
      return [
        { width: ".4rem", marginRight: ".4rem" },
        { width: "1.5rem", marginRight: ".8rem" },
        { width: "1rem", marginRight: ".2rem" },
        { width: ".6rem", marginRight: "" },
      ];
    } else if (variant === 2) {
      return [
        { width: "1rem", marginRight: ".3rem" },
        { width: ".3rem", marginRight: "1rem" },
        { width: ".3rem", marginRight: ".3rem" },
        { width: "1.5rem", marginRight: ".6rem" },
        { width: ".4rem", marginRight: "" },
      ];
    } else if (variant === 3) {
      return [
        { width: "1rem", marginRight: "1.2rem" },
        { width: "1.5rem", marginRight: ".7rem" },
        { width: ".3rem", marginRight: ".2rem" },
        { width: ".8rem", marginRight: ".4rem" },
        { width: ".5rem", marginRight: "" },
      ];
    }
    return [
      { width: ".2rem", marginRight: ".3rem" },
      { width: ".4rem", marginRight: ".2rem" },
      { width: "1.5rem", marginRight: ".8rem" },
      { width: ".3rem", marginRight: ".3rem" },
      { width: "1rem", marginRight: ".7rem" },
      { width: ".6rem", marginRight: "" },
    ];
  };

  return (
    <Box
      className={className}
      sx={{
        position: "absolute",
        display: "flex",
        top: top,
        left: left,
        right: right,
        marginLeft: "2rem",
        transform: `scale(${scale}) skew(-23deg)`,
        transformOrigin: "top",
        zIndex: zIndex,
        transition: "all 500ms ease",
        ...breakpointLower650px({
          transform: `scale(${scale * 0.8}) skew(-23deg)`,
          right: rightSmall,
          left: leftSmall,
        }),
        ...breakpointUp1300px({
          transform: `scale(${scale * 1.2}) skew(-23deg)`,
        }),
      }}
    >
      {shadowVariantHandler().map((shadow, index) => (
        <Box
          key={index}
          sx={{
            height: height,
            width: shadow.width,
            marginRight: shadow.marginRight,
            background: linearGradient,
          }}
        ></Box>
      ))}
    </Box>
  );
};

export default Shadows;
