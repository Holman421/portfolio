import React from "react";
import { createClipPath } from "../Utils/HelperFunctions/createClipPath";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleCursor } from "../Redux/reducers/cursorReducer";

type ContactMeButtonProps = {
  children: React.ReactNode;
  isIntersecting?: boolean;
};

const ContactMeButton: React.FC<ContactMeButtonProps> = ({
  children,
  isIntersecting = true,
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

  const dispatch = useDispatch();

  return (
    <Box
      onMouseEnter={() => {
        dispatch(toggleCursor(true));
      }}
      onMouseLeave={() => {
        dispatch(toggleCursor(false));
      }}
      sx={{
        position: "relative",
        transition: "all 500ms ease 500ms",
        opacity: isIntersecting ? "1" : "0",
        background: "#CF6C29",
        clipPath: clipPathOutside,
        padding: ".75rem 1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          background:
            "linear-gradient(180deg, #ce6c29 0%, #512b10 100%)",
          width: "100%",
          height: "100%",
          clipPath: clipPathInside,
          zIndex: "20",
        },
      }}
    >
      <Box
        sx={{
          zIndex: "50",
          position: "relative",
          fontSize: "1rem",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ContactMeButton;
