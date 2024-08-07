import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "../Redux/reducers/themeReducer";
import { StoreType } from "../Redux/store/store";
import useSelectAppropriateText from "../Utils/CustomHooks/useSelectAppropriateText";
import { createClipPath } from "../Utils/HelperFunctions/createClipPath";
import { mainPallete } from "../Config/Colors";
import { toggleCursor } from "../Redux/reducers/cursorReducer";
import { breakpointLower650px } from "../Utils/HelperFunctions/breakpoints";

const LanguageSwitcher = () => {
  const isDefaultLanguage = useSelector(
    (state: StoreType) => state.themeState.isDefaultLanguage
  );

  const dispatch = useDispatch();

  const { clipPathOutside, clipPathInside } =
    createClipPath<8>(
      [
        { x: "0%", y: "0% + .25rem" },
        { x: "0% + .25rem", y: "0%" },
        { x: "100% - .25rem", y: "0%" },
        { x: "100%", y: "0% + .25rem" },
        { x: "100%", y: "100% - .25rem" },
        { x: "100% - .25rem", y: "100%" },
        { x: "0% + .25rem", y: "100%" },
        { x: "0%", y: "100% - .25rem" },
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

  return (
    <Box
      sx={{
        display: "flex",
        gap: ".75rem",
        margin: "2.25rem 2rem 0 0",
        ...breakpointLower650px({
          margin: "1.5rem 1.5rem 0 0",
        }),
        transition: "all 500ms ease",
      }}
    >
      <Box
        component={"button"}
        onClick={() => {
          dispatch(toggleLanguage(!isDefaultLanguage));
          // dispatch(toggleCursor(false));
        }}
        // onMouseEnter={() => {
        //   isDefaultLanguage || dispatch(toggleCursor(true));
        // }}
        // onMouseLeave={() => {
        //   isDefaultLanguage ||
        //     dispatch(toggleCursor(false));
        // }}
        sx={{
          position: "relative",
          border: "none",
          background: isDefaultLanguage
            ? mainPallete.secondaryLight
            : mainPallete.mainLight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          clipPath: clipPathOutside,
          padding: ".3rem .6rem",
          cursor: "pointer",
          "&:hover": {
            "&::before": {
              width: "90%",
              height: "85%",
            },
          },
          "&::before": {
            content: '""',
            position: "absolute",
            background: isDefaultLanguage
              ? "linear-gradient(180deg, #ce6c29 0%, #512b10 100%)"
              : "linear-gradient(180deg, #1e9ca5 0%, #0c2e33 100%)",
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            clipPath: clipPathInside,
            transition:
              "all 600ms ease-in, width 250ms ease, height 250ms ease",
          },
        }}
      >
        <Box
          sx={{
            zIndex: "50",
            fontSize: ".8rem",
            whiteSpace: "nowrap",
          }}
        >
          ENG
        </Box>
      </Box>

      <Box
        component={"button"}
        onClick={() => {
          dispatch(toggleLanguage(!isDefaultLanguage));
          dispatch(toggleCursor(false));
        }}
        onMouseEnter={() => {
          isDefaultLanguage && dispatch(toggleCursor(true));
        }}
        onMouseLeave={() => {
          isDefaultLanguage &&
            dispatch(toggleCursor(false));
        }}
        sx={{
          position: "relative",
          border: "none",
          background: isDefaultLanguage
            ? mainPallete.mainLight
            : mainPallete.secondaryLight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          clipPath: clipPathOutside,
          padding: ".3rem .6rem",
          cursor: "pointer",
          "&:hover": {
            "&::before": {
              width: "90%",
              height: "85%",
            },
          },
          "&::before": {
            content: '""',
            position: "absolute",
            background: isDefaultLanguage
              ? "linear-gradient(180deg, #1e9ca5 0%, #0c2e33 100%)"
              : "linear-gradient(180deg, #ce6c29 0%, #512b10 100%)",
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            clipPath: clipPathInside,
            transition:
              "all 600ms ease-in, width 250ms ease, height 250ms ease",
          },
        }}
      >
        <Box
          sx={{
            zIndex: "50",
            fontSize: ".8rem",
            whiteSpace: "nowrap",
          }}
        >
          CZ
        </Box>
      </Box>
    </Box>
  );
};

export default LanguageSwitcher;
