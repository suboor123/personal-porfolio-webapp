import { useSelector } from "react-redux";
import { Project } from "src/core/models/projects/types";
import { Tag } from "src/core/models/tags/types";
import store from "../store";

export class ProjectMiddleware {
  public static attachTags = (projects: Project[]) => {
    projects.forEach((project) => {
      const projectTagIds = project.tags as string[];
      const tags = store.getState().tags.tags;
      project.tags = tags.filter((tag) => projectTagIds.includes(tag.id));
    });
  };

  public static getProjectByTagName = (projects: Project[]) => {
    const tags = store.getState().tags.tags;
    const tagMap: Record<string, Project[]> = {};
    tags.forEach((tag) => {
      tagMap[tag.name] = [];
    });

    projects.forEach((project) => {
      const projectTags = project.tags as Tag[];
      Object.keys(tagMap).forEach((tagName: any) => {
        if (projectTags.find((tag) => tag.name === tagName)) {
          tagMap[tagName].push(project);
        }
      });
    });

    return tagMap;
  };
}
