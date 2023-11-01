export default{
    //setting login status to true
    LoggedIn(state) {
        state.isLoggedIn = true;
    },

    //setting login status to false
    disableLogin(state) {
        state.isLoggedIn = false;
        state.loginErrorMessage = '';
        state.signupErrorMessage = '';
    },

    //setting loginerror message
    loginError(state, payload) {
        state.loginErrorMessage = payload;
    },

    //setting signup error message
    signupError(state, payload) {
        state.signupErrorMessage = payload;
    },

    clearSignupError(state){
        state.signupErrorMessage = '';
    }
}
