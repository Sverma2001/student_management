import axiosService from '../../services/axiosService';
import instance from '../../services/axiosService';

//setting student to the student array
export default {
    async setStudents(context, page) {
        try {
            const response = await instance.get(`http://localhost:3000/getStudents?page=${page}&searchTerm=${context.state.searchTerm}`);
            context.commit('setStudents', response.data);
        } catch (error) {
            console.error(error);
        }
    },

    //adding student data to database
    async addStudent(context, payload) {
        try {
            const addedStudent = await axiosService.post('http://localhost:3000/addStudent', payload);
            //updating the students array in the store
            context.commit('addStudent', payload);
            return addedStudent;
        }
        catch (error) {
            console.error(error);
        }
    },

    //deleting student data from database
    async deleteStudent(context, payload) {
        try {
            const deletedStudent = await axiosService.delete(`http://localhost:3000/deleteStudent/${payload}`);
            context.commit('deleteStudent', payload);
            return deletedStudent;
        }
        catch (error) {
            console.error(error);
        }
    },

    //updating student data
    async updateStudent(context, payload) {
        context.rootState.editStudent = false;
        const student = { ...payload };

        try {
            const updatedStudent = await axiosService.put(`http://localhost:3000/updateStudent/${student.id}`, student);
            //calling to mutation for updating the students data in the store
            context.commit('updateStudent', student);
            return updatedStudent;
        }
        catch (error) {
            console.error(error);
        }
    },

    //listening to search term and then calling the searchTerm mutation to update it in store
    setSearchTerm(context, payload) {
        context.commit('setSearchTerm', payload);
    }
}
