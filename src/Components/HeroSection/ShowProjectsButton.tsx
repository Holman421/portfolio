import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import useSelectAppropriateText from "../../Utils/CustomHooks/useSelectAppropriateText";
import { breakpointLower650px } from "../../Utils/HelperFunctions/breakpoints";
import { createClipPath } from "../../Utils/HelperFunctions/createClipPath";
import { toggleCursor } from "../../Redux/reducers/cursorReducer";
import { mainPallete } from "../../Config/Colors";
import { Link } from "react-scroll";
import useFuturisticTextEffect from "../../Utils/CustomHooks/useFuturisticTextEffect";
import {
  lightFlickering3,
} from "../../Utils/HelperFunctions/animations";
import useCleanupValue from "../../Utils/CustomHooks/useCleanupValue";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ShowProjectsButton = () => {
  const { clipPathOutside: clipPathOutsideSmall, clipPathInside: clipPathInsideSmall } =
    createClipPath<8>(
      [
        { x: "0%", y: "0% + .5rem" },
        { x: "0%", y: "0%" },
        { x: "100% - 1rem", y: "0%" },
        { x: "100%", y: "0%" },
        { x: "100%", y: "100% - 1rem" },
        { x: "100% - 1rem", y: "100%" },
        { x: "0% + 1rem", y: "100%" },
        { x: "0%", y: "100% - 1rem" },
      ],
      [
        { x: "+ 1px", y: "+ 1px" },
        { x: "+ 1px", y: "+ 1px" },
        { x: "- 1px", y: "+ 1px" },
        { x: "- 1px", y: "+ 1px" },
        { x: "- 1px", y: "- 1px" },
        { x: "- 1px", y: "- 1px" },
        { x: "+ 1px", y: "- 1px" },
        { x: "+ 1px", y: "- 1px" },
      ],
    );

  const { clipPathOutside, clipPathInside } = createClipPath<8>(
    [
      { x: "0%", y: "0% + .5rem" },
      { x: "0% + .5rem", y: "0%" },
      { x: "100% - 1rem", y: "0%" },
      { x: "100%", y: "0% + 1rem" },
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
    ],
  );

  const {
    clipPathOutside: clipPathOutsideInitial,
    clipPathInside: clipPathInsideInitial,
  } = createClipPath<8>(
    [
      { x: "0%", y: "0%" },
      { x: "0%", y: "0%" },
      { x: "100%", y: "0%" },
      { x: "100%", y: "0%" },
      { x: "100%", y: "100%" },
      { x: "100%", y: "100%" },
      { x: "0%", y: "100%" },
      { x: "0%", y: "100%" },
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
    ],
  );

  const ref = useRef<HTMLButtonElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const descriptionText = useSelectAppropriateText("Show projects", "Ukázat projekty");

  const { text: descriptionTextFutureEffect, trigger: triggerDescriptionTextAnimation } =
    useFuturisticTextEffect(descriptionText);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 95%",
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
    ).call(
      () => {
        triggerDescriptionTextAnimation();
      },
      null,
      1,
    );
  });

  const font = useSelectAppropriateText("'Orbitron', sans-serif", "'Exo 2', sans-serif");

  const dispatch = useDispatch();
  const clipPathTiming = useCleanupValue("1900", "0", 3500);

  return (
    <Link to="#projects" spy={true} smooth={true} offset={50} duration={1400}>
      <Box
        ref={ref}
        component="button"
        onMouseEnter={() => {
          dispatch(toggleCursor(true));
        }}
        onMouseLeave={() => {
          dispatch(toggleCursor(false));
        }}
        sx={{
          transform: isIntersecting ? "translate()" : "translate(-2rem, 4rem)",
          opacity: isIntersecting ? "1" : "0",
          transition: `opacity 600ms ease-in 300ms, transform 600ms ease 2400ms, clip-path 600ms ease-in ${clipPathTiming}ms`,
          position: "relative",
          padding: "1rem 2.5rem",
          width: "11rem",
          height: "2.5rem",
          background: "#CF6C29",
          margin: "-.65rem 0 0 6.5rem",
          clipPath: isIntersecting ? clipPathOutside : clipPathOutsideInitial,
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            "&::before": {
              width: "97%",
              height: "94%",
            },
          },
          animation: isIntersecting
            ? `${lightFlickering3()} 1000ms ease-in-out forwards 200ms`
            : "",
          ...breakpointLower650px({
            clipPath: isIntersecting ? clipPathOutsideSmall : clipPathOutsideInitial,
            width: "14rem",
            height: "2.5rem",
            margin: ".35rem 0 0 2rem",
            transform: isIntersecting ? "translate()" : "translate(-2rem, 6rem)",
          }),
          "&::before": {
            content: '""',
            position: "absolute",
            background: `linear-gradient(0deg, ${mainPallete.secondaryGradientLight} 0%, ${mainPallete.secondaryGraidentDark} 100%)`,
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            clipPath: isIntersecting ? clipPathInside : clipPathInsideInitial,
            transition: `all 600ms ease-in, width 250ms ease, height 250ms ease, clip-path 600ms ease-in ${clipPathTiming}ms`,
            ...breakpointLower650px({
              clipPath: clipPathInsideSmall,
            }),
          },
        }}
      >
        <Box
          sx={{
            zIndex: "50",
            fontSize: "0.9rem",
            whiteSpace: "nowrap",
            fontFamily: font,
            ...breakpointLower650px({
              fontSize: "1rem",
            }),
          }}
        >
          {descriptionTextFutureEffect}
        </Box>
      </Box>
    </Link>
  );
};

export default ShowProjectsButton;
