export default{
    //fetching login status from the index.js
    getLoggedInStatus(state){
        return state.isLoggedIn
    },

    //fetching error message from the index.js
    getErrorMessage(state){
        console.log("Error message called from getters - ",state.errorMessage)
        return state.errorMessage
    }
}