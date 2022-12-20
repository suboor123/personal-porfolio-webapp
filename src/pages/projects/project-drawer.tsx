import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Drawer } from "rsuite";
import KeyboardButton from "src/components/button/keyboard-button";
import Button from "src/components/button/user-button";
import MotionCard from "src/components/card/motion-card";
import GradientHeading from "src/components/heading/gradient-heading";
import { projectSelector } from "src/redux/selectors";

type ProjectDraweProps = {
  show: boolean;
  handleClose: () => void;
  selectedProjectId?: string;
};

const ProjectDrawer: React.FC<ProjectDraweProps> = ({
  show,
  handleClose,
  selectedProjectId,
}) => {
  const projects = useSelector(projectSelector);

  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/project/${id}`);
    handleClose();
  };

  const renderDrawerBody = useMemo(() => {
    return (
      <div className="row">
        {projects
          .filter((project) => project.id === selectedProjectId)
          .concat(
            projects.filter((project) => project.id !== selectedProjectId)
          )
          .map((project) => (
            <div
            key={project.id}
              className="col-md-12 mt-5"
              onClick={() => handleNavigation(project.id)}
            >
              <MotionCard
                heading={project.name}
                imageUrl={project.imageUrl}
                description={project.description}
                views={project.views}
                isActive={project.id === selectedProjectId}
                tags={project.tags.map((tag) => tag.name)}
                date={project.createdAt}
              ></MotionCard>
            </div>
          ))}
      </div>
    );
  }, [projects.length, selectedProjectId]);

  return (
    <React.Fragment>
      <Drawer open={show} onClose={handleClose} size="sm">
        <Drawer.Header>
          <Drawer.Title>
            <h3 className='text-white'>Explore Projects</h3>
          </Drawer.Title>
          <Drawer.Actions>
            <KeyboardButton className="mt-2" onClick={handleClose}>esc</KeyboardButton>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>{renderDrawerBody}</Drawer.Body>
      </Drawer>
    </React.Fragment>
  );
};

export default ProjectDrawer;
