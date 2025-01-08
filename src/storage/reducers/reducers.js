import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import publicationsReducer from './publicationsReducer';

const reducers = combineReducers({
    account: accountReducer,
    publications: publicationsReducer
});

export default reducers;