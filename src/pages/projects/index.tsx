import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "src/components/card";
import FilterFigure from "src/components/figure/filter-figure";
import { Project } from "src/core/models/projects/types";
import { projectSelector, selectProjectBytagName } from "src/redux/selectors";
import { fetchProjects } from "src/redux/slices/project";
import { useAppDispatch } from "src/redux/store";

const Projects = () => {
  const dispatch = useAppDispatch();
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");

  const projects = useSelector(projectSelector);
  const projectByTagName = useSelector(selectProjectBytagName);

  useEffect(() => {
    setSelectedProjects(projects);
  }, [projects.length]);

  useEffect(() => {
    dispatch(fetchProjects())
  }, [])

  const renderProjects = () => {
    return selectedProjects.map((project, index) => (
      <div className="col-md-4 mb-5" key={project.id}>
        <Link to={`/project/${project.id}`}>
          <Card
            heading={project.name}
            imageUrl={project.imageUrl}
            description={project.description}
            views={project.views || 0}
            date={project.createdAt}
            tags={project.tags.map((tag) => tag.name)}
          ></Card>
        </Link>
      </div>
    ));
  };

  const getTags = useMemo(() => {
    return Object.keys(projectByTagName).filter(
      (t) => projectByTagName[t].length
    );
  }, [projectByTagName.length]);

  const handleSelectTag = (tagName: string) => {
    setSelectedTag(tagName);
    if (tagName === "") {
      setSelectedProjects(projects);
      return;
    }
    const projectByTag = projectByTagName[tagName];
    setSelectedProjects(projectByTag || []);
  };
  return (
    <>
      <FilterFigure
        heading={"Explore Projects"}
        onChooseTag={handleSelectTag}
        selectedTag={selectedTag}
        tags={getTags}
      >
        <React.Fragment>
          <div className="row">{renderProjects()}</div>
        </React.Fragment>
      </FilterFigure>
    </>
  );
};

export default Projects;
