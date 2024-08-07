import { Box, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/store/store";
import useScreenSize from "../../Utils/CustomHooks/useScreenSize";
import useSelectAppropriateText from "../../Utils/CustomHooks/useSelectAppropriateText";
import {
  breakpointLower650px,
  breakpointLower800px,
} from "../../Utils/HelperFunctions/breakpoints";
import { createClipPath } from "../../Utils/HelperFunctions/createClipPath";
import AbstractDescBars from "../AbstractDescBars";
import GlossElement from "../GlossElement";
import Shadows from "../Shadows/Shadows";
import useFuturisticTextEffect from "../../Utils/CustomHooks/useFuturisticTextEffect";
import { lightFlickering } from "../../Utils/HelperFunctions/animations";
import useCleanupValue from "../../Utils/CustomHooks/useCleanupValue";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type AbstractionBarsProps = { isIntersecting: boolean };

const AbstractionBars: React.FC<AbstractionBarsProps> = ({ isIntersecting }) => {
  const isBellow650 = useScreenSize(650, "bellow");

  return (
    <Box
      sx={{
        position: "absolute",
        right: "-2.5rem",
        top: "-3.5rem",
        transition: "all 600ms ease",
        ...breakpointLower650px({
          top: "-9.5rem",
          right: "-1.5rem",
          transform: "scale(.7)",
        }),
      }}
    >
      <AbstractDescBars startDelay={3400} />
      <Box
        sx={{
          position: "absolute",
          bottom: "-2px",
          left: "0rem",
          width: isIntersecting ? "4rem" : "0",
          height: isBellow650 ? "2px" : ".5px",
          backgroundColor: "#CF6C29",
          transition: "width 300ms ease 3200ms",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-2.25rem",
          left: "-2.1rem",
          width: isIntersecting ? "3rem" : "0",
          height: isBellow650 ? "2px" : ".5px",
          backgroundColor: "#CF6C29",
          transform: "rotate(-45deg)",
          transformOrigin: "left",
          transition: "all 300ms ease 2900ms",
        }}
      />
    </Box>
  );
};

const DescriptionContainer = () => {
  const isBellow650 = useScreenSize(650, "bellow");

  const { clipPathOutside: clipPathOutsideSmall, clipPathInside: clipPathInsideSmall } =
    createClipPath<9>(
      [
        {
          x: "0%",
          y: `0% + ${isBellow650 ? "1rem" : "2rem"}`,
        },
        {
          x: `0% + ${isBellow650 ? "8.2rem" : "8.5rem"}`,
          y: `0% + ${isBellow650 ? "1rem" : "2rem"}`,
        },
        {
          x: `0% + ${isBellow650 ? "9.2rem" : "10.5rem"}`,
          y: "0%",
        },
        { x: "100%", y: "0%" },
        { x: "100%", y: "100% - 1rem" },
        { x: "100% - 1rem", y: "100% " },
        { x: "0% + 1rem", y: "100% " },
        { x: "0%", y: "100% - 1rem" },
        { x: "0%", y: "100% - 1rem" },
      ],
      [
        { x: "+ 1px", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "", y: "+ 1px" },
        { x: "+ 1px", y: "+ 1px" },
        { x: "- 1px", y: "" },
        { x: "", y: "- 1px" },
        { x: "", y: "- 1px" },
        { x: "+ 1px", y: "" },
        { x: "+ 1px", y: "" },
      ],
    );

  const { clipPathOutside, clipPathInside } = createClipPath<9>(
    [
      { x: "0%", y: "0% + 2rem" },
      { x: "0% + 2rem", y: "0%" },
      { x: "100% - 1rem", y: "0%" },
      { x: "100%", y: "0% + 1rem" },
      { x: "100%", y: "100% - 1rem" },
      { x: "100% - 1rem", y: "100%" },
      { x: "0% + 8.5rem", y: "100%" },
      { x: "0% + 7.5rem", y: "100% - 1rem" },
      { x: "0%", y: "100% - 1rem" },
    ],
    [
      { x: "+ 1px", y: "" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "- 1px", y: "" },
      { x: "- 1px", y: "" },
      { x: "", y: "- 1px" },
      { x: "", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
    ],
  );

  const {
    clipPathOutside: clipPathOutsideInitial,
    clipPathInside: clipPathInsideInitial,
  } = createClipPath<9>(
    [
      { x: "0%", y: "0%" },
      { x: "0%", y: "0%" },
      { x: "100%", y: "0%" },
      { x: "100%", y: "0%" },
      { x: "100%", y: "100%" },
      { x: "100%", y: "100%" },
      { x: "0% + 10rem", y: "100%" },
      { x: "0% + 9rem", y: "100%" },
      { x: "0%", y: "100%" },
    ],
    [
      { x: "+ 1px", y: "" },
      { x: "", y: "+ 1px" },
      { x: "", y: "+ 1px" },
      { x: "- 1px", y: "" },
      { x: "- 1px", y: "" },
      { x: "", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
      { x: "+ 1px", y: "- 1px" },
    ],
  );

  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const descriptionText = useSelectAppropriateText(
    "I am a front-end developer",
    "Jsem front-end vývojář",
  );

  const descriptionText2 = useSelectAppropriateText(
    "specializing in React.js",
    "specializující se na React.js",
  );

  const { text: descriptionTextFutureEffect, trigger: triggerDescriptionTextAnimation } =
    useFuturisticTextEffect(descriptionText, 25);

  const {
    text: descriptionTextFutureEffect2,
    trigger: triggerDescriptionTextAnimation2,
  } = useFuturisticTextEffect(descriptionText2, 25);

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
        triggerDescriptionTextAnimation();
        triggerDescriptionTextAnimation2();
      },
      null,
      1,
    );
  });

  const font = useSelectAppropriateText("'Orbitron', sans-serif", "'Exo 2', sans-serif");

  const { isDefaultLanguage } = useSelector((state: StoreType) => state.themeState);

  const transitionTiming = useCleanupValue("2400", "0", 3500);

  const clipPathTiming = useCleanupValue("1900", "0", 3500);

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        display: "block",
        width: "20rem",
        aspectRatio: "100/33",
        transform: isIntersecting ? "translate()" : "translate(8rem, 2rem)",
        opacity: isIntersecting ? "1" : "0",
        transition: `opacity 600ms ease-in 300ms, transform 600ms ease ${transitionTiming}ms, width 600ms ease, aspect-ratio 600ms ease, margin 600ms ease`,
        margin: "-1.8rem 0 0 9.2rem",
        animation: isIntersecting
          ? `${lightFlickering()} 850ms ease-in-out forwards 200ms`
          : "",
        ...breakpointLower650px({
          margin: "-.9rem 0 0 1rem",
          width: "16rem",
          aspectRatio: "100/35",
        }),
        ...breakpointLower800px({
          transform: isIntersecting ? "translate()" : "translate(1.5rem, 2rem)",
        }),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-1.6rem",
          right: "-4rem",
          zIndex: "30",
          ...breakpointLower650px({
            right: "-5.5rem",
          }),
        }}
      >
        <GlossElement></GlossElement>
      </Box>

      <Shadows zIndex="20" right="1.8rem" rightSmall="0rem" scale={0.7} />

      <AbstractionBars isIntersecting={isIntersecting} />

      <Box
        sx={{
          position: "absolute",
          clipPath: isIntersecting ? clipPathOutside : clipPathOutsideInitial,
          background: "rgba(41, 196, 206)",
          width: "100%",
          height: "100%",
          zIndex: "10",
          transition: `clip-path 400ms ease-in ${clipPathTiming}ms`,
          ...breakpointLower650px({
            clipPath: isIntersecting ? clipPathOutsideSmall : clipPathOutsideInitial,
          }),
          "&::before": {
            content: '""',
            position: "absolute",
            background: `linear-gradient(${
              isBellow650 ? "180" : "-90"
            }deg, #1e9ca5 -0%, #0c2e33 100%)`,
            width: "100%",
            height: "100%",
            clipPath: isIntersecting ? clipPathInside : clipPathInsideInitial,
            zIndex: "20",
            transition: `clip-path 400ms ease-in ${clipPathTiming}ms`,
            ...breakpointLower650px({
              clipPath: isIntersecting ? clipPathInsideSmall : clipPathInsideInitial,
            }),
          },
        }}
      >
        <Typography
          sx={{
            position: "relative",
            marginLeft: "2.5rem",
            marginTop: isDefaultLanguage ? "1.3rem" : "1rem",
            fontSize: isDefaultLanguage ? "1rem" : "1.2rem",
            width: "16rem",
            zIndex: "30",
            fontFamily: font,
            fontWeight: "300",
            whiteSpace: "nowrap",
            ...breakpointLower650px({
              marginLeft: "1.5rem",
              marginTop: isDefaultLanguage ? "1.7rem" : "1.4rem",
              fontSize: isDefaultLanguage ? ".9rem" : "1rem",
            }),
          }}
        >
          {descriptionTextFutureEffect}
          <br />
          {descriptionTextFutureEffect2}
        </Typography>
      </Box>
    </Box>
  );
};

export default DescriptionContainer;
