import React, { useState } from "react";
import DemoButton from "./ProjectParts/DemoButton";
import GithubButton from "./ProjectParts/GithubButton";
import ProjectComingSoonButton from "./ProjectParts/ProjectComingSoonButton/ProjectComingSoonButton";
import ProjectLeftPart from "./ProjectParts/ProjectLeftPart/ProjectLeftPart";
import ProjectMobileBottomPart from "./ProjectParts/ProjectMobileBottomPart";
import ProjectRightPart from "./ProjectParts/ProjectRightPart/ProjectRightPart";
import "./ProjectContainer.scss";

type ProjectContainerProps = {
  projectName: string;
  projectNumber: string;
  technologies: string;
  description: string;
  left: string;
  marginTop: string;
  marginBottom?: string;
  projectDemoUrl: string;
  projectGithubUrl: string;
  isProjectDone?: boolean;
};

const ProjectContainer: React.FC<ProjectContainerProps> = ({
  projectName,
  projectNumber,
  technologies,
  description,
  left,
  marginTop,
  marginBottom,
  projectDemoUrl,
  projectGithubUrl,
  isProjectDone = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="projectContainer"
      style={
        {
          "--left": left,
          "--marginTop": marginTop,
          "--marginBottom": marginBottom,
        } as React.CSSProperties
      }
    >
      <ProjectLeftPart
        projectName={projectName}
        projectNumber={projectNumber}
      />

      <DemoButton
        urlDemo={projectDemoUrl}
        isOpen={isOpen}
        isProjectDone={isProjectDone}
      />
      <GithubButton
        urlGithub={projectGithubUrl}
        isOpen={isOpen}
        isProjectDone={isProjectDone}
      />
      <ProjectComingSoonButton isOpen={isOpen} isProjectDone={isProjectDone} />
      <ProjectRightPart
        technologies={technologies}
        description={description}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ProjectMobileBottomPart
        technologies={technologies}
        description={description}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default ProjectContainer;
