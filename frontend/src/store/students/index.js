import studentMutations from "./mutations";
import studentActions from "./actions";
import studentGetters from "./getters";

export default{
    namespaced:true,

    //storing data
    state(){
        return{
            students:[],
            totalStudents:0,
            searchTerm:''
        }
    },
    mutations:studentMutations,
    actions:studentActions,
    getters:studentGetters
}