import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import ContactMeFixedButton from "../Components/ContactMeFixedButton";
import SectionWrapper from "../Components/SectionWrapper";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import ContactMeButton from "../Components/ContactMeButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DownloadIcon from "@mui/icons-material/Download";
import { breakpointLower650px } from "../Utils/HelperFunctions/breakpoints";
import useSelectAppropriateText from "../Utils/CustomHooks/useSelectAppropriateText";
import Holman_CV from "../Assets/Holman_CV.pdf";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactMeSection: React.FC = () => {
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

  const copyrightText = useSelectAppropriateText(
    `© ${new Date().getFullYear()} Ales Holman. All rights reserved`,
    `© ${new Date().getFullYear()} Ales Holman. Všechna práva vyhrazena.`,
  );

  return (
    <SectionWrapper
      nameForNavigation="#contactMe"
      index={3}
      sx={{
        marginTop: "10rem",
        minHeight: "27rem !important",
        ...breakpointLower650px({
          minHeight: "31rem !important",
        }),
      }}
    >
      <SectionHeading engHeadingText="Contact me" czHeadingText="Kontaktuj mě" />

      <Box
        sx={{
          position: "absolute",
          right: isIntersecting ? "50%" : "1.5rem",
          marginTop: "2rem",
          padding: "1rem",
          transition:
            "right 500ms ease, width 500ms ease 500ms, height 500ms ease 1000ms",
          transform: "translateX(50%)",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          ...breakpointLower650px({
            marginTop: "0rem",
            flexDirection: "column",
          }),
        }}
      >
        <a href="mailto:ales.holman@mensa.cz">
          <ContactMeButton isIntersecting={isIntersecting}>
            <AlternateEmailIcon sx={{ marginRight: ".5rem" }} />
            ales.holman@mensa.cz
          </ContactMeButton>
        </a>
        <a
          href="https://www.linkedin.com/in/alesholman/"
          target="_blank"
          rel="noreferrer"
        >
          <ContactMeButton>
            <LinkedInIcon sx={{ marginRight: ".5rem" }} />
            Linkedin
          </ContactMeButton>
        </a>
        <a href="https://github.com/Holman421" target="_blank" rel="noreferrer">
          <ContactMeButton isIntersecting={isIntersecting}>
            <GitHubIcon sx={{ marginRight: ".5rem" }} />
            Github
          </ContactMeButton>
        </a>
      </Box>
      <Box ref={ref} sx={{ marginTop: "2rem" }}>
        <ContactMeFixedButton isIntersecting={isIntersecting} />
      </Box>
      <a href={Holman_CV} rel="noreferrer" target="_blank">
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            transform: "translateX(50%)",
            right: "50%",
            top: "18rem",
            opacity: isIntersecting ? 1 : 0,
            transition: "opacity 500ms ease 500ms",
            ...breakpointLower650px({
              top: "22rem",
            }),
          }}
        >
          <ContactMeButton isIntersecting={isIntersecting}>
            <DownloadIcon sx={{ marginRight: ".5rem" }} />
            Download CV
          </ContactMeButton>
        </Box>
      </a>
      <Box
        sx={{
          position: "absolute",
          bottom: ".7rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: ".8rem",
          textAlign: "center",
        }}
      >
        {copyrightText}
      </Box>
    </SectionWrapper>
  );
};

export default ContactMeSection;
