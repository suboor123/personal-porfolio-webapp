import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogModel } from "src/core/models/blogs";
import { Blog } from "src/core/models/blogs/types";
import { BlogMiddleware } from "../middlewares/blog-middleware";
import { AppThunk } from "../store";

export type BlogState = {
  blogs: Blog[];
  blogsByTagName: Record<string, Blog[]>
};

export const initialState: BlogState = {
  blogs: [],
  blogsByTagName: {}
};

/**
 * Blog Slice
 */
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.blogs = action.payload;
    },
    setBlogsByTagName: (state, action: PayloadAction<Record<string, Blog[]>>) => {
      state.blogsByTagName = action.payload;
    }
  },
});

/**
 * Blog Actions generated from the slice
 */
const { setBlogs, setBlogsByTagName } = blogSlice.actions;

/**
 * Blog Reducer
 */
const blogReducer = blogSlice.reducer;
export default blogReducer;

/**
 * @ThunkActions
 */
export const fetchBlogs = (): AppThunk => async (dispatch: any) => {
  const blogModels = await BlogModel.makeBlogsCollection();
  if (blogModels) {
    const blogs = blogModels.map((b) => b.pluckAll());
    BlogMiddleware.attachTags(blogs);
    dispatch(setBlogs(blogs));
    const blogsByTagName = BlogMiddleware.getBlogByTagName(blogs);
    dispatch(setBlogsByTagName(blogsByTagName));
  }
};
