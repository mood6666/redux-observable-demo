import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userResults from './userResults';
import searchInFlight from './searchInFlight';
import reposByUser from './reposByUser';
import adminAccess from './adminAccess';


export function tableData(state = {
  list: [],
  isLoad: false,
}, action) {
    switch (action.type) {
        case 'tableDating':
            return Object.assign({}, state, {
                isLoad: true,
            })
        case 'tableData':
          return Object.assign({}, state, {
            list: action.data.list,
            count: action.data.count,
            currentPage: action.data.currentPage,
            isLoad: false,
          })
        case 'tableDataError':
            return Object.assign({}, state, {
                isLoad: false,
            })
        case 'saveSearchdata':
            return {
                searchData: action.data,
            }
        default:
          return state;
    }
}

export default combineReducers({
  tableData,
  routing: routerReducer
});
