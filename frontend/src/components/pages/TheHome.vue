<template>
  <h1>Student Data</h1>
  <v-text-field
    v-model="searchTerm"
    label="Search"
    class="float-right"
    style="width: 300px"
    @input="search()"
  />

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="getTotalStudents"
    :items="getStudents"
    :loading="loading"
    class="elevation-1"
    item-value="name"
    @update:options="loadItems"
  >

    <template v-slot:item.actions="{ student }">
      <td>
        <v-btn @click="changeEditStatus(student)">Edit</v-btn>
        <v-btn @click="handleDelete(student.uuid)">Delete</v-btn>
      </td>
    </template>
    
  </v-data-table-server>

  <add-student v-if="getFormStatus"></add-student>
  <edit-student v-if="getEditStatus"></edit-student>
  <sidebar v-if="getLoggedInStatus"></sidebar>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { mapGetters, mapActions } from "vuex";
import AddStudent from "../forms/AddStudent.vue";
import EditStudent from "../forms/EditStudent.vue";
import sidebar from "../layout/sidebar.vue";
export default {
  components: {
    AddStudent,
    EditStudent,
    sidebar,
  },

  data() {
    return {
      itemsPerPage: 5,
      searchTerm: "",
      loading: false,
      headers: [
        { title: "Student Id", sortable: false, key: "uuid", align: "center" },
        { title: "Name", sortable: false, key: "name", align: "center" },
        { title: "Parent", sortable: false, key: "parent", align: "center" },
        { title: "Class", sortable: false, key: "class", align: "center" },
        { title: "Address", sortable: false, key: "address", align: "center" },
        { title: "Contact", sortable: false, key: "contact", align: "center" },
        { title: "Actions", sortable: false, key: "actions" },
      ],
    };
  },
  setup() {
    const notify = (message) => {
      toast(message, {
        autoClose: 1000,
      }); // ToastOptions
    };
    return { notify };
  },
  computed: {
    ...mapGetters("student", ["getStudents", "getTotalStudents","getSearchTerm"]),
    ...mapGetters(["getFormStatus", "getEditStatus"]),
    ...mapGetters("user", ["getLoggedInStatus"]),
  },
  methods: {
    ...mapActions("student", ["setStudents", "deleteStudent", "setSearchTerm"]),
    ...mapActions(["changeEditStatus"]),
    ...mapActions("user", ["LoggedIn", "disableLogin"]),

    search() {
      this.setSearchTerm(this.searchTerm);
      this.setStudents(this.getCurrentPage);
    },

    async handleDelete(uuid) {
      try {
        const response = await this.deleteStudent(uuid);
        this.notify(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },

  created() {
    this.setStudents(this.getCurrentPage);
    //checking if user is logged in
    if (localStorage.getItem("auth")) {
      this.LoggedIn();
    } else {
      this.disableLogin();
    }
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  width: 90%;
  height: 100vh;
  /* margin-bottom: 200px; */
  margin-left: 100px;
  font-weight: bold;
  display: block;
}

.search-bar {
  display: flex;
  justify-content: right;
  width: 99%;
}

h1{
  text-align: center;
}

input {
  margin-top: 20px;
  justify-self: right;
  border-radius: 10px;
  width: 40%;
  padding: 10px;
  font-weight: bold;
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
  background-color: orange;
}

.delete {
  background-color: red;
  color: white;
}
</style>

<!-- <div class="container">
    <div class="search-bar">
        <input type="text" class="search-input" id="searchInput" v-model="searchTerm"
            placeholder="Search for students..." @input="search()">
    </div>
    <v-table>
        <thead>
            <th>
                <th>Student Id</th>
                <th>Name</th>
                <th>Parent Name</th>
                <th>Class</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(student) in getStudents" :key="student.uuid">
                <td>{{ student.uuid }}</td>
                <td>{{ student.name }}</td>
                <td>{{ student.parent }}</td>
                <td>{{ student.class }}</td>
                <td>{{ student.address }}</td>
                <td>{{ student.contact }}</td>
                <td>
                    <button @click="changeEditStatus(student)" class="edit">Edit</button>
                    <button @click="handleDelete(student.uuid)" class="delete">Delete</button>
                </td>
            </tr>
        </tbody>
    </v-table>

    <div class="pagination">
        <button @click="setStudents(getCurrentPage - 1)" :disabled="getCurrentPage === 1">Previous</button>
        <span>Page {{ getCurrentPage }} of {{ getTotalPages }}</span>
        <button @click="setStudents(getCurrentPage + 1)" :disabled="getCurrentPage === getTotalPages">Next</button>
    </div>

</div> -->
