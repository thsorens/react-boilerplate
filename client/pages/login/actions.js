import {authService, userService} from 'services';

export const LOGIN_RESULT = 'LOGIN_RESULT';
export const SET_AUTH = 'SET_AUTH';
export const CURRENT_USER_LOADED = "CURRENT_USER_LOADED";


function loginResult(error, caption, success, loading = true){
  return{
    type: LOGIN_RESULT,
    error: error,
    caption: caption,
    success: success,
    loading: loading
  };
}

function setAuth(auth, token, username){
  return {
    type: SET_AUTH,
    auth: auth,
    token: token,
    username: username
  }
}

export function logout(){
  return(dispatch) => {
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("userName", "");
    window.localStorage.setItem("isAuth", false);
    dispatch(setAuth(false, null, null));
  }
}

export function init(){
  return(dispatch) => {
    const auth = window.localStorage.getItem("isAuth") === "true";
    const token = window.localStorage.getItem("token");
    const userName = window.localStorage.getItem("userName");

    dispatch(setAuth(auth, token, userName));

    userService.getCurrentUser()
      .then(res => {
        dispatch({type: CURRENT_USER_LOADED, currentUser: res});
      })
      .catch(() => {
        dispatch(logout());
      });

    if(auth){
      //if logged in, dispatch more actions here      
    }
  }
}

export function login(username, password){
  return(dispatch) => {
    dispatch(loginResult());
    authService.login(username, password).then(res => {
      dispatch(loginResult(null, null, true, false));

      const auth = {
        auth: !!res.access_token,
        token: res.access_token,
        userName: res.userName
      };

      window.localStorage.setItem("token", auth.token);
      window.localStorage.setItem("userName", auth.userName);
      window.localStorage.setItem("isAuth", true);
      dispatch(setAuth(!!res.access_token, res.access_token, res.userName));
      dispatch(init());
    }).catch(err => {
      dispatch(loginResult(err.data.error,err.data.caption, false, false));
    });
  };  
}