import { Box } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";

const Header = () => {
   return (
      <Box
         sx={{
            margin: "2rem",
            height: "3.5rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "absolute",
            right: "2rem",
            // border: "1px solid white",
         }}
      >
         <Navbar />
      </Box>
   );
};

export default Header;
