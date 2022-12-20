import { ProfileModel } from "src/core/models/profile";
import { RootState } from "../slices";

/**
 * Profile Selector
 * @param state
 * @returns
 */
export const profileSelector = (state: RootState) => {
    return {
        userProfileModel: ProfileModel.make(state.profile.userProfileModel)
    }
};

