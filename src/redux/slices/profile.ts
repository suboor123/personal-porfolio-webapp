import { ProfileModel } from "../../core/models/profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { Profile } from "src/core/models/profile/types";


export type ProfileState = {
  isAdmin: boolean;
  userProfileModel: Profile | undefined;
};

export const initialState: ProfileState = {
  isAdmin: false,
  userProfileModel: undefined,
};


/**
 * Profile Slice
 */
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<Profile>) => {
      state.userProfileModel = action.payload;
    },
    setUserAsAdmin: (state) => {
      state.isAdmin = true;
    },
  },
});


/**
 * Profile Actions generated from the slice
 */
const { setUserAsAdmin, setUserProfile } = profileSlice.actions;



/**
 * Profile Reducer
 */
const profileReducer = profileSlice.reducer;
export default profileReducer;


/**
 * @ThunkActions
 */
export const fetchProfile = (): AppThunk => async (dispatch: any) => {
  const userProfileModel = await ProfileModel.getUserProfile();
  if (userProfileModel) {
    dispatch(setUserProfile(userProfileModel.pluckAll()));
  }
};

export const makeAdmin = () => (dispatch: any) => {
  dispatch(setUserAsAdmin());
};
