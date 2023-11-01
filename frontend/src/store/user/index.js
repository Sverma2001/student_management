import userActions from "./actions";
import userMutations from "./mutations";
import userGetters from "./getters";

export default{
    namespaced:true,
    state(){
        return{
            isLoggedIn:false,   //checking if user is logged in
            loginErrorMessage:' ', // storing error message to display on the login form
            signupErrorMessage:' ' // storing error message to display on the signup form
        }
    },

    actions:userActions,
    mutations:userMutations,
    getters:userGetters
}