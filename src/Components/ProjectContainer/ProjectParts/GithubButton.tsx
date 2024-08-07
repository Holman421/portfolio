import { Box } from "@mui/material";
import React from "react";
import { breakpointLower800px } from "../../../Utils/HelperFunctions/breakpoints";
import { createClipPath } from "../../../Utils/HelperFunctions/createClipPath";
import { useDispatch } from "react-redux";
import { toggleCursor } from "../../../Redux/reducers/cursorReducer";

type GithubButtonProps = {
  urlGithub: string;
  isOpen: boolean;
  isProjectDone: boolean;
};

const GithubButton: React.FC<GithubButtonProps> = ({
  urlGithub,
  isOpen,
  isProjectDone,
}) => {
  const { clipPathOutside, clipPathInside } =
    createClipPath<6>(
      [
        { x: "0%", y: "0%" },
        { x: "100%", y: "0%" },
        { x: "100%", y: "100% - 1rem" },
        { x: "100% - 1rem", y: "100%" },
        { x: "0% + 1rem", y: "100%" },
        { x: "0%", y: "100% - 1rem" },
      ],
      [
        { x: "+ 1px", y: "+ 1px" },
        { x: "- 1px", y: "+ 1px" },
        { x: "- 1px", y: "" },
        { x: "", y: "- 1px" },
        { x: "", y: "- 1px" },
        { x: "+ 1px", y: "" },
      ]
    );

  const {
    clipPathOutside: clipPathOutsideMobile,
    clipPathInside: clipPathInsideMobile,
  } = createClipPath<5>(
    [
      { x: "0%", y: "0%" },
      { x: "100%", y: "0%" },
      { x: "100%", y: "100% - 1rem" },
      { x: "100% - 1rem", y: "100%" },
      { x: "0%", y: "100%" },
    ],
    [
      { x: "+ 1px", y: "+ 1px" },
      { x: "- 1px", y: "+ 1px" },
      { x: "- 1px", y: "- 1px" },
      { x: "- 1px", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
    ]
  );

  const handleClick = () => {
    window.open(urlGithub, "_blank");
  };

  const dispatch = useDispatch();

  if (!isProjectDone) {
    return null;
  }

  return (
    <Box
      component="button"
      onClick={handleClick}
      onMouseEnter={() => {
        dispatch(toggleCursor(true));
      }}
      onMouseLeave={() => {
        dispatch(toggleCursor(false));
      }}
      sx={{
        position: "absolute",
        bottom: "-2.9rem",
        left: "1rem",
        padding: ".5rem 0rem",
        width: "6.9rem",
        cursor: "pointer",
        border: "none",
        background: "#CF6C29",
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? "1" : "0",
        transition:
          "visibility 500ms ease-out 100ms, opacity 500ms ease-out 100ms",
        clipPath: clipPathOutside,
        "&:hover": {
          "&::before": {
            width: "96%",
            height: "91%",
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          background:
            "linear-gradient(0deg, #ce6c29 0%, #512b10 100%)",
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          clipPath: clipPathInside,
          transition: "width 250ms ease, height 250ms ease",
          ...breakpointLower800px({
            clipPath: clipPathInsideMobile,
            background:
              "linear-gradient(180deg, #ce6c29 0%, #512b10 100%)",
          }),
        },
        ...breakpointLower800px({
          width: "6.35rem",
          bottom: "-1.8rem",
          left: "8.6rem",
          clipPath: clipPathOutsideMobile,
          transition:
            "visibility 500ms ease-out, opacity 500ms ease-out",
        }),
      }}
    >
      <Box
        sx={{
          zIndex: "50",
          fontSize: "1rem",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        Github
      </Box>
    </Box>
  );
};

export default GithubButton;
