export default {
    getFormStatus(state){
        return state.showForm;
    },

    getEditStatus(state){
        return state.editStudent;
    },

    getStudentToBeUpdated(state){
        return state.studentToBeUpdated;
    }
}