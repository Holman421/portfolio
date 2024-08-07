import { Box } from "@mui/material";
import React from "react";
import { Element } from "react-scroll";
import { CurrentPageIndex } from "../Types/Types";
import useUpdateCurrentPage from "../Utils/CustomHooks/useUpdateCurrentPage";

type SectionWrapperProps = {
  nameForNavigation: string;
  index: CurrentPageIndex;
  sx?: any;
  children: React.ReactNode;
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  index,
  sx,
  children,
  nameForNavigation,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useUpdateCurrentPage(ref, index);

  return (
    <Element name={nameForNavigation}>
      <Box
        ref={ref}
        sx={{
          width: "100%",
          position: "relative",
          ...sx,
        }}
      >
        {children}
      </Box>
    </Element>
  );
};

export default SectionWrapper;
