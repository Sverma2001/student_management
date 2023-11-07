export default{
    //fetching login status from the index.js
    getLoggedInStatus(state){
        return state.isLoggedIn;
    },

    //fetching login error message from the index.js
    getLoginErrorMessage(state){
        return state.loginErrorMessage;
    },

    //fetching signup error message from the index.js
    getSignupErrorMessage(state){
        return state.signupErrorMessage;
    }
}