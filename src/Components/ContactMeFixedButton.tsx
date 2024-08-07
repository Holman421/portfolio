import { Box } from "@mui/material";
import React from "react";
import { createClipPath } from "../Utils/HelperFunctions/createClipPath";
import { breakpointLower650px } from "../Utils/HelperFunctions/breakpoints";
import { useDispatch } from "react-redux";
import { toggleCursor } from "../Redux/reducers/cursorReducer";
import { Link } from "react-scroll";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

type ContactMeFixedButtonProps = {
  isIntersecting: boolean;
};

const ContactMeFixedButton: React.FC<
  ContactMeFixedButtonProps
> = ({ isIntersecting }) => {
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
    <Link
      to="#contactMe"
      spy={true}
      smooth={true}
      offset={50}
      duration={2000}
    >
      <Box
        onMouseEnter={() => {
          dispatch(toggleCursor(true));
        }}
        onMouseLeave={() => {
          dispatch(toggleCursor(false));
        }}
        sx={{
          display: isIntersecting ? "none" : "flex",
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "3rem",
          height: "3rem",
          transition: "all 500ms ease",
          background: "#CF6C29",
          clipPath: clipPathOutside,
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          ...breakpointLower650px({
            right: "1rem",
            bottom: "1rem",
          }),
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
            fontSize: "1.25rem",
            width: "1rem",
            height: "1rem",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LocalPostOfficeIcon />
        </Box>
      </Box>
    </Link>
  );
};

export default ContactMeFixedButton;
