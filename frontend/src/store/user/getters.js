export default{
    //fetching login status from the index.js
    getLoggedInStatus(state){
        return state.isLoggedIn;
    },

    //fetching error message from the index.js
    getErrorMessage(state){
        return state.errorMessage;
    }
}