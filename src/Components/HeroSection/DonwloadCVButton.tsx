import { useRef, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import Holman_CV from "../../Assets/Holman_CV.pdf";
import { createClipPath } from "../../Utils/HelperFunctions/createClipPath";
import Box from "@mui/material/Box";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DonwloadCVButton = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 75%",
        end: "top 25%",
        toggleActions: "play none none none",
      },
    });

    tl.call(
      () => {
        setIsIntersecting(true);
      },
      null,
      0,
    );
  });

  const { clipPathOutside, clipPathInside } = createClipPath<6>(
    [
      { x: "0%", y: "0%" },
      { x: "100% - .25rem", y: "0%" },
      { x: "100%", y: "0% + .25rem" },
      { x: "100%", y: "100% - .25rem" },
      { x: "100% - .25rem", y: "100%" },
      { x: "0% + 1.3rem", y: "100%" },
    ],
    [
      { x: "+ 2px", y: "+ 1px" },
      { x: "- 1px", y: "+ 1px" },
      { x: "- 1px", y: "" },
      { x: "- 1px", y: "" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
    ],
  );

  return (
    <Box
      sx={{
        position: "relative",
        left: "12.3rem",
        top: "1.3rem",
        width: "fit-content",
        zIndex: "10",
      }}
    >
      <a href={Holman_CV} rel="noreferrer" target="_blank">
        <Box
          ref={ref}
          sx={{
            transition: "all 200ms ease 3000ms",
            opacity: isIntersecting ? "1" : "0",
            background: "#CF6C29",
            clipPath: clipPathOutside,
            height: "1.3rem",
            width: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              background: "linear-gradient(180deg, #ce6c29 0%, #512b10 100%)",
              width: "100%",
              height: "100%",
              clipPath: clipPathInside,
              zIndex: "20",
            },
          }}
        >
          <Box
            sx={{
              zIndex: "21",
              fontSize: ".5rem",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".4rem",
              marginLeft: ".5rem",
              "& svg": {
                fontSize: ".75rem",
              },
            }}
          >
            <DownloadIcon />
            CV
          </Box>
        </Box>
      </a>
    </Box>
  );
};

export default DonwloadCVButton;
