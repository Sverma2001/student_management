export default {
    //fetching all students from the index.js
    getStudents(state){
        return state.students;
    },

    getTotalStudents(state){
        return state.totalStudents;
    }
}