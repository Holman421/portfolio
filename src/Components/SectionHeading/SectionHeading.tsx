import React, { useRef } from "react";
import { mainFont, secondaryFont } from "../../Config/Fonts";
import useSelectAppropriateText from "../../Utils/CustomHooks/useSelectAppropriateText";
import useFuturisticTextEffect from "../../Utils/CustomHooks/useFuturisticTextEffect";
import "./SectionHeading.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionHeadingProps = {
  engHeadingText: string;
  czHeadingText: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
  engHeadingText,
  czHeadingText,
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isDefaultFont =
    useSelectAppropriateText(mainFont, secondaryFont) === "'Orbitron', sans-serif";

  const actualHeading = useSelectAppropriateText(engHeadingText, czHeadingText);

  const { text, trigger: triggerHeadingAnimation } =
    useFuturisticTextEffect(actualHeading);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "top 25%",
        toggleActions: "play none none none",
      },
    });

    tl.call(() => triggerHeadingAnimation());
  });

  return (
    <h2 ref={headingRef} className={`heading ${!isDefaultFont && "secondaryFont"}`}>
      {text}
    </h2>
  );
};

export default SectionHeading;
