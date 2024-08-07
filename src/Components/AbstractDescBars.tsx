import { useGSAP } from "@gsap/react";
import { Box } from "@mui/material";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { lightFlickering } from "../Utils/HelperFunctions/animations";

type Duo = {
  leftWidth: number;
  rightWidth: number;
};

type BarDuoProps = {
  widths: {
    leftWidth: number;
    rightWidth: number;
  };
  display: boolean;
  startDelay: number;
  colorScheme?: "normal" | "monochrome";
};

const BarDuo: React.FC<BarDuoProps> = ({
  widths,
  display,
  startDelay = 1300,
  colorScheme,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
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

  return (
    <Box
      ref={ref}
      sx={{
        opacity: "0",
        animation:
          isIntersecting && display
            ? `${lightFlickering()} 1000ms ease-in-out forwards ${startDelay}ms`
            : "",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10%",
        width: "100%",
        "& > *": { transition: "all 1000ms linear" },
      }}
    >
      <Box
        sx={{
          width: `${widths.leftWidth}%`,
          height: "3px",
          backgroundColor: colorScheme === "normal" ? "#CF6C29" : "#29C4CE",
        }}
      />
      <Box
        sx={{
          width: `${widths.rightWidth}%`,
          height: "1px",
          backgroundColor: "#29C4CE",
        }}
      />
    </Box>
  );
};

type AbstractDescBarsProps = {
  display?: boolean;
  startDelay?: number;
  colorScheme?: "normal" | "monochrome";
  version?: "aboutMe" | "normal";
};

const AbstractDescBars: React.FC<AbstractDescBarsProps> = ({
  display = true,
  startDelay,
  colorScheme = "normal",
  version = "normal",
}) => {
  const [duo1, setDuo1] = useState<Duo>({
    leftWidth: 25,
    rightWidth: 75,
  });
  const [duo2, setDuo2] = useState<Duo>({
    leftWidth: 50,
    rightWidth: 50,
  });
  const [duo3, setDuo3] = useState<Duo>({
    leftWidth: 75,
    rightWidth: 25,
  });

  useEffect(() => {
    const intervalFunctions = [
      createIntervalFunction(setDuo1),
      createIntervalFunction(setDuo2),
      createIntervalFunction(setDuo3),
    ];

    return () => {
      intervalFunctions.forEach((interval) => clearInterval(interval));
    };
  }, []);

  const createIntervalFunction = (setDuo: React.Dispatch<React.SetStateAction<Duo>>) => {
    const min = 500;
    const max = 1000;
    const interval = Math.floor(Math.random() * (max - min + 1) + min);

    return setInterval(() => {
      setDuo((prevDuo) => {
        const total = prevDuo.leftWidth + prevDuo.rightWidth;
        const leftWidth = Math.floor(Math.random() * total * 1);
        const rightWidth = total - leftWidth;
        return { leftWidth, rightWidth };
      });
    }, interval);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20%",
        width: "4rem",
        aspectRatio: "3/1",
      }}
    >
      {version === "aboutMe" ? (
        <>
          <BarDuo
            display={display}
            widths={duo1}
            startDelay={startDelay}
            colorScheme={colorScheme}
          />
          <BarDuo
            display={display}
            widths={duo2}
            startDelay={startDelay}
            colorScheme={colorScheme}
          />
        </>
      ) : (
        <>
          <BarDuo
            display={display}
            widths={duo1}
            startDelay={startDelay}
            colorScheme={colorScheme}
          />
          <BarDuo
            display={display}
            widths={duo2}
            startDelay={startDelay}
            colorScheme={colorScheme}
          />
          <BarDuo
            display={display}
            widths={duo3}
            startDelay={startDelay}
            colorScheme={colorScheme}
          />
        </>
      )}
    </Box>
  );
};

export default AbstractDescBars;
