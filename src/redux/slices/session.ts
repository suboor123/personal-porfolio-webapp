import { ProjectModel } from "../../core/models/projects";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { SessionModel } from "src/core/models/sessions";
import { Session } from "src/core/models/sessions/types";
import { SessionMiddleware } from "../middlewares/session-middleware";

export type SessionState = {
  upcomingSessions: Session[];
  pastSessions: Session[];
  allSessions: Session[];
};

export const initialState: SessionState = {
  upcomingSessions: [],
  pastSessions: [],
  allSessions: []
};

/**
 * Session Slice
 */
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUpcomingSessions: (state, action: PayloadAction<Session[]>) => {
      state.upcomingSessions = action.payload;
    },
    setPastSessions: (state, action: PayloadAction<Session[]>) => {
      state.pastSessions = action.payload;
    },
    setAllSessions: (state, action: PayloadAction<Session[]>) => {
      state.allSessions = action.payload;
    },
  },
});

/**
 * Session Actions generated from the slice
 */
const { setUpcomingSessions, setPastSessions, setAllSessions } = sessionSlice.actions;

/**
 * Session Reducer
 */
const sessionReducer = sessionSlice.reducer;
export default sessionReducer;

/**
 * @ThunkActions
 */
export const fetchSessions = (): AppThunk => async (dispatch: any) => {
  const sessionModels = await SessionModel.sync();
  if (sessionModels) {
    const upcomingSessions = sessionModels.filter(sm => !sm.isPastSession).map(sm => sm.pluckAll());
    const pastSessions = sessionModels.filter(sm => sm.isPastSession).map(sm => sm.pluckAll());

    SessionMiddleware.attachTags(upcomingSessions || []);
    SessionMiddleware.attachTags(pastSessions || []);

    dispatch(setUpcomingSessions(upcomingSessions || []));
    dispatch(setPastSessions((pastSessions || []).reverse()));
    dispatch(setAllSessions([...(upcomingSessions || []), ...(pastSessions || [])]));
  }
};
