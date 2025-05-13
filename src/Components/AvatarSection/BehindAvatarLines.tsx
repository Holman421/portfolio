import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/store/store";
import useScreenSize from "../../Utils/CustomHooks/useScreenSize";
import useSelectAppropriateText from "../../Utils/CustomHooks/useSelectAppropriateText";
import Circle from "../Vectors/Circle";
import Line from "../Vectors/Line";
import AboutMeInfoContainer from "./AboutMeInfoContainer";
import SkillContainer from "./SkillContainer";
import CourseaMetaCertificateAH from "../../Assets/CourseaMetaCertificateAH.pdf";
import UdemyCSSTailwindCertificateAH from "../../Assets/UdemyCSSTailwindCertificateAH.pdf";
import UdemyNextReactCertificateAH from "../../Assets/UdemyNextReactCertificateAH.pdf";
import UdemyJSTSCertificateAH from "../../Assets/UdemyJSTSCertificateAH.pdf";
import UdemyDataStructuresCertificateAH from "../../Assets/UdemyDataStructuresCertificateAH.pdf";

type BedingAvatarLinesProps = {
  isIntersecting: boolean;
};

const BehindAvatarLines: React.FC<BedingAvatarLinesProps> = ({ isIntersecting }) => {
  const isAbove800px = useScreenSize(800);

  const remainingMonthsUntilJuly = () => {
    const d = new Date();
    return (6 - d.getMonth() + 12) % 12 || 12;
  };

  const titleName = useSelectAppropriateText("Name", "Jméno");

  const titleLocation = useSelectAppropriateText("Location", "Lokace");
  const descriptionLocation = useSelectAppropriateText(
    "Prague in Czech Republic",
    "Praha, původem z Krkonoš",
  );

  const titleHobbies = useSelectAppropriateText("Hobbies", "Koníčky");
  const descriptionHobbies = useSelectAppropriateText(
    "Competetive ballroom dancing, gym and fitness, watching horror films, playing minecraft, listening to music such as Apashe and bbno$",
    "Závodní tancovaní, Posilovna a fitness, sledování filmů, obzvlášť hororů, hraní minecraftu, poslouchání hudby jako Apashe nebo bbno$",
  );

  const titleLevel = useSelectAppropriateText("Level", "Level");
  const descriptionLevel = useSelectAppropriateText(
    `${remainingMonthsUntilJuly()} months until lvl 26 (age)`,
    `${remainingMonthsUntilJuly()} měsíců do 26 levelu (věk)`,
  );

  const titleLanguages = useSelectAppropriateText("Languages", "Jazyky");
  const descriptionLanguages = useSelectAppropriateText(
    "Advanced english, native czech",
    "Pokročilá angličtina, rodilá čeština",
  );

  const titleGoals = useSelectAppropriateText("Goals", "Cíle");
  const descriptionGoals = useSelectAppropriateText(
    "Become an irreplaceable senior frontend developer",
    "Stát se nenahraditelným senior frontend developerem",
  );

  const { selectedMode } = useSelector((state: StoreType) => state.avatarState);

  const handleLineWidth = (widthAboutMe: string, widthSkills: string) => {
    if (!isIntersecting) {
      return "0";
    }
    if (selectedMode === "aboutMe") {
      return widthAboutMe;
    }
    return widthSkills;
  };

  const firstTransitionLine = "all 600ms ease-out 1150ms";
  const secondTransitionCircle = "all 200ms ease 1750ms";
  const thirdTransitionLine = "all 200ms linear 1950ms";
  const fourthTransitionLine = "all 200ms linear 2150ms";
  const fifthTransitioContainer = isAbove800px
    ? "all 300ms ease 2350ms"
    : "all 300ms ease 1700ms";

  const handleValuesForModes = (angleAboutMe: string, angleSkills: string) => {
    if (selectedMode === "aboutMe") {
      return angleAboutMe;
    }
    return angleSkills;
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "29",
      }}
    >
      <Line
        name="Name/React.js"
        length={handleLineWidth(
          isAbove800px ? "clamp(5rem, 15vw, 16rem)" : "clamp(5rem, 19vw, 16rem)",
          isAbove800px ? "clamp(4rem, 10vw, 16rem)" : "clamp(4rem, 15vw, 16rem)",
        )}
        angle={handleValuesForModes("-135deg", "-180deg")}
        transition={firstTransitionLine}
        shouldShrink={false}
      >
        <Circle opacity={isIntersecting ? "1" : "0"} transition={secondTransitionCircle}>
          <Line
            length={handleLineWidth("clamp(2rem, 5vw, 5rem)", "clamp(2rem, 4vw, 5rem)")}
            angle={handleValuesForModes("-45deg", "0")}
            top={handleValuesForModes(".0rem", ".3rem")}
            topBig={handleValuesForModes("0.2rem", ".65rem")}
            left={handleValuesForModes("0.9rem", "1rem")}
            leftBig={handleValuesForModes("1.3rem", "1.5rem")}
            transition={thirdTransitionLine}
          >
            <Line
              length={handleLineWidth("clamp(2rem, 6vw, 4rem)", "clamp(2rem, 3vw, 4rem)")}
              angle={handleValuesForModes("-135deg", "-225deg")}
              top="0"
              right="1px"
              transformOrigin="right"
              transition={fourthTransitionLine}
            >
              <AboutMeInfoContainer
                number="01"
                title={titleName}
                description="Aleš Holman"
                top=".7rem"
                topBig="0rem"
                left="-9rem"
                leftBig="-12rem"
                topSmall="-.7rem"
                leftSmall="-5.5rem"
                angle={handleValuesForModes("-45deg", "0deg")}
                transition={fifthTransitioContainer}
                opacity={isIntersecting ? "1" : "0"}
              />
              <SkillContainer
                title="React - Next.js"
                number="02"
                pdf={UdemyNextReactCertificateAH}
                angle={handleValuesForModes("0deg", "45deg")}
                top="-6.6rem"
                left="-11.3rem"
                topBig="-7rem"
                leftBig="-14.5rem"
                topSmall="-2.1rem"
                leftSmall="-6.2rem"
                orientation="left"
              />
            </Line>
          </Line>
        </Circle>
      </Line>
      <Line
        name="Meta"
        length={handleLineWidth(
          "clamp(5rem, 12vw, 16rem)",
          isAbove800px ? "clamp(4.5rem, 13vw, 16rem)" : "clamp(4.5rem, 19vw, 16rem)",
        )}
        angle={handleValuesForModes("-90deg", "-135deg")}
        transition={firstTransitionLine}
        opacity={handleValuesForModes("0", "1")}
        shouldShrink={false}
        applyFastOpacityTransition={true}
      >
        <Circle opacity={isIntersecting ? "1" : "0"} transition={secondTransitionCircle}>
          <Line
            length={handleLineWidth("clamp(2rem, 6vw, 5rem)", "clamp(2rem, 6vw, 5rem)")}
            angle={handleValuesForModes("-45deg", "-45deg")}
            top={handleValuesForModes("0.1rem", "0rem")}
            topBig={handleValuesForModes("0.2rem", ".2rem")}
            left={handleValuesForModes("0.9rem", ".9rem")}
            leftBig={handleValuesForModes("1.3rem", "1.3rem")}
            transition={thirdTransitionLine}
          >
            <Line
              length={handleLineWidth("clamp(2rem, 3vw, 4rem)", "clamp(2rem, 3vw, 4rem)")}
              angle={handleValuesForModes("-135deg", "-225deg")}
              top="0"
              right="1px"
              transformOrigin="right"
              transition={fourthTransitionLine}
            >
              <SkillContainer
                title={isAbove800px ? "Frontend Developer" : "Frontend dev"}
                number="01"
                pdf={CourseaMetaCertificateAH}
                angle={handleValuesForModes("0deg", "45deg")}
                top="-6.6rem"
                left="-11rem"
                topBig="-7rem"
                leftBig="-14.5rem"
                topSmall="-3rem"
                leftSmall="-6.6rem"
                orientation="left"
              />
            </Line>
          </Line>
        </Circle>
      </Line>
      <Line
        name="Location/Javascript"
        length={handleLineWidth(
          isAbove800px ? "clamp(4rem, 11vw, 12rem)" : "clamp(4rem, 16vw, 12rem)",
          isAbove800px ? "clamp(4.75rem, 13vw, 12rem)" : "clamp(4.75rem, 19vw, 12rem)",
        )}
        angle={handleValuesForModes("180deg", "135deg")}
        transition={firstTransitionLine}
        shouldShrink={false}
      >
        <Circle opacity={isIntersecting ? "1" : "0"} transition={secondTransitionCircle}>
          <Line
            length={handleLineWidth("clamp(2rem, 4vw, 5rem)", "clamp(2rem, 6vw, 5rem)")}
            angle={handleValuesForModes("0deg", "45deg")}
            top={handleValuesForModes("0.4rem", ".7rem")}
            topBig={handleValuesForModes("0.6rem", "1.2rem")}
            left={handleValuesForModes("1rem", ".8rem")}
            leftBig={handleValuesForModes("1.6rem", "1.3rem")}
            transition={thirdTransitionLine}
          >
            <Line
              length={handleLineWidth("clamp(2rem, 7vw, 4rem)", "clamp(2rem, 3vw, 4rem)")}
              angle={handleValuesForModes("-135deg", "-225deg")}
              top="0"
              right="1px"
              transformOrigin="right"
              transition={fourthTransitionLine}
            >
              <AboutMeInfoContainer
                number="02"
                title={titleLocation}
                description={descriptionLocation}
                top=".7rem"
                topBig=".2rem"
                left="-9rem"
                leftBig="-12.5rem"
                topSmall="-1.4rem"
                leftSmall="-5.4rem"
                angle={handleValuesForModes("-45deg", "0deg")}
                transition={fifthTransitioContainer}
                opacity={isIntersecting ? "1" : "0"}
              />
              <SkillContainer
                title="JS - TS"
                number="03"
                pdf={UdemyJSTSCertificateAH}
                angle={handleValuesForModes("0", "45deg")}
                top="-6.5rem"
                left="-11rem"
                topBig="-7rem"
                leftBig="-14.5rem"
                topSmall="-2.8rem"
                leftSmall="-5.7rem"
                orientation="left"
              />
            </Line>
          </Line>
        </Circle>
      </Line>
      <Line
        name="Goals"
        length={handleLineWidth(
          isAbove800px ? "clamp(4.5rem, 17vw, 18rem)" : "clamp(4.5rem, 19vw, 18rem)",
          "clamp(4.5rem, 13vw, 11rem)",
        )}
        angle={handleValuesForModes("135deg", "90deg")}
        transition={firstTransitionLine}
        opacity={handleValuesForModes("1", "0")}
        shouldShrink={false}
        applyFastOpacityTransition={true}
      >
        <Circle opacity={isIntersecting ? "1" : "0"} transition={secondTransitionCircle}>
          <Line
            length={handleLineWidth("clamp(2rem, 6vw, 13rem)", "clamp(2rem, 7vw, 13rem)")}
            angle={handleValuesForModes("45deg", "45deg")}
            top={handleValuesForModes(".7rem", ".1rem")}
            topBig="1.2rem"
            left={handleValuesForModes(".8rem", ".9rem")}
            leftBig="1.3rem"
            transition={thirdTransitionLine}
          >
            <Line
              length={handleLineWidth("clamp(1rem, 2vw, 5rem)", "clamp(1rem, 2vw, 5rem)")}
              angle={handleValuesForModes("225deg", "135deg")}
              top="0"
              right="1px"
              transformOrigin="right"
              transition={fourthTransitionLine}
            >
              <AboutMeInfoContainer
                number="03"
                title={titleGoals}
                description={descriptionGoals}
                top="0rem"
                topBig="-1.2rem"
                left="-10rem"
                leftBig="-14.5rem"
                topSmall="-1.8rem"
                leftSmall="-5.3rem"
                angle={handleValuesForModes("-45deg", "0")}
                transition={fifthTransitioContainer}
                opacity={isIntersecting ? "1" : "0"}
              />
            </Line>
          </Line>
        </Circle>
      </Line>
      <Line
        name="Level"
        length={handleLineWidth(
          isAbove800px ? "clamp(5rem, 16vw, 17rem)" : "clamp(5rem, 20vw, 17rem)",
          "clamp(4rem, 15vw, 17rem)",
        )}
        angle={handleValuesForModes("-45deg", "-90deg")}
        transition={firstTransitionLine}
        opacity={handleValuesForModes("1", "0")}
        shouldShrink={false}
        applyFastOpacityTransition={true}
      >
        <Circle opacity={isIntersecting ? "1" : "0"} transition={secondTransitionCircle}>
          <Line
            length={handleLineWidth("clamp(1rem, 8vw, 10rem)", "clamp(1rem, 7vw, 8rem)")}
            angle={handleValuesForModes("45deg", "45deg")}
            top={handleValuesForModes("0.6rem", "0.1rem")}
            topBig="1.1rem"
            left={handleValuesForModes(".9rem", ".9rem")}
            leftBig="1.3rem"
            transition={thirdTransitionLine}
          >
            <Line
              length={handleLineWidth(
                "clamp(1rem, 2vw, 4rem)",
                "clamp(2rem, 5vw, 15rem)",
              )}
              angle={handleValuesForModes("225deg", "135deg")}
              top="0"
              right="1px"
              transformOrigin="right"
              transition={fourthTransitionLine}
            >
              <AboutMeInfoContainer
                number="04"
                title={titleLevel}
                description={descriptionLevel}
                top="-.6rem"
                topBig="-0.5rem"
                left="-9.5rem"
                leftBig="-12.5rem"
                topSmall="-1.8rem"
                leftSmall="-5.45rem"
                angle={handleValuesForModes("135deg", "180deg")}
                transition={fifthTransitioContainer}
                opacity={isIntersecting ? "1" : "0"}
              />
            </Line>
          </Line>
        </Circle>
      </Line>
      <Line
        name="Languages/CSS"
        length={handleLineWidth(
          isAbove800px ? "clamp(4rem, 10vw, 11rem)" : "clamp(2rem, 14vw, 11rem)",
          isAbove800px ? "clamp(5.5rem, 15vw, 11rem)" : "clamp(5.5rem, 19vw, 11rem)",
        )}
        angle={handleValuesForModes("0", "-45deg")}
        transition={firstTransitionLine}
        shouldShrink={false}
      >
        <Circle opacity={isIntersecting ? "1" : "0"} transition={secondTransitionCircle}>
          <Line
            length={handleLineWidth("clamp(2rem, 6vw, 7rem)", "clamp(2rem, 6vw, 7rem)")}
            angle={handleValuesForModes("0deg", "45deg")}
            top={handleValuesForModes(".4rem", ".7rem")}
            topBig={handleValuesForModes(".6rem", "1.2rem")}
            left={handleValuesForModes("1rem", ".9rem")}
            leftBig={handleValuesForModes("1.6rem", "1.3rem")}
            transition={thirdTransitionLine}
          >
            <Line
              length={handleLineWidth("clamp(1rem, 2vw, 4rem)", "clamp(1rem, 2vw, 4rem)")}
              angle={handleValuesForModes("-135deg", "-225deg")}
              top="0"
              right="1px"
              transformOrigin="right"
              transition={fourthTransitionLine}
            >
              <AboutMeInfoContainer
                number="05"
                title={titleLanguages}
                description={descriptionLanguages}
                top="-1.2rem"
                topBig="-0.75rem"
                left="-10rem"
                leftBig="-14.7rem"
                topSmall="-2rem"
                leftSmall="-5.1rem"
                angle={handleValuesForModes("135deg", "180deg")}
                transition={fifthTransitioContainer}
                opacity={isIntersecting ? "1" : "0"}
              />
              <SkillContainer
                title="CSS - Tailwind"
                number="04"
                pdf={UdemyCSSTailwindCertificateAH}
                angle={handleValuesForModes("-180deg", "-135deg")}
                top="-4.1rem"
                left="-9.5rem"
                topBig="-5.95rem"
                leftBig="-14.2rem"
                topSmall="-2.5rem"
                leftSmall="-5.4rem"
                orientation="right"
              />
            </Line>
          </Line>
        </Circle>
      </Line>
      <Line
        name="Hobbies/Typescript"
        length={handleLineWidth(
          isAbove800px ? "clamp(6rem, 16.5vw, 16rem)" : "clamp(4rem, 18vw, 14rem)",
          isAbove800px ? "clamp(4rem, 10vw, 14rem)" : "clamp(3rem, 14vw, 14rem)",
        )}
        angle={handleValuesForModes("45deg", "0")}
        transition={firstTransitionLine}
        shouldShrink={false}
      >
        <Circle opacity={isIntersecting ? "1" : "0"} transition={secondTransitionCircle}>
          <Line
            length={handleLineWidth("clamp(1rem, 4vw, 12rem)", "clamp(1rem, 4vw, 12rem)")}
            angle={handleValuesForModes("-45deg", "0deg")}
            top={handleValuesForModes("0rem", ".4rem")}
            topBig={handleValuesForModes("0.1rem", ".7rem")}
            left={handleValuesForModes(".8rem", "1rem")}
            leftBig={handleValuesForModes("1.4rem", "1.5rem")}
            transition={thirdTransitionLine}
          >
            <Line
              length={handleLineWidth("clamp(2rem, 2vw, 7rem)", "clamp(2rem, 2vw, 4rem)")}
              angle={handleValuesForModes("-135deg", "-225deg")}
              top="0"
              right="1px"
              transformOrigin="right"
              transition={fourthTransitionLine}
            >
              <AboutMeInfoContainer
                number="06"
                title={titleHobbies}
                description={descriptionHobbies}
                top="-4rem"
                topBig="-4.9rem"
                left="-11rem"
                leftBig="-15.9rem"
                topSmall="-6.15rem"
                leftSmall="-7.2rem"
                angle={handleValuesForModes("135deg", "180deg")}
                transition={fifthTransitioContainer}
                opacity={isIntersecting ? "1" : "0"}
              />

              <SkillContainer
                title="Data structures"
                number="05"
                pdf={UdemyDataStructuresCertificateAH}
                angle={handleValuesForModes("-180deg", "-135deg")}
                top="-4.1rem"
                left="-9.5rem"
                topBig="-5.95rem"
                leftBig="-14rem"
                topSmall="-2.4rem"
                leftSmall="-5.6rem"
                orientation="right"
              />
            </Line>
          </Line>
        </Circle>
      </Line>
      <Line
        name="Next.js"
        length={handleLineWidth(
          "clamp(6rem, 10vw, 14rem)",
          isAbove800px ? "clamp(6rem, 14.5vw, 16rem)" : "clamp(3rem, 19vw, 16rem)",
        )}
        angle={handleValuesForModes("90deg", "45deg")}
        transition={firstTransitionLine}
        opacity={handleValuesForModes("0", "1")}
        shouldShrink={false}
        applyFastOpacityTransition={true}
      >
        <Circle opacity={isIntersecting ? "1" : "0"} transition={secondTransitionCircle}>
          <Line
            length={handleLineWidth("clamp(1rem, 6vw, 12rem)", "clamp(1rem, 4vw, 12rem)")}
            angle={handleValuesForModes("-45deg", "-45deg")}
            top={handleValuesForModes("0rem", "0rem")}
            topBig="0rem"
            left={handleValuesForModes(".9rem", ".9rem")}
            leftBig="1.3rem"
            transition={thirdTransitionLine}
          >
            <Line
              length={handleLineWidth(
                "clamp(2rem, 6vw, 7rem)",
                isAbove800px ? "clamp(2rem, 2vw, 4rem)" : "0",
              )}
              angle={handleValuesForModes("-135deg", "-225deg")}
              top="0"
              topSmall="-.4rem"
              right="1px"
              transformOrigin="right"
              transition={fourthTransitionLine}
            >
              <SkillContainer
                title="GSAP - Three.js"
                number="06"
                angle={handleValuesForModes("-180deg", "-135deg")}
                top="-4.1rem"
                left="-9.5rem"
                topBig="-5.95rem"
                leftBig="-14.2rem"
                topSmall="-2.8rem"
                leftSmall="-6.1rem"
                orientation="right"
                isComplete={false}
              />
            </Line>
          </Line>
        </Circle>
      </Line>
    </Box>
  );
};

export default BehindAvatarLines;
