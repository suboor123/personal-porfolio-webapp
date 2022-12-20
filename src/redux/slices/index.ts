import {combineReducers} from '@reduxjs/toolkit';
import blogReducer from './blogs';
import profileReducer from './profile';
import projectReducer from './project';
import sessionReducer from './session';
import tagReducer from './tags';

const rootReducer = combineReducers({
    profile: profileReducer,
    projects: projectReducer,
    tags: tagReducer,
    blogs: blogReducer,
    session: sessionReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;