<template>
    <div class="container">
        <div class="search-bar">
            <input type="text" class="search-input" id="searchInput" v-model="searchTerm"
                placeholder="Search for students..." @input="search()">
        </div>
        <table>
            <thead>
                <tr>
                    <th>Serial_no</th>
                    <th>Name</th>
                    <th>Parent Name</th>
                    <th>Class</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student) in getStudents" :key="student.id">
                    <td>{{ student.id }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.parent }}</td>
                    <td>{{ student.class }}</td>
                    <td>{{ student.address }}</td>
                    <td>{{ student.contact }}</td>
                    <td>
                        <button @click="changeEditStatus(student)" class="edit">Edit</button>
                        <button @click="handleDelete(student.id)" class="delete">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="pagination">
            <button @click="setStudents(getCurrentPage - 1)" :disabled="getCurrentPage === 1">Previous</button>
            <span>Page {{ getCurrentPage }} of {{ getTotalPages }}</span>
            <button @click="setStudents(getCurrentPage + 1)" :disabled="getCurrentPage === getTotalPages">Next</button>
        </div>

        <add-student v-if="getFormStatus"></add-student>
        <edit-student v-if="getEditStatus"></edit-student>
    </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { mapGetters, mapActions } from 'vuex';
import AddStudent from '../forms/AddStudent.vue';
import EditStudent from '../forms/EditStudent.vue';

export default {
    components: {
        AddStudent,
        EditStudent
    },

    data() {
        return {
            searchTerm: '',
            students: [],
        }
    },
    setup() {
        const notify = (message) => {
            toast(message, {
                autoClose: 1000,
            }); // ToastOptions
        }
        return { notify };
    },
    computed: {
        ...mapGetters('student', ['getStudents', 'filteredStudents', 'getCurrentPage', 'getTotalPages']),
        ...mapGetters('user', ['getLoggedInStatus']),
        ...mapGetters(['getFormStatus', 'getEditStatus'])
    },
    methods: {
        ...mapActions('student', ['setStudents', 'deleteStudent', 'setSearchTerm']),
        ...mapActions(['changeEditStatus', 'changeFormStatus']),
        ...mapActions('user', ['LoggedIn', 'disableLogin']),

        search() {
            this.setSearchTerm(this.searchTerm);
            this.setStudents(this.getCurrentPage);
        },

        handleDelete(id) {
            this.deleteStudent(id)
                .then((response) => {
                    this.notify(response.data);
                })
        }
    },

    created() {
        this.setStudents(this.getCurrentPage);
        //checking if user is logged in 
        if (localStorage.getItem('auth')) {
            this.LoggedIn();
        }
        else {
            this.disableLogin();
        }
    },
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.container {
    width: 100%;
    height: 100vh;
    margin-bottom: 200px;
    font-weight: bold;
    display: block;
}

.search-bar {
    display: flex;
    justify-content: right;
    width: 99%;
}

input {
    margin-top: 20px;
    justify-self: right;
    border-radius: 10px;
    width: 40%;
    padding: 10px;
    font-weight: bold;
}

table {
    margin: 20px;
    padding: 20px;
    width: 97%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    margin-bottom: 30px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    font-weight: bold;
}

th {
    background-color: #f2f2f2;
}

/* Table header styles */
th {
    background-color: green;
    color: #fff;
    font-size: 25px;
    font-weight: bold;
    padding: 10px;
}

/* Table row styles */
tr:nth-child(even) {
    background-color: #f2f2f2;
}

/* Table hover effect */
tr:hover {
    background-color: rgb(211, 244, 255);
}

.edit,
.delete {
    border: none;
    font-size: 15px;
    font-weight: bold;
    margin-right: 10px;
    padding: 10px 20px;
    cursor: pointer;
}

.edit {
    background-color: orange
}

.delete {
    background-color: red;
    color: white
}

/* Style the pagination container */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

/* Style the previous and next buttons */
.pagination button {
    padding: 10px 20px;
    background-color: blue;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 5px;
    transition: background-color 0.3s;
}

.pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    font-weight: bold;
    color: black;
}
</style>