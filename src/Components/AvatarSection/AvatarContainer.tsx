import React, { useEffect, useState } from "react";
import { createClipPath } from "../../Utils/HelperFunctions/createClipPath";
import Shadows from "../Shadows/Shadows";
import AvatarModel from "../3dModels/AvatarModel";
import BehindAvatarLines from "./BehindAvatarLines";
import { Box } from "@mui/material";
import { lightFlickering } from "../../Utils/HelperFunctions/animations";
import useGetDivWidth from "../../Utils/CustomHooks/useGetDivWidth";
import { breakpointLower800px } from "../../Utils/HelperFunctions/breakpoints";

type AvatarContainerProps = {
  isIntersecting: boolean;
};

const AvatarContainer: React.FC<AvatarContainerProps> = ({
  isIntersecting,
}) => {
  const { clipPathOutside, clipPathInside } =
    createClipPath<16>(
      [
        { x: "0%", y: "0% + 1rem" },
        { x: "0% + 1rem", y: "0%" },
        { x: "50% - 2rem", y: "0%" },
        { x: "50% - 1rem", y: "0% + 1rem" },
        { x: "50% + 1rem", y: "0% + 1rem" },
        { x: "50% + 2rem", y: "0%" },
        { x: "100% - 1rem", y: "0%" },
        { x: "100%", y: "0% + 1rem" },
        { x: "100%", y: "100% - 1rem" },
        { x: "100% - 1rem", y: "100%" },
        { x: "50% + 2rem", y: "100%" },
        { x: "50% + 1rem", y: "100% - 1rem" },
        { x: "50% - 1rem", y: "100% - 1rem" },
        { x: "50% - 2rem", y: "100%" },
        { x: "0% + 1rem", y: "100%" },
        { x: "0%", y: "100% - 1rem" },
      ],
      [
        { x: "+ 1px", y: "" },
        { x: "", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "- 1px", y: "" },
        { x: "- 1px", y: "" },
        { x: "", y: "- 1px" },
        { x: "", y: "- 1px" },
        { x: "", y: "- 1px" },
        { x: "", y: "- 1px" },
        { x: "", y: "- 1px" },
        { x: "", y: "- 1px" },
        { x: "+ 1px", y: "" },
      ]
    );

  const [transitionState, setTransitionState] = useState(
    "height 300ms ease 300ms"
  );

  useEffect(() => {
    if (isIntersecting) {
      setTimeout(() => {
        setTransitionState("");
      }, 3000);
    }
  }, [isIntersecting]);

  const { ref, width } = useGetDivWidth();

  return (
    <Box
      sx={{
        position: "relative",
        width: "content-fit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <Box
        ref={ref}
        sx={{
          width: "clamp(14rem, 30vw, 30rem)",
          height: isIntersecting
            ? `${width * 1.5}px`
            : "5rem",
          maxHeight: "70vh",
          position: "relative",
          transition: transitionState,
          clipPath: clipPathOutside,
          ...breakpointLower800px({
            width: "clamp(14rem, 50vw, 30rem)",
          }),
          backgroundColor: "rgba(41, 196, 206)",
          "&::before": {
            content: '""',
            position: "absolute",
            background:
              "linear-gradient(180deg, #1e9ca5 0%, #0c2e33 100%)",
            //  background: "black",
            width: "100%",
            left: "0",
            height: "100%",
            clipPath: clipPathInside,
            zIndex: "20",
          },
        }}
      >
        <Shadows zIndex="100" right="30%" scale={1.5} />
      </Box>
      <Box
        sx={{
          zIndex: "50",
          position: "absolute",
          height: "clamp(20rem, 45vw, 45rem)",
          maxHeight: "75vh",
          width: "clamp(9rem, 30%, 25rem)",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: "0",
          animation: isIntersecting
            ? `${lightFlickering()} 500ms ease-in-out forwards 600ms`
            : ``,
          transition: "opacity 200ms ease 600ms",
          ...breakpointLower800px({
            height: "clamp(20rem, 55vw, 45rem)",
            top: "55%",
          }),
        }}
      >
        <AvatarModel isIntersecting={isIntersecting} />
      </Box>
      <BehindAvatarLines isIntersecting={isIntersecting} />
    </Box>
  );
};

export default AvatarContainer;
