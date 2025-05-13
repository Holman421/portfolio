import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import SectionWrapper from "../Components/SectionWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  setApplyFirstAppearTransition,
  setSelectedMode,
  setShowAboutMeContainers,
  setShowSkillsContainers,
} from "../Redux/reducers/avatarReducer";
import { StoreType } from "../Redux/store/store";
import AvatarSectionButton from "../Components/AvatarSectionButton";
import AvatarContainer from "../Components/AvatarSection/AvatarContainer";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AvatarSection: React.FC = () => {
  const { selectedMode, showAboutMeContainers, showSkillsContainers } = useSelector(
    (state: StoreType) => state.avatarState,
  );

  const { isDefaultLanguage } = useSelector((state: StoreType) => state.themeState);

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (isIntersecting) {
      setTimeout(() => {
        dispatch(setApplyFirstAppearTransition(false));
      }, 3000);
    }
  }, [isIntersecting, dispatch]);

  const handleSwitchModes = () => {
    dispatch(setShowAboutMeContainers(!showAboutMeContainers));
    dispatch(setShowSkillsContainers(!showSkillsContainers));

    if (selectedMode === "aboutMe") {
      dispatch(setSelectedMode("skills"));
    } else {
      dispatch(setSelectedMode("aboutMe"));
    }
  };

  useEffect(() => {
    if (selectedMode === "aboutMe") {
      dispatch(setShowAboutMeContainers(true));
      dispatch(setShowSkillsContainers(false));
    } else {
      dispatch(setShowAboutMeContainers(false));
      dispatch(setShowSkillsContainers(true));
    }
  }, [selectedMode]);

  return (
    <SectionWrapper
      nameForNavigation="#avatar"
      index={2}
      sx={{
        position: "relative",
        minHeight: "70vh",
        background:
          "radial-gradient(68.7% 37.25% at 74.93% 53.56%, rgba(207, 108, 41, 0.24) 0%, rgba(0, 0, 0, 0.00) 100%)",
      }}
    >
      <SectionHeading
        engHeadingText={selectedMode === "aboutMe" ? "About me" : "Skills"}
        czHeadingText={selectedMode === "aboutMe" ? "Kdo jsem" : "Dovednosti"}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          width: "100%",
          height: "1px",
        }}
        ref={ref}
      />
      <AvatarContainer isIntersecting={isIntersecting} />
      <Box
        sx={{
          position: "relative",
          marginTop: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "clamp(4.5rem, 10%, 10rem)",
        }}
      >
        <AvatarSectionButton
          handleSwitchModes={handleSwitchModes}
          isActive={selectedMode === "aboutMe"}
          name={isDefaultLanguage ? "About" : "Kdo jsem"}
          handleSwitchModesArgument="aboutMe"
          isIntersecting={isIntersecting}
        />
        <AvatarSectionButton
          handleSwitchModes={handleSwitchModes}
          isActive={selectedMode === "skills"}
          name={isDefaultLanguage ? "Skills" : "Dovednosti"}
          handleSwitchModesArgument="skills"
          isIntersecting={isIntersecting}
        />
      </Box>
    </SectionWrapper>
  );
};

export default AvatarSection;
