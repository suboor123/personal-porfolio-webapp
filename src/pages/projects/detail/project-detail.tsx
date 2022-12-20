import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DetailBody from "src/components/detail/detail-body";
import DetailHead from "src/components/detail/detail-head";
import SideContent from "src/components/detail/side-content";
import { ProjectModel } from "src/core/models/projects";
import { Project } from "src/core/models/projects/types";
import { projectSelector, tagSelector } from "src/redux/selectors";
import ProjectDrawer from "../project-drawer";
import { DetailPlaceholder } from "../../../components/detail/placeholder";
import { FirebaseHelper } from "src/helpers/firebase-helpers";
import Viewer from "src/components/viewer/viewer";

const ProjectDetail = () => {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const { id } = useParams();

  const navigate = useNavigate();

  const tags = useSelector(tagSelector);
  const projects = useSelector(projectSelector);
  const projectIds = projects.map((project) => project.id);

  const [showProjectDrawer, setShowProjectDrawer] = useState<boolean>(false);
  const handleCloseDrawer = () => setShowProjectDrawer(false);
  const handleOpenDrawer = () => setShowProjectDrawer(true);

  const fetchProject = async () => {
    const projectModel = await ProjectModel.syncById(id);
    if (projectModel) {
      const projectDetail = projectModel.pluckAll();
      const entity = projectModel.pluckAll();
      projectDetail.tags = projectDetail.tags.map((tagId) => {
        return tags.find((tag) => tag.id === tagId);
      });
      setProject(projectDetail);

      const firebaseHelper = new FirebaseHelper('projects');
      firebaseHelper.increaseViews(id);
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => fetchProject(), 1000)
  }, [id]);

  const renderPlaceholder = (() => {
    return <DetailPlaceholder />;
  })();

  const handleNextClick = () => {
    setProject(undefined);
    const index = projectIds.indexOf(id);
    let nextProjectId: string | undefined = undefined;
    if (index === projectIds.length - 1) {
      nextProjectId = projectIds[0];
    } else {
      nextProjectId = projectIds[index + 1];
    }
    navigate("/project/" + nextProjectId);
  };

  const handlePrevlick = () => {
    setProject(undefined);
    const index = projectIds.indexOf(id);
    let prevProjectId: string | undefined = undefined;
    if (index === 0) {
      prevProjectId = projectIds[projectIds.length - 1];
    } else {
      prevProjectId = projectIds[index - 1];
    }
    navigate("/project/" + prevProjectId);
  };

  const renderProjectDetails = useMemo(() => {
    return (
      <React.Fragment>
        {project && (
          <React.Fragment>
            <DetailHead
              includePagination={{
                enable: true,
                onNext: handleNextClick,
                onPrev: handlePrevlick,
                onViewAll: handleOpenDrawer,
              }}
              imageUrl={project.imageUrl}
              views={project.views}
              tags={project.tags.map((tag) => tag.name)}
              name={project.name}
              url={project.url}
            />
            <DetailBody
              imageUrl={project.imageUrl}
              views={project.views}
              tags={project.tags.map((tag) => tag.name)}
              name={project.name}
              url={project.url}
              content={project.content}
            >
              <SideContent>
                <></>
              </SideContent>
            </DetailBody>
          </React.Fragment>
        )}
        {showProjectDrawer && (
          <ProjectDrawer
            show={showProjectDrawer}
            handleClose={handleCloseDrawer}
            selectedProjectId={id}
          />
        )}
      </React.Fragment>
    );
  }, [project, showProjectDrawer, id]);

  return <>{project ? renderProjectDetails : renderPlaceholder}</>;
};

export default ProjectDetail;
