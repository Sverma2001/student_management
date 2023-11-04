<template>
  <v-container class="v-container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5">
        <v-card elevation="4">
          <v-card-title class="headline text-center">{{
            $t("Register")
          }}</v-card-title>
          <v-card-text>
            <v-form >
              <v-text-field label="Name" v-model="form.name" :rules="nameRules" required></v-text-field>
              <v-text-field label="Username" v-model="form.username" :rules="usernameRules" required></v-text-field>
              <v-text-field label="Password" v-model="form.password" :rules="passwordRules" required></v-text-field>

              <v-card-text style="color: red" v-if="errMessage === '' ? false : true">{{ errMessage }}</v-card-text>
              <v-text>{{ $t("Already have an account?") }}
                <router-link to="/login">{{ $t("Login") }}</router-link></v-text>
              <v-btn class="ma-2 float-right" color="primary" type="submit" @click="submitForm" :disabled="isFormValid">{{ $t("Sign up")
              }}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- <template>
  <div class="signup-container">
    <div class="signup-box">
      <h1>{{$t("Register")}}</h1>
      <form @submit.prevent="signup()" class="signup-form">
        <label for="name">{{$t("Name")}}</label>
        <input type="text" id="name" name="name" v-model="form.name" required>

        <label for="username">{{$t("Username")}}</label>
        <input type="text" id="username" name="username" v-model="form.username" required>

        <label for="password">{{$t("Password")}}</label>
        <input type="password" id="password" name="password" v-model="form.password" required>

        <p class="error">{{ getSignupErrorMessage }}</p>
        <div class="navigation">
          <p>{{$t("Already have an account?")}}</p>
          <router-link to="/login" style="text-decoration: none;">{{$t("Login")}}</router-link>
        </div>
        <button type="submit" class="signup-button">{{$t("Sign up")}}</button>
      </form>
    </div>
  </div>
</template>  -->

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        username: "",
        password: "",
      },
      errMessage: "",
      nameRules: [(v) => !!v || "Password is required"],
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) =>
          /^[a-zA-Z0-9]+$/.test(v) ||
          "Invalid username format",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
      ],
    };
  },
  validations() {
    return {
      name: { required },
      username: { required },
      password: { required },
    };
  },

  computed: {
    ...mapGetters("user", ["getSignupErrorMessage"]),
    isFormValid() {
      return this.$refs.form;
    },
  },
  methods: {
    ...mapActions("user", ["addUser", "clearSignupError"]),

    async submitForm(){
      const isValid = await this.$refs.form.validate();
      if(isValid.valid){
        this.signup()
        this.clearForm();
      }
    },

    async signup() {
        try {
          const response = await this.addUser(this.form);
          console.log(response);
          if (response.status !== 409 && response.status !== 422) {
            this.$router.push("/login");
            this.clearSignupError();
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    clearForm() {
      this.user.name = "";
      this.user.email = "";
      this.user.password = "";
      this.$refs.form.resetValidation();
    },
};
</script>

<style scoped>
.navigation {
  display: flex;
  font-weight: bold;
}

.navigation p {
  margin-right: 5px;
  color: black;
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.signup-box {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 40%;
  text-align: center;
}

h1 {
  font-weight: bolder;
}

.signup-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-top: 15px;
  font-weight: bold;
  font-size: 16px;
}

input[type="text"],
input[type="password"] {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.signup-button {
  background-color: #007bff;
  color: #fff;
  margin-top: 20px;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.signup-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
