export default {
    //fetching all students from the index.js
    getStudents(state){
        return state.students;
    },

    //fetching current page from the index.js
    getCurrentPage(state){
        return state.currentPage;
    },

    //fetching total pages from the index.js
    getTotalPages(state){
        return state.totalPages;
    }
}