import React from "react";
import "./ProjectComingSoonButton.scss";

interface ProjectComingSoonButtonProps {
  isOpen: boolean;
  isProjectDone: boolean;
}

const ProjectComingSoonButton: React.FC<ProjectComingSoonButtonProps> = ({
  isOpen,
  isProjectDone,
}) => {
  if (isProjectDone || !isOpen) return null;

  return <div className="button">Coming soon</div>;
};

export default ProjectComingSoonButton;
