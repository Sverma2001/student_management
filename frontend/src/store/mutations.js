export default {

    //changing form status
    changeFormStatus(state) {
        state.showForm = state.showForm === true ? false : true;
    },

    //changing editform status
    changeEditStatus(state, payload) {
        state.editStudent = state.editStudent === true ? false : true;
        state.studentToBeUpdated = payload;
    },

    disableEdit(state) {
        state.editStudent = false;
    }
}