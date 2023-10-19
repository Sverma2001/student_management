<template>
    <div>
        <div id="backdrop"></div>
        <div class="form-container">
            <button id="overlay" @click="disableEdit()">X</button>
            <h2>Updation Form</h2>
            <form @submit.prevent="editStudent(form)">

                <label for="name">Name:</label>
                <input type="text" id="name" name="name" disabled v-model="form.name">

                <label for="parent name">Parent Name:</label>
                <input type="text" id="parent name" name="parent name" disabled v-model="form.parent">

                <label for="class">Class:</label>
                <input type="text" id="class" name="class" disabled v-model="form.class">

                <label for="address">Address:</label>
                <input type="text" id="address" name="address" v-model="form.address">

                <label for="contact">Name:</label>
                <input type="text" id="contact" pattern="[0-9]{10}" name="contact" v-model="form.contact">

                <input type="submit" value="Save Changes">
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            form: {}
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
        ...mapGetters(['getStudentToBeUpdated'])
    },
    methods: {
        ...mapActions(['disableEdit']),
        ...mapActions('student', ['updateStudent']),

        editStudent(data) {
            console.log(data)
            this.updateStudent(data)
                .then((response) => {
                    this.notify(response.data);
                })
        }
    },
    created() {
        this.form = this.getStudentToBeUpdated;
    }
}
</script>

<style scoped>
body,
form {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

/* Style the form container */
.form-container {
    position: absolute;
    top: 13%;
    left: 50%;
    transform: translate(-50%);
    width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: pink;
    z-index: 99;
}

/* Style form labels */
label {
    font-weight: bold;
}

/* Style form input fields */
input[type="text"],
input[type="tel"],
select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Style the submit button */
input[type="submit"] {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

/* Style the submit button on hover */
input[type="submit"]:hover {
    background-color: #555;
}

h2 {
    color: red;
    font-weight: bolder;
}

#overlay {
    position: fixed;
    top: 0;
    right: 0;
    padding: 15px 20px;
    color: white;
    font-weight: bolder;
    background-color: red;
}

#backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
}
</style>