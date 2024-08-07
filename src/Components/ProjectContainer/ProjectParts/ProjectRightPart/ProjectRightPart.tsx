import React, { useRef } from "react";
import { Box } from "@mui/material";
import useSelectAppropriateText from "../../../../Utils/CustomHooks/useSelectAppropriateText";
import { createClipPath } from "../../../../Utils/HelperFunctions/createClipPath";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectRightPart.scss";
import { addFlickeringAnimation } from "../../../../Utils/HelperFunctions/animations";
import { useGSAP } from "@gsap/react";
import useFuturisticTextEffect from "../../../../Utils/CustomHooks/useFuturisticTextEffect";

gsap.registerPlugin(ScrollTrigger);

type ProjectRightPartProps = {
  technologies: string;
  description: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectRightPart: React.FC<ProjectRightPartProps> = ({
  technologies,
  description,
  isOpen,
  setIsOpen,
}) => {
  const rightPartRef = useRef<HTMLDivElement>(null);
  const rightPartInnerRef = useRef<HTMLDivElement>(null);

  const moreText = useSelectAppropriateText("More...", "Více...");
  const headingText = useSelectAppropriateText("Description", "Popis");
  const { text: moreTextFutureEffect, trigger: triggerMoreTextAnimation } =
    useFuturisticTextEffect(moreText);

  const clipPath = {
    start:
      "polygon(0 0rem, 0rem 0, calc(100% - 0rem) 0, 100% 0rem, 100% calc(100% - 0rem), calc(100% - 0rem) 100%, 0rem 100%, 0rem 0rem)",
    end: "polygon(0 1rem, 1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 2rem 100%, 2rem 3rem)",
  };
  const clipPathInner = {
    start:
      "polygon(1px 0rem, 0rem 1px, calc(100% - 0rem) 1px, calc(100% - 1px) 0rem, calc(100% - 1px) calc(100% - 0rem), calc(100% - 0rem) calc(100% - 1px), calc(0% + 0rem + 1px) calc(100% - 1px), calc(0% + 0rem + 1px) 3rem)",
    end: "polygon(1px 1rem, 1rem 1px, calc(100% - 1rem) 1px, calc(100% - 1px) 1rem, calc(100% - 1px) calc(100% - 1rem), calc(100% - 1rem) calc(100% - 1px), calc(0% + 2rem + 1px) calc(100% - 1px), calc(0% + 2rem + 1px) 3rem)",
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rightPartRef.current,
        start: "top+=97 80%",
        end: "top 25%",
        toggleActions: "play none none none",
      },
    });

    addFlickeringAnimation(tl, rightPartRef.current);

    tl.from(rightPartRef.current, {
      opacity: 0,
      duration: 0.8,
    })
      .fromTo(
        rightPartRef.current,
        { clipPath: clipPath.start },
        {
          clipPath: clipPath.end,
          duration: 0.4,
        },
        "-=.75",
      )
      .fromTo(
        rightPartInnerRef.current,
        { clipPath: clipPathInner.start },
        {
          clipPath: clipPathInner.end,
          duration: 0.4,
        },
        "-=.75",
      )
      .call(
        () => {
          triggerMoreTextAnimation();
        },
        null,
        1,
      )
      .from(
        rightPartRef.current,
        {
          top: "-3rem",
          left: "3rem",
          duration: 0.4,
        },
        "-=.4",
      );
  });

  return (
    <div
      ref={rightPartRef}
      className={`projectRightPart ${isOpen && "open"}`}
      onClick={() => {
        if (!isOpen) {
          setIsOpen(!isOpen);
        }
      }}
    >
      <div className={`headingText ${isOpen && "open"}`}>
        {isOpen ? headingText : moreTextFutureEffect}
      </div>
      <div
        ref={rightPartInnerRef}
        className={`projectRightPartInner  ${isOpen && "open"}`}
      >
        <div className={`descriptionText ${isOpen && "open"}`}>{description}</div>
        <div className={`technologiesText ${isOpen && "open"}`}>{technologies}</div>
        <button
          className={`crossButton ${isOpen && "open"}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>
    </div>
  );
};

export default ProjectRightPart;
