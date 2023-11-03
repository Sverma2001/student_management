<template>
    <div>
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
                <v-card-title> Registration Form </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="submitForm" ref="form">
                        <v-text-field v-model="form.name" label="Name" :rules="nameRule" required></v-text-field>
                        <v-text-field v-model="form.parent" label="Parent Name" :rules="parentRule" required></v-text-field>
                        <v-text-field v-model="form.class" label="Class" :rules="classRule" required></v-text-field>
                        <v-text-field v-model="form.address" label="Address" :rules="addressRule" required></v-text-field>
                        <v-text-field v-model="form.contact" label="Contact" :rules="contactRule" required></v-text-field>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-btn @click="closeDialog">Close</v-btn>
                    <v-btn color="primary" @click="submitForm" :disabled="isFormValid">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    data() {
        return {
            dialog: true,
            form: {
                name: "",
                parent: "",
                class: "",
                address: "",
                contact: "",
            },
            nameRule: [
                (v) => !!v || "Name is required",
                (v) => (v && v.length >= 3) || "Name must be at least 3 characters",
            ],
            parentRule: [
                (v) => !!v || "Parent Name is required",
                (v) =>
                    (v && v.length >= 3) || "Parent Name must be at least 3 characters",
            ],
            classRule: [
                (v) => !!v || "Class is required",
                (v) => (v && v.length >= 3) || "Class must be at least 3 characters",
            ],
            addressRule: [
                (v) => !!v || "Address is required",
                (v) => (v && v.length >= 3) || "Address must be at least 3 characters",
            ],
            contactRule: [
                (v) => !!v || "Contact is required",
                (v) => /^[0-9]{10}$/.test(v) || "Invalid contact number",
            ],
        };
    },
    computed: {
        isFormValid() {
            return this.$refs.form;
        },
    },

    setup() {
        const notify = (message) => {
            toast(message, {
                autoClose: 1000,
            });
        };
        return { notify };
    },

    methods: {
        ...mapActions(["changeFormStatus"]),
        ...mapActions("student", ["addStudent"]),

        async addStudentData() {
            this.changeFormStatus();
            try {
                //calling addStudent action to add student data received from the form
                const response = await this.addStudent({ ...this.form });
                this.notify(response.data);
            } catch (error) {
                console.error(error);
            }
        },

        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.changeFormStatus();
            this.dialog = false;
            this.resetForm();
        },
        resetForm() {
            this.form.name = "";
            this.form.parent = "";
            this.form.class = "";
            this.form.address = "";
            this.form.contact = "";
            this.$refs.form.resetValidation(); // Reset form validation
        },
        async submitForm() {
            const isValid = await this.$refs.form.validate();
            console.log(isValid);
            if (isValid.valid) {
                this.addStudentData();
                this.closeDialog();
            }
        },
    },
};
</script>
