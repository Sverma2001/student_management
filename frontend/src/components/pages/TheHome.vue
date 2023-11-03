<template>
  <v-container>

    <h1>Student Data</h1>
    
    <v-text-field
    v-model="searchTerm"
    label="Search"
    class="float-right"
    style="width: 300px"
    @input="loadStudents('1',studentsPerPage,'')"
  />
  <v-data-table-server
  v-model:items-per-page="studentsPerPage"
    :headers="headers"
    :items-length="getTotalStudents"
    :items="getStudents"
    :loading="loading"
    :search="searchTerm"
    item-value="name"
    class="elevation-2"
    @update:options="loadStudents"
    >
    <template v-slot:item.actions="{ item }">
      <td>
        <v-btn @click="changeEditStatus(item)">Edit</v-btn>
        <v-btn @click="handleDelete(item.uuid)">Delete</v-btn>
      </td>
    </template>
  </v-data-table-server>
</v-container>
  
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
      searchTerm: "",
      studentsPerPage: 5,
      currentPage: 1,
      totalStudents: 0,
      loading: false,
      headers: [
        { title: "Student Id", sortable: false, key: "uuid", align:"center"},
        { title: "Name", sortable: false, key: "name", align:"center"},
        { title: "Parent", sortable: false, key: "parent", align:"center"},
        { title: "Class", sortable: false, key: "class", align:"center"},
        { title: "Address", sortable: false, key: "address", align:"center"},
        { title: "Contact", sortable: false, key: "contact", align:"center"},
        { title: "Actions", sortable: false, key: "actions", align:"center"},
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
  watch: {
    studentsPerPage(value) {
      this.loadStudents(value);
    }
  },
  computed: {
    ...mapGetters("student", [
      "getStudents",
      "getTotalStudents",
    ]),
    ...mapGetters(["getFormStatus", "getEditStatus"]),
    ...mapGetters("user", ["getLoggedInStatus"]),
  },
  methods: {
    ...mapActions("student", [
      "setStudents",
      "deleteStudent",
    ]),
    ...mapActions(["changeEditStatus"]),
    ...mapActions("user", ["LoggedIn", "disableLogin"]),
    
    async handleDelete(uuid) {
      try {
        const response = await this.deleteStudent(uuid);
        this.notify(response.data);
      } catch (error) {
        console.error(error);
      }
    },

    async loadStudents({page}) {
      this.currentPage = page
      this.loading = true
      const response = await this.setStudents({page,studentsPerPage:this.studentsPerPage,searchTerm:this.searchTerm})
      if(response.status===200){
        this.totalStudents = response.data.totalStudents
        this.loading = false
        return
      }
    }
  },

  created() {
    this.setStudents('1',5,'');
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
.v-data-table {
  background-color: aliceblue;
  text-align: center;
  font-weight: bold;
  color: black;
  width: 80vw;
}
</style>