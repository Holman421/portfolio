import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/store/store";
import {
  breakpointUp1300px,
  breakpointLower800px,
} from "../../Utils/HelperFunctions/breakpoints";

type CircleProps = {
  top?: string;
  left?: string;
  aboutName?: string;
  skillsName?: string;
  children?: React.ReactNode;
  opacity?: string;
  transition?: string;
};

const Circle: React.FC<CircleProps> = ({
  top,
  left,
  children,
  opacity = "1",
  transition,
}) => {
  const sizeBig = "1.75rem";
  const sizeNormal = "1.25rem";

  const { applyFirstAppearTransition } = useSelector(
    (state: StoreType) => state.avatarState
  );

  return (
    <Box
      sx={{
        position: "absolute",
        borderRadius: "50%",
        border: "3px solid #ce6c29",
        width: "1.25rem",
        aspectRatio: "1/1",
        top: "0",
        opacity: opacity,
        transform: "translate(-50%, -50%)",
        right: "-1.75rem",
        transition: applyFirstAppearTransition
          ? transition
          : "all 500ms ease",
        ...breakpointLower800px({
          width: "0rem",
          border: "0px solid black",
         //  visibility: "hidden",
          right: "-1.4rem",
        }),
        ...breakpointUp1300px({
          width: "1.75rem",
          right: "-2.5rem",
        }),
      }}
    >
      {children}
    </Box>
  );
};

export default Circle;
