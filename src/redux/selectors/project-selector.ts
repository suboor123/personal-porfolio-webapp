import { RootState } from "../slices";

/**
 * Project Selector
 * @param state
 * @returns
 */
export const projectSelector = (state: RootState) => state.projects.projects;

/**
 * Set limits of project to be select
 * @param state
 * @param limit
 * @returns
 */
export const selectProjectLimit = (state: RootState, limit: number) => limit;

export const selectProjectByLimit = (limit: number) => (state: RootState) =>
  state.projects.projects.slice(0, limit);

/**
 * Select project by Tag name
 * @param state
 * @returns
 */
export const selectProjectBytagName = (state: RootState) =>
  state.projects.projectByTagName;

