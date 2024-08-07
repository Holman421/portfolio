import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

type SingleLoadTileProp = {
   currentLoadStatus: number;
   tileLoadStatus: number;
};

const SingleLoadTile: React.FC<SingleLoadTileProp> = ({
   currentLoadStatus,
   tileLoadStatus,
}) => {
   return (
      <Box
         sx={{
            width: ".75rem",
            height: "2.5rem",
            backgroundColor:
               currentLoadStatus > tileLoadStatus ? "#9AD3FD" : "#2F4656",
         }}
      />
   );
};

const LoadingBar: React.FC = () => {
   const [loadingState, setLoadingState] = useState(0);

   const loadingBarsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

   const updateLoadingState = () => {
      setLoadingState((previousState) => {
         if (previousState === loadingBarsArray.length) {
            return 0;
         } else {
            return previousState + 1;
         }
      });
   };

   useEffect(() => {
      setInterval(function () {
         updateLoadingState();
      }, 250);
   }, []);

   return (
      <Box sx={{ display: "inline-block", position: "relative" }}>
         <Box
            sx={{
               display: "flex",
               gap: ".2rem",
               position: "relative",
               border: "2px solid #2F4656",
               padding: ".2rem",
               width: "auto",
            }}
         >
            {loadingBarsArray.map((_, index) => (
               <SingleLoadTile
                  key={index}
                  currentLoadStatus={loadingState}
                  tileLoadStatus={index}
               />
            ))}
         </Box>
         <Box
            sx={{
               color: "#9AD3FD",
               position: "absolute",
               left: "50%",
               top: "-1.45rem",
               transform: "translateX(-50%)",
            }}
         >
            Loading
         </Box>
         <Box
            id="rightLineNextToLoading"
            sx={{
               position: "absolute",
               width: "1.2rem",
               height: "1px",
               backgroundColor: "#2F4656",
               top: "-.35rem",
               left: "73%",
               transform: "translateX(-50%) rotate(45deg)",
               ":after": {
                  content: '""',
                  position: "absolute",
                  width: ".5rem",
                  height: "1px",
                  backgroundColor: "#9AD3FD",
                  top: ".17rem",
                  left: "-.17rem",
                  transform: "translateX(-50%) rotate(-45deg)",
               },
            }}
         />
         <Box
            id="leftLineNextToLoading"
            sx={{
               position: "absolute",
               width: "1.2rem",
               height: "1px",
               backgroundColor: "#2F4656",
               top: "-.35rem",
               right: "65%",
               transform: "translateX(-50%) rotate(-45deg)",
               ":after": {
                  content: '""',
                  position: "absolute",
                  width: ".5rem",
                  height: "1px",
                  backgroundColor: "#9AD3FD",
                  bottom: "-.2rem",
                  right: "-.7rem",
                  transform: "translateX(-50%) rotate(45deg)",
                  // transformOrigin: "0 0",
               },
            }}
         />
      </Box>
   );
};

export default LoadingBar;
