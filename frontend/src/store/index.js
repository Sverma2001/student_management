import { createStore } from "vuex";
import rootMutations from "./mutations";
import rootActions from "./actions";
import rootGetters from "./getters";
import studentModule from "./students/index";
import userModule from "./user/index";

const store = createStore({
    modules:{
        student:studentModule,
        user:userModule
    },
    state(){
        return{
            studentToBeUpdated:{},
            showForm:false,
            editStudent:false
        }
    },
    mutations:rootMutations,
    actions:rootActions,
    getters:rootGetters
})

export default store