import Cookies from 'js-cookie'
export default {
  setToken(state,token){
    state.token = token;
    Cookies.set('token',token,{expire:1/24})
  }
}
