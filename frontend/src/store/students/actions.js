import axios from 'axios'

export default {

    //setting current page and total pages 
    async setStudents(context,page) {
        if (!context.state.searchTerm) {
            await axios.get(`http://localhost:3000/getStudents?page=${page}`).then(response => {
                context.commit('setStudents', response.data)    // calling to mutation for updating the students data in the store
            })
        }
        else {
            console.log(context.state.searchTerm, page)
            await axios.get(`http://localhost:3000/filterSearch/${context.state.searchTerm}?page=${page}`)
                .then(response => {
                    context.commit('setStudents', response.data)
                })
        }
    },

    //adding student data to database
    async addStudent(context, payload) {
        console.log("Data to be added - ", payload)
        await axios.post('http://localhost:3000/addStudent', payload).then(response => {
            console.log(response)
            context.commit('addStudent', payload)  //updating the students array in the store
        })
    },

    //deleting student data from database
    async deleteStudent(context, payload) {
        console.log("serial no to be deleted",payload)
        await axios.delete(`http://localhost:3000/deleteStudent/${payload}`)
            .then(response => {
                console.log("Response :",response)
                context.commit('deleteStudent', payload)  //calling mutation for updating the students array in the store
            })
    },

    //updating student data
    async updateStudent(context, payload) {
        context.rootState.editStudent = false
        const student = {...payload}

        await axios.patch('http://localhost:3000/updateStudent', student)
            .then(response => {
                console.log(response.data)
                context.commit('updateStudent', student)  //calling to mutation for updating the students data in the store
            })
    },

    //listening to search term and then calling the searchTerm mutation to update it in store
    setSearchTerm(context, payload) {
        context.commit('setSearchTerm', payload)
    }
}