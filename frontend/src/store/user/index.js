import userActions from "./actions";
import userMutations from "./mutations";
import userGetters from "./getters";

export default{
    namespaced:true,
    state(){
        return{
            isLoggedIn:false,   //checking if user is logged in
            errorMessage:' '   // storing error message to display on the login form
        }
    },
    actions:userActions,
    mutations:userMutations,
    getters:userGetters
}