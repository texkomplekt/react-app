import { combineReducers } from 'redux';
import infoReducer from './info';
// import archiveReducer from './archive';
 
const rootReducer = combineReducers({
  infoState: infoReducer,
//   archiveState: archiveReducer,
});
 
export default rootReducer;