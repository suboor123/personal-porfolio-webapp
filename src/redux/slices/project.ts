import { ProjectModel } from "../../core/models/projects"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { Project } from "src/core/models/projects/types";
import { ProjectMiddleware } from "../middlewares/project-middleware";

export type ProjectState = {
  projects: Project[];
  projectByTagName: Record<string, Project[]>;
  selectedProject: Project | undefined;
};

export const initialState: ProjectState = {
  projects: [],
  projectByTagName: {},
  selectedProject: undefined
};

/**
 * Project Slice
 */
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setProjectByTagName: (state, action: PayloadAction<Record<string, Project[]>>) => {
      state.projectByTagName = action.payload;
    },
    setSelectedProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
    }
  },
});

/**
 * Project Actions generated from the slice
 */
const { setProjects, setProjectByTagName, setSelectedProject } = projectSlice.actions;


/**
 * Project Reducer
 */
const projectReducer = projectSlice.reducer;
export default projectReducer;

/**
 * @ThunkActions
 */
export const fetchProjects = (): AppThunk => async (dispatch: any) => {
  const projectModels = await ProjectModel.syncProjects();
  if (projectModels) {
    const projects = projectModels.map(p => p.pluckAll());
    ProjectMiddleware.attachTags(projects);
    dispatch(setProjects(projects));
    const projectsByTagName = ProjectMiddleware.getProjectByTagName(projects);
    dispatch(setProjectByTagName(projectsByTagName));
  }
};

