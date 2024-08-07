import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../Redux/store/store";
import { mainPallete } from "../Config/Colors";
import useScreenSize from "../Utils/CustomHooks/useScreenSize";

type CustomCursorProps = {
  x: number;
  y: number;
};

const CustomCursor: React.FC<CustomCursorProps> = ({
  x,
  y,
}) => {
  // const offset = ".5rem";
  // const halfOffset = ".25rem";
  // const [clipPathOutside, clipPathInside] = useMemo(() => {
  //   const { clipPathOutside, clipPathInside } =
  //     createClipPath<6>(
  //       [
  //         { x: `50% - ${halfOffset}`, y: `0%` },
  //         { x: `50% + ${halfOffset}`, y: `0%` },
  //         { x: `100%`, y: `100% - ${offset}` },
  //         { x: `100% - ${offset}`, y: `100%` },
  //         { x: `${offset}`, y: `100%` },
  //         { x: `0%`, y: `100% - ${offset}` },
  //       ],
  //       [
  //         { x: "+ 1px", y: "" },
  //         { x: "", y: "" },
  //         { x: "", y: "" },
  //         { x: "", y: "" },
  //         { x: "", y: "" },
  //         { x: "", y: "" },
  //       ]
  //     );

  //   return [clipPathOutside, clipPathInside];
  // }, []);

  const { isCursorActive } = useSelector(
    (state: StoreType) => state.cursorState
  );

  const outsideWidth = ".75rem";
  const outsideHeight = isCursorActive ? "2px" : "1px";
  const crossHairWidth = isCursorActive ? "4px" : "2px";

  const color = isCursorActive
    ? mainPallete.mainLight
    : "white";

  const transition = "all 250ms ease-out";

  const isBellow650px = useScreenSize(650, "bellow");

  if (isBellow650px) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          zIndex: "10000",
          top: "0",
          left: "0",
          width: isCursorActive ? "30px" : "40px",
          height: isCursorActive ? "30px" : "30px",
          transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
          transition: transition,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "0rem",
            right: "0",
            width: outsideWidth,
            height: outsideHeight,
            background: color,
            transition: transition,
            "&::before": {
              content: '""',
              position: "absolute",
              right: "0",
              bottom: "0",
              width: outsideHeight,
              height: outsideWidth,
              background: color,
              transition: transition,
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "0rem",
            left: "0",
            width: outsideWidth,
            height: outsideHeight,
            background: color,
            transition: transition,
            "&::before": {
              content: '""',
              position: "absolute",
              left: "0",
              bottom: "0",
              width: outsideHeight,
              height: outsideWidth,
              background: color,
              transition: transition,
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "0rem",
            right: "0",
            width: outsideWidth,
            height: outsideHeight,
            background: color,
            transition: transition,
            "&::before": {
              content: '""',
              position: "absolute",
              right: "0",
              top: "0",
              width: outsideHeight,
              height: outsideWidth,
              background: color,
              transition: transition,
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "0rem",
            left: "0",
            width: outsideWidth,
            height: outsideHeight,
            background: color,
            transition: transition,
            "&::before": {
              content: '""',
              position: "absolute",
              left: "0",
              top: "0",
              width: outsideHeight,
              height: outsideWidth,
              background: color,
              transition: transition,
            },
          }}
        />
      </Box>
      <Box
        sx={{
          position: "fixed",
          transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
          zIndex: "10001",
          display: "flex",
          alingItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            zIndex: "10000",
            width: ".75rem",
            height: crossHairWidth,
            background: color,
            transform: `rotate(${
              isCursorActive ? 0 : 45
            }deg)`,
            pointerEvents: "none",
            transition: "all 250ms ease-out",
            "&::before": {
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              background: color,
              transform: `rotate(90deg)`,
              pointerEvents: "none",
              transition: "all 250ms ease-out",
            },
          }}
        ></Box>
      </Box>
    </>
  );
};

export default CustomCursor;
