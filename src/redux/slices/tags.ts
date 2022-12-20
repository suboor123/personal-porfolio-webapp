import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { TagModel } from "src/core/models/tags";
import { Tag } from "src/core/models/tags/types";


export type tagState = {
  tags: Tag[]
};

export const initialState: tagState = {
    tags: []
};


/**
 * Tags Slice
 */
const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload
    }
  },
});


/**
 * Tag Actions generated from the slice
 */
const { setTags } = tagSlice.actions;



/**
 * Tag Reducer
 */
const tagReducer = tagSlice.reducer;
export default tagReducer;


/**
 * @ThunkActions
 */
export const fetchTags = (): AppThunk => async (dispatch: any) => {
  const tagModels = await TagModel.syncTags()
  if (tagModels) {
    dispatch(setTags(tagModels.map(tag => tag.pluckAll())));
  }
};

