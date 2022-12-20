import React, { useMemo, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Tag, Timeline, Tree } from "rsuite";
import Jumbotron from "src/components/jumbotron";
import { handleTagColor } from "src/components/tags";
import { Project } from "src/core/models/projects/types";
import ProjectSlider from "src/pages/home/project-slider";
import { selectProjectBytagName, tagSelector } from "src/redux/selectors";
import "./styles.css";
import TechTag from "src/components/tags";
import Tooltip from 'react-simple-tooltip'

const ProjectTab = () => {
  const treeRef = React.useRef();
  const projectByTagName = useSelector(selectProjectBytagName) || [];
  const [value, setValue] = React.useState();
  const tags = useSelector(tagSelector);
  const [selectedProject, setSelectedProject] = useState<Project>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const renderTagImage = (tagName: string) => {
    const selectTag = tags.find((tag) => tag.name === tagName);
    return (
      <span>
        <img src={selectTag.imageUrl} className="img-tree" />
      </span>
    );
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    handleOpen();
  };

  const handleViewDetail = () => {
    navigate(`/project/${selectedProject.id}`);
  };

  const renderModal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{selectedProject.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedProject.imageUrl}
            className="img-fluid rounded mx-auto d-block p-img"
            alt=""
          />
          <div className="mt-2">
            <TechTag tags={selectedProject.tags.map((t) => t.name)} />
          </div>
          <p className="mt-3 text-white">{selectedProject.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleViewDetail} appearance="primary">
            View Detail
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderTimeline = useMemo(() => {
    return (
      <Timeline>
        {projectByTagName &&
          Object.keys(projectByTagName).map((key) => (
            <>
            <Timeline.Item>
              <h3 className="h3 text-white">
                {renderTagImage(key)} {key}
              </h3>
              {projectByTagName[key].map((project) => (
                  <span className="mx-2">
                     <Tooltip content={`${project.views || 0} views`} >
                <Tag
                  className="my-3 pointer"
                  onClick={() => handleSelectProject(project)}
                  color={handleTagColor()}
                >
                  <div className="lead">
                    {project.name} 
                  </div>
                </Tag>
                </Tooltip>
                  </span>
              ))}
            </Timeline.Item>
            <hr />
            </>
          ))}
      </Timeline>
    );
  }, [projectByTagName]);
  return (
    <>
      {renderTimeline}
      {selectedProject && renderModal()}
    </>
  );
};

export default ProjectTab;
