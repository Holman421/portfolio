import React, { useRef } from "react";
import GlossElement from "../../../GlossElement";
import Shadows from "../../../Shadows/Shadows";
import useFuturisticTextEffect from "../../../../Utils/CustomHooks/useFuturisticTextEffect";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import "./ProjectLeftPart.scss";
import { addFlickeringAnimation } from "../../../../Utils/HelperFunctions/animations";

gsap.registerPlugin(ScrollTrigger);

type ProjectLeftPartProps = {
  projectName: string;
  projectNumber: string;
};

const ProjectLeftPart: React.FC<ProjectLeftPartProps> = ({
  projectName,
  projectNumber,
}) => {
  const { text: projectNameFutureEffect, trigger: triggerNameAnimation } =
    useFuturisticTextEffect(projectName);

  const { text: projectNumberFutureEffect, trigger: triggerNumberAnimation } =
    useFuturisticTextEffect(projectNumber);

  const leftContainerRef = useRef<HTMLDivElement>(null);
  const leftPartRef = useRef<HTMLDivElement>(null);
  const leftPartInnerRef = useRef<HTMLDivElement>(null);
  const glossElementRef = useRef<HTMLDivElement>(null);

  const clipPath = {
    start:
      "polygon(0 0, 0 0, calc(100% - 0) 0%, 100% 0, 100% 100%, 8rem 100%, 7rem calc(100% - 0), 0 calc(100% - 0), 0% calc(100% - 0))",
    end: "polygon(0 1rem, 1rem 0, calc(100% - 2rem) 0%, 100% 2rem, 100% 100%, 8rem 100%, 7rem calc(100% - 1rem), 1rem calc(100% - 1rem), 0% calc(100% - 2rem))",
  };
  const clipPathInner = {
    start:
      "polygon(1px 0, 0 1px, calc(100% - 0) 1px, calc(100% - 1px) 0, calc(100% - 1px) calc(100% - 1px), 8rem calc(100% - 1px), 7rem calc(100% - 1px), 1rem calc(100% - 1px), 1px calc(100% - 0))",
    end: "polygon(1px 1rem, 1rem 1px, calc(100% - 2rem) 1px, calc(100% - 1px) 2rem, calc(100% - 1px) calc(100% - 1px), 8rem calc(100% - 1px), 7rem calc(100% - 17px), 1rem calc(100% - 17px), 1px calc(100% - 2rem))",
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 800px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftPartRef.current,
          start: "top 80%",
          end: "top 25%",
          toggleActions: "play none none none",
        },
      });

      addFlickeringAnimation(tl, leftPartRef.current!);

      tl.from(leftPartRef.current, {
        opacity: 0,
        duration: 0.8,
      })
        .call(
          () => {
            triggerNameAnimation();
            triggerNumberAnimation();
          },
          null,
          1,
        )
        .fromTo(
          leftPartRef.current,
          { clipPath: clipPath.start },
          { clipPath: clipPath.end, duration: 0.4 },
          "-=.75",
        )
        .fromTo(
          leftPartInnerRef.current,
          { clipPath: clipPathInner.start },
          { clipPath: clipPathInner.end, duration: 0.4 },
          "-=.75",
        )
        .from(
          leftPartRef.current,
          {
            top: "3rem",
            left: "-3rem",
            duration: 0.4,
          },
          "-=.4",
        )
        .from(glossElementRef.current, {
          opacity: 0,
        });
    });

    mm.add("(max-width: 799px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftPartRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none none",
          markers: true,
        },
      });

      addFlickeringAnimation(tl, leftPartRef.current);

      tl.call(
        () => {
          triggerNameAnimation();
          triggerNumberAnimation();
        },
        null,
        0,
      )
        .from(leftPartRef.current!, {
          opacity: 0,
          duration: 0.8,
        })
        .fromTo(
          leftPartRef.current,
          { clipPath: clipPath.start },
          { clipPath: clipPath.end, duration: 0.4 },
          "-=.75",
        )
        .fromTo(
          leftPartInnerRef.current,
          { clipPath: clipPathInner.start },
          { clipPath: clipPathInner.end, duration: 0.4 },
          "-=.75",
        )
        .from(
          leftPartRef.current,
          {
            top: "clamp(-1rem, -10vw, -5rem)",
            left: "clamp(1rem, 10vw, 5rem)",
            duration: 0.4,
          },
          "-=.3",
        )
        .from(glossElementRef.current, {
          opacity: 0,
        });
    });

    return () => {
      mm.revert();
    };
  });

  return (
    <div ref={leftContainerRef}>
      <div ref={leftPartRef} className={"projectLeftPart"}>
        <div ref={leftPartInnerRef} className="projectLeftPartInner">
          <div className="projectName">{projectNameFutureEffect}</div>
          <div className="projectNumber">{projectNumberFutureEffect}</div>
          <Shadows className="shadows" scale={0.8} />
        </div>
      </div>
      <div ref={glossElementRef} className={"glossElement"}>
        <GlossElement />
      </div>
    </div>
  );
};

export default ProjectLeftPart;
