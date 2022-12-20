import { RootState } from "../slices";

/**
 * Blog Selector
 * @param state
 * @returns
 */
export const blogSelector = (state: RootState) => state.blogs;

/**
 * Set limits of blogs to be select
 * @param state
 * @param limit
 * @returns
 */
export const selectBlogsByLimit = (limit: number) => (state: RootState) =>
  state.blogs.blogs.slice(0, limit);

/**
 * Select blogs by tagName
 * @param state
 * @returns
 */
export const selectBlogByTagName = (state: RootState) =>
  state.blogs.blogsByTagName;
