<template>
    <div>
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
                <v-card-title>
                    Updation Form
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="submitForm" ref="form">
                        <v-text-field v-model="form.name" label="Name" disabled></v-text-field>
                        <v-text-field v-model="form.parent" label="Parent Name" disabled></v-text-field>
                        <v-text-field v-model="form.class" label="Class" disabled></v-text-field>
                        <v-text-field v-model="form.address" label="Address" :rules="addressRule"></v-text-field>
                        <v-text-field v-model="form.contact" label="Contact" :rules="contactRule" required></v-text-field>
                    </v-form>
                </v-card-text>
                
                <v-card-actions>
                    <v-btn @click="closeDialog">Close</v-btn>
                    <v-btn color="primary" @click="submitForm" :disabled="(form.address.length < 3 || form.contact.length !== 10)">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            dialog: true,
            form:{},
            contactRule: [(v) => !!v || 'Contact is required', (v) => /^[0-9]{10}$/.test(v) || 'Invalid contact number'],
            addressRule: [(v) => !!v || 'Address is required', (v) => (v && v.length >= 3) || 'Address must be at least 3 characters'],
        };
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
        ...mapGetters(['getStudentToBeUpdated']),
        isFormValid() {
            return this.$refs.form;
        },
    },
    methods: {
        ...mapActions(['disableEdit']),
        ...mapActions('student', ['updateStudent']),
        
        async editStudent() {
            try{
                const response = await this.updateStudent(this.form)
                this.notify(response.data);
            }
            catch(error){
                console.error(error)
            }
        },

        closeDialog() {
            this.disableEdit()
            this.dialog = false;
            this.resetForm();
        },
        async isFormStatusValid(){
            const isValid = await this.$refs.form.validate()
            return isValid.valid
        },
        async submitForm(){
            if (this.isFormStatusValid) {
                this.editStudent()
                this.closeDialog()
            }
        },
        resetForm() {
            this.$refs.form.resetValidation(); // Reset form validation
        },
    },
    created() {
        this.form = this.getStudentToBeUpdated;
    }
}
</script>