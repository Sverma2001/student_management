<template>
    <div>
        <div id="backdrop"></div>
        <div class="form-container">
            <button id="overlay" @click="changeFormStatus">X</button>
            <h2>Student Registration</h2>
            <form @submit.prevent="addStudents()">

                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required v-model="form.name">

                <label for="parent name">Parent Name:</label>
                <input type="text" id="parent name" name="parent name" required v-model="form.parent">

                <label for="class">Class:</label>
                <input type="text" id="class" name="class" required v-model="form.class">

                <label for="address">Address:</label>
                <input type="text" id="address" name="address" v-model="form.address">

                <label for="contact">Contact:</label>
                <input type="text" id="contact" pattern="[0-9]{10}" name="contact" v-model="form.contact">

                <input type="submit" value="Submit">
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            form: {
                name: '',
                parent: '',
                class: '',
                address: '',
                contact: ''
            }
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

    methods: {
        ...mapActions(['changeFormStatus']),
        ...mapActions('student',['addStudent']),

        addStudents() {
            this.changeFormStatus();
            //calling addStudent action to add student data received from the form
            this.addStudent({ ...this.form })
            .then((response) => {
                this.notify(response.data);
            })
        }
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
    width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgba(255, 192, 203, 0.911);
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
    font-weight: bold;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

h2{
    color: red;
    font-weight: bolder;
}

/* Style the submit button on hover */
input[type="submit"]:hover {
    background-color: #555;
}

#overlay{
    position: fixed;
    top:0;
    right:0;
    padding: 15px 20px;
    color: white;
    font-weight: bolder;
    background-color: red;
}

#backdrop{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0,0.7);
}
</style>