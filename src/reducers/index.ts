import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducer from './user';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;