import {
  LOADED_ROLES,
  SET_AUTH,
  LOGIN_RESULT,
  CURRENT_USER_LOADED,
  SET_GLOBAL_OWNER
} from './actions';

const initialState = {
  roles: [],
  loadingRoles: true,
  loadingUser: true,
  login: {},
  loadingUsers: true,
  currentUser: {
    Owners: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADED_ROLES: {
      if(action.roles){ 
        return Object.assign({}, state, {roles: action.roles, loadingRoles: action.loading});      
      }
      return Object.assign({}, state, {loading: action.loading});
    }
    case SET_AUTH: {
      return Object.assign({}, state, {auth: action.auth, token: action.token, username: action.username});
    }
    case SET_GLOBAL_OWNER: {
      return Object.assign({}, state, {owner: action.owner});
    }
    case LOGIN_RESULT: {
      const login = Object.assign({}, login, {error: action.error, caption: action.caption, success: action.success});
      return Object.assign({}, state, {login: login, loadingLogin: action.loading});
    }
    case CURRENT_USER_LOADED: {
      return {...state, currentUser: action.currentUser, loadingUser: false};
    }
    default:{
      return state;
    }
  }
}