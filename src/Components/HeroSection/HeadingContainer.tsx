import { Box, Typography } from "@mui/material";
import { createClipPath } from "../../Utils/HelperFunctions/createClipPath";
import GlossElement from "../GlossElement";
import Shadows from "../Shadows/Shadows";
import useSelectAppropriateText from "../../Utils/CustomHooks/useSelectAppropriateText";
import {
  breakpointLower650px,
  breakpointLower800px,
} from "../../Utils/HelperFunctions/breakpoints";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/store/store";
import AbstractDescBars from "../AbstractDescBars";
import useScreenSize from "../../Utils/CustomHooks/useScreenSize";
import { mainFont, secondaryFont } from "../../Config/Fonts";
import useFuturisticTextEffect from "../../Utils/CustomHooks/useFuturisticTextEffect";
import { lightFlickering2 } from "../../Utils/HelperFunctions/animations";
import useCleanupValue from "../../Utils/CustomHooks/useCleanupValue";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

type AbstractionBarsProps = { isIntersecting: boolean };

import gsap from "gsap";
const AbstractionBars: React.FC<AbstractionBarsProps> = ({ isIntersecting }) => {
  const isBellow650 = useScreenSize(650, "bellow");

  return (
    <Box
      sx={{
        position: "absolute",
        left: "-3rem",
        top: "12.75rem",
        transition: "all 600ms ease",
        ...breakpointLower650px({
          top: "16rem",
          left: "1rem",
          transform: "scale(.7)",
        }),
      }}
    >
      <AbstractDescBars startDelay={3400} />
      <Box
        sx={{
          position: "absolute",
          bottom: "-2px",
          left: "",
          width: "4rem",
          transform: isIntersecting ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "right",
          transition: "transform 300ms ease 3200ms",
          height: isBellow650 ? "2px" : ".5px",
          backgroundColor: "#CF6C29",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "3.4rem",
          right: "-56px",
          width: isIntersecting ? "5rem" : "0",
          transition: "all 300ms ease 2900ms",
          height: isBellow650 ? "2px" : ".5px",
          backgroundColor: "#CF6C29",
          transform: "rotate(-45deg)",
          transformOrigin: "right",
        }}
      />
    </Box>
  );
};

