import axiosService from '../../services/axiosService';
import instance from '../../services/axiosService';

//setting student to the student array
export default {
    async setStudents(context, payload) { 
        try {
            const response = await instance.get(`http://localhost:3000/getStudents?page=${payload.page}&limit=${payload.studentsPerPage}&searchTerm=${payload.searchTerm}`);
            context.commit('setStudents', response.data);
            return response
        } catch (error) {
            console.error(error);
        }
    },

    //adding student data to database
    async addStudent(context, payload) {
        try {
            const addedStudent = await axiosService.post('http://localhost:3000/addStudent', payload);
            context.commit('addStudent', addedStudent.data);
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
        const { address, contact } = payload;
        const student = { address, contact };

        try {
            const updatedStudent = await axiosService.put(`http://localhost:3000/updateStudent/${payload.uuid}`, student);
            //calling to mutation for updating the students data in the store
            context.commit('updateStudent', payload);
            return updatedStudent;
        }
        catch (error) {
            console.error(error);
        }
    }
}
