import { RootState } from "../slices";

/**
 * Profile Selector
 * @param state
 * @returns
 */
export const sessionSelector = (state: RootState) => state.session;

/**
 * Select upcoming sessions
 * @param state 
 * @returns 
 */
export const selectUpcomingSessions = (state: RootState) => state.session.upcomingSessions;

/**
 * Select past sessions
 * @param state 
 * @returns 
 */
export const selectPastSessions = (state: RootState) => state.session.pastSessions;

