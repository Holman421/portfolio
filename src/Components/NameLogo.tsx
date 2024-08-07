import { Box } from "@mui/material";
import { breakpointLower650px } from "../Utils/HelperFunctions/breakpoints";

const NameLogo = () => {
  return (
    <Box
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      sx={{
        position: "fixed",
        left: "2rem",
        top: "2rem",
        cursor: "pointer",
        zIndex: "2",
        transition: "all 600ms ease-in",
        fontSize: "2rem",
        ...breakpointLower650px({
          width: "3rem",
          top: "1.5rem",
          left: "1.5rem",
          fontSize: "1.3rem",
        }),
      }}
    >
      AH
    </Box>
  );
};

export default NameLogo;
