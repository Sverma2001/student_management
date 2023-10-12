import studentMutations from "./mutations";
import studentActions from "./actions";
import studentGetters from "./getters";

export default{
    namespaced:true,

    //storing data
    state(){
        return{
            students:[],
            totalPages:1,
            currentPage:1,
            searchTerm:''
        }
    },
    mutations:studentMutations,
    actions:studentActions,
    getters:studentGetters
}