const HeadingContainer = () => {
  const isBellow650 = useScreenSize(650, "bellow");

  const { clipPathOutside, clipPathInside } = createClipPath<11>(
    [
      { x: "0%", y: "0% + 1rem" },
      { x: "0% + 1rem", y: "0%" },
      { x: "0% + 12rem", y: "0%" },
      { x: "0% + 13.5rem", y: "0% + 1.5rem" },
      { x: "100% - 1rem", y: "0% + 1.5rem" },
      { x: "100%", y: "0% + 2.5rem" },
      {
        x: "100%",
        y: `100% - ${isBellow650 ? "1rem" : "2rem"}`,
      },
      {
        x: `0% + ${isBellow650 ? "10rem" : "11rem"}`,
        y: `100% - ${isBellow650 ? "1rem" : "2rem"}`,
      },
      { x: "0% + 9rem", y: "100%" },
      { x: "0% + 1rem", y: "100%" },
      { x: "0%", y: "100% - 1rem" },
    ],
    [
      { x: "+ 1px", y: "" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "- 1px", y: "" },
      { x: "- 1px", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "+ 1px", y: "" },
    ],
  );

  const {
    clipPathOutside: clipPathOutsideInitial,
    clipPathInside: clipPathInsideInitial,
  } = createClipPath<11>(
    [
      { x: "0%", y: "0%" },
      { x: "0%", y: "0%" },
      { x: "0% + 12rem", y: "0%" },
      { x: "0% + 13.5rem", y: "0%" },
      { x: "100%", y: "0%" },
      { x: "100%", y: "0% + 2.5rem" },
      { x: "100%", y: `100%` },
      {
        x: `0% + ${isBellow650 ? "10rem" : "11rem"}`,
        y: `100%`,
      },
      { x: "0% + 9rem", y: "100%" },
      { x: "0% + 1rem", y: "100%" },
      { x: "0%", y: "100%" },
    ],
    [
      { x: "+ 1px", y: "" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "- 1px", y: "" },
      { x: "- 1px", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
    ],
  );

  const greetText = useSelectAppropriateText("Hello, my name is", "Ahoj, jmenuji se");

  const name = useSelectAppropriateText("Ales Holman", "Aleš Holman");

  const font = useSelectAppropriateText(mainFont, secondaryFont);

  const { isDefaultLanguage } = useSelector((state: StoreType) => state.themeState);

  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const { text: nameFutureEffect, trigger: triggerNameTextAnimation } =
    useFuturisticTextEffect(name);

  const { text: greetTextFutureEffect, trigger: triggerGreetTextAnimation } =
    useFuturisticTextEffect(greetText);

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
    ).call(
      () => {
        triggerNameTextAnimation();
        triggerGreetTextAnimation();
      },
      null,
      1,
    );
  });

  const transitionTiming = useCleanupValue("2400", "0", 3500);

  const clipPathTiming = useCleanupValue("1900", "0", 3500);

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        display: "inline-block",
        transform: isIntersecting ? "translate()" : "translate(-8rem, -2rem)",
        opacity: isIntersecting ? "1" : "0",
        transition: `opacity 600ms ease-in 300ms, transform 600ms ease ${transitionTiming}ms, width 600ms ease`,
        width: "22rem",
        aspectRatio: "22/11",
        animation: isIntersecting
          ? `${lightFlickering2()} 700ms ease-in-out forwards 200ms`
          : "",
        ...breakpointLower650px({
          width: "17rem",
          aspectRatio: "100/45",
        }),

        ...breakpointLower800px({
          transform: isIntersecting ? "translate()" : "translate(-1.5rem, -1.5rem)",
        }),
      }}
    >
      <AbstractionBars isIntersecting={isIntersecting} />
      <Box
        sx={{
          clipPath: isIntersecting ? clipPathOutside : clipPathOutsideInitial,
          backgroundColor: "rgba(41, 196, 206)",
          width: "100%",
          height: "100%",
          position: "absolute",
          transition: `clip-path 400ms ease-in ${clipPathTiming}ms`,
          "&::before": {
            content: '""',
            position: "absolute",
            background: "linear-gradient(180deg, #1e9ca5 0%, #0c2e33 100%)",
            width: "100%",
            height: "100%",
            clipPath: isIntersecting ? clipPathInside : clipPathInsideInitial,
            transition: `clip-path 400ms ease-in ${clipPathTiming}ms`,
            zIndex: "20",
          },
        }}
      >
        <Shadows zIndex="20" left="8rem" leftSmall="3rem" scale={1} />

        <Typography
          sx={{
            position: "absolute",
            fontSize: isDefaultLanguage ? "1rem" : "1.2rem",
            zIndex: "30",
            left: "2rem",
            top: "1.75rem",
            fontFamily: font,
            transition: "top 600ms ease-in, left 600ms ease-in",
            ...breakpointLower650px({
              top: "1rem",
              left: "1.5rem",
              fontSize: isDefaultLanguage ? ".9rem" : "1rem",
            }),
          }}
        >
          {greetTextFutureEffect}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            fontSize: isDefaultLanguage ? "2.5rem" : "3rem",
            zIndex: "30",
            fontFamily: font,
            top: "55%",
            left: "2rem",
            whiteSpace: "nowrap",
            transform: "translateY(-50%)",
            ...breakpointLower650px({
              top: "4.2rem",
              left: "1.5rem",
              fontSize: "2.05rem",
            }),
          }}
        >
          {nameFutureEffect}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "-1.55rem",
          left: "1.5rem",
          zIndex: "300",
        }}
      >
        <GlossElement />
      </Box>
    </Box>
  );
};

export default HeadingContainer;
