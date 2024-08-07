import { SxProps } from "@mui/material";

export const breakpointLower650px = (sx: object) => {
   return {
      "@media (max-width: 650px)": {
         ...sx,
      },
   };
};

export const breakpointLower800px = (sx: object) => {
   return {
      "@media (max-width: 800px)": {
         ...sx,
      },
   };
};

export const breakpointUp1300px = (sx: SxProps) => {
   return {
      "@media (min-width: 1300px)": {
         ...sx,
      },
   };
};
