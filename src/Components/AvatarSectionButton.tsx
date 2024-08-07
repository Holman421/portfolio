import { Box } from "@mui/material";
import React from "react";
import { SelectedMode } from "../Types/Types";
import { createClipPath } from "../Utils/HelperFunctions/createClipPath";
import { useDispatch } from "react-redux";
import { toggleCursor } from "../Redux/reducers/cursorReducer";
import useSelectAppropriateText from "../Utils/CustomHooks/useSelectAppropriateText";
import { mainFont, secondaryFont } from "../Config/Fonts";

type AvatarSectionButtonProps = {
  handleSwitchModes: (mode: SelectedMode) => void;
  isActive: boolean;
  name: string;
  handleSwitchModesArgument: SelectedMode;
  isIntersecting: boolean;
};

const AvatarSectionButton: React.FC<
  AvatarSectionButtonProps
> = ({
  handleSwitchModes,
  isActive,
  name,
  handleSwitchModesArgument,
  isIntersecting,
}) => {
  const { clipPathOutside, clipPathInside } =
    createClipPath<8>(
      [
        { x: "0%", y: "0% + .5rem" },
        { x: "0% + .5rem", y: "0%" },
        { x: "100% - .5rem", y: "0%" },
        { x: "100%", y: "0% + .5rem" },
        { x: "100%", y: "100% - .5rem" },
        { x: "100% - .5rem", y: "100%" },
        { x: "0% + .5rem", y: "100%" },
        { x: "0%", y: "100% - .5rem" },
      ],
      [
        { x: "+ 1px", y: "+ 1px" },
        { x: "+ 1px", y: "+ 1px" },
        { x: "- 1px", y: "+ 1px" },
        { x: "- 1px", y: "" },
        { x: "- 1px", y: "- 1px" },
        { x: "- 1px", y: "- 1px" },
        { x: "+ 1px", y: "- 1px" },
        { x: "+ 1px", y: "- 1px" },
      ]
    );

  const font = useSelectAppropriateText(
    mainFont,
    secondaryFont
  );

  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        handleSwitchModes(handleSwitchModesArgument);
        dispatch(toggleCursor(false));
      }}
      onMouseEnter={() => {
        isActive || dispatch(toggleCursor(true));
      }}
      onMouseLeave={() => {
        isActive || dispatch(toggleCursor(false));
      }}
      component={"button"}
      sx={{
        zIndex: "1000",
        opacity: isIntersecting ? "1" : "0",
        visibility: isIntersecting ? "visible" : "hidden",
        transition: "opacity 500ms ease 2000ms",
        border: "none",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: isActive ? "#CF6C29" : "#29C4CE",
        padding: ".5rem 1rem",
        clipPath: clipPathOutside,
        position: "relative",
        "&:hover": {
          "&::before": {
            width: "96%",
            height: "92%",
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          background: isActive
            ? "linear-gradient(180deg, #ce6c29 0%, #512b10 100%)"
            : "linear-gradient(180deg, #1e9ca5 0%, #0c2e33 100%)",
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          clipPath: clipPathInside,
          zIndex: "20",
          transition: "width 250ms ease, height 250ms ease",
        },
      }}
    >
      <Box
        sx={{
          zIndex: "50",
          fontSize: "1rem",
          whiteSpace: "nowrap",
          fontFamily: font,
        }}
      >
        {name}
      </Box>
    </Box>
  );
};

export default AvatarSectionButton;
