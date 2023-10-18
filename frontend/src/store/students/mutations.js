export default {
    //setting student data ,current page and total pages
    setStudents(state, students) {
        state.students = students.students;
        state.totalPages = students.totalPages;
        state.currentPage = students.currentPage;
    },

    //pushing the student data to the students array
    addStudent(state, data) {
        state.students.push(data);
    },

    //deleting the student data from the students array
    deleteStudent(state, id) {
        const index = state.students.findIndex((student) => student.id === id);
        state.students.splice(index, 1);
    },

    //updating the student data in the students array
    updateStudent(state, payload) {
        const studentIndex = state.students.findIndex(student => student.id === payload.id);
        state.students.splice(studentIndex, 1, payload);
    },

    //setting the search term
    setSearchTerm(state, payload) {
        state.searchTerm = payload;
    }
}