export default {

    //changing form status
    changeFormStatus(state) {
        state.showForm = state.showForm === true ? false : true
    
        console.log("Add Student Formstatus - ",state.showForm)
    },

    //changing editform status
    changeEditStatus(state, payload) {
        state.editStudent = state.editStudent === true ? false : true,
        state.studentToBeUpdated = payload
    },

    disableEdit(state) {
        state.editStudent = false
    }
}