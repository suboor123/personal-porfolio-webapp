import { Tag } from "src/core/models/tags/types";
import { RootState } from "../slices";

/**
 * Tag Selector
 * @param state
 * @returns
 */
export const tagSelector = (state: RootState) => state.tags.tags;

/**
 * Select tags by level
 * @param level 
 * @returns 
 */
export const selectTagsBylevel = (level: Tag["level"]) => (state: RootState) =>
  state.tags.tags.filter((tag) => tag.level === level);
