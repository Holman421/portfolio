import ProjectContainer from "../Components/ProjectContainer/ProjectContainer";
import SectionWrapper from "../Components/SectionWrapper";
import useSelectAppropriateText from "../Utils/CustomHooks/useSelectAppropriateText";
import SectionHeading from "../Components/SectionHeading/SectionHeading";

const ProjectSection: React.FC = () => {
  const project1Desc = useSelectAppropriateText(
    "A collection of smaller experimental projects I created while learning Three.js, shaders, and GSAP. It includes various effects and features that I learned to implement.",
    "Soubor menších experimentačních projektů, které jsem vytvořil v rámci učení se Three.js, shaderů a GSAPu. Obsahuje různé efekty a funkce, které jsem se naučil implementovat.",
  );

  const project2Desc = useSelectAppropriateText(
    "Creature Forge is a web app that generates AI-driven images of custom fantasy creatures. Its user-friendly interface allows you to customize unique features, and you can easily download and share high-quality images of your creations.",
    "Creature Forge je webová aplikace, která vytváří AI-generované obrázky fantasy bytostí na míru. Uživatelé mohou snadno přizpůsobit unikátní vlastnosti a stáhnout si nebo sdílet vysoce kvalitní obrázky svých výtvorů.",
  );

  const project3Desc = useSelectAppropriateText(
    "Builders Hub is an interactive platform where Minecraft enthusiasts can showcase and share their builds. Connect with fellow builders, get inspired, and submit your own creations to the community.",
    "Builders Hub je interaktivní platforma, kde mohou nadšenci Minecraftu představit a sdílet své stavby. Spojte se s ostatními staviteli, čerpejte inspiraci a přidejte své vlastní výtvory do komunity.",
  );

  return (
    <SectionWrapper
      nameForNavigation="#projects"
      index={1}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "radial-gradient(49.64% 42.91% at 36.89% 52%, rgba(60, 149, 220, 0.23) 0%, rgba(0, 0, 0, 0.00) 100%)",
      }}
    >
      <SectionHeading engHeadingText="Projects" czHeadingText="Projekty" />

      <ProjectContainer
        projectName="My Playground"
        projectNumber="01"
        technologies="Three.js - Svelte - Tailwind - GLSL"
        description={project1Desc}
        left="calc(-30% + 15rem)"
        marginTop="4rem"
        projectDemoUrl="https://holmis-playground.vercel.app"
        projectGithubUrl="https://github.com/Holman421/holmis-playground"
      />
      <ProjectContainer
        projectName="Creature forge"
        projectNumber="02"
        technologies="AI - React - Typescript - MUI"
        description={project2Desc}
        left="calc(30% - 15rem)"
        marginTop="4rem"
        projectDemoUrl="https://creature-forge.web.app/"
        projectGithubUrl="https://github.com/Holman421/creature-forge/tree/master"
      />
      <ProjectContainer
        projectName="Builders Hub"
        projectNumber="03"
        technologies="Next.js - Typescript - Tailwind"
        description={project3Desc}
        left="calc(-30% + 15rem)"
        marginTop="4rem"
        marginBottom="8rem"
        projectDemoUrl="https://wanderer-38227.web.app/"
        projectGithubUrl="https://github.com/Holman421/youtube-wanderer"
        isProjectDone={false}
      />
    </SectionWrapper>
  );
};

export default ProjectSection;
