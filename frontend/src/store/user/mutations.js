export default{

    //setting login status to true
    LoggedIn(state) {
        state.isLoggedIn = true;
    },

    //setting login status to false
    disableLogin(state) {
        state.isLoggedIn = false;
    },

    //setting error message
    displayError(state, payload) {
        state.errorMessage = payload;
    }
}