<template>
  <div class="signup-container">
    <div class="signup-box">
      <h1>Register</h1>
      <form @submit.prevent="signup()" class="signup-form">
        <label for="fname">First Name:</label>
        <input type="text" id="fname" name="fname" v-model="form.fname" required>

        <label for="lname">Last Name:</label>
        <input type="text" id="lname" name="lname" v-model="form.lname" required>

        <label for="username">Username:</label>
        <input type="text" id="username" name="username" v-model="form.username" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" v-model="form.password" required>

        <p class="error">{{ errorMessage }}</p>

        <div class="navigation">
          <p>Already have an account?</p>
          <router-link to="/login" style="text-decoration: none;">Login</router-link>
        </div>

        <button type="submit" class="signup-button">Sign up</button>

      </form>
    </div>
  </div>
</template> 

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      form: {
        fname: '',
        lname: '',
        username: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions('user', ['addUser']),

    async signup() {
      try {
        const response = await this.addUser(this.form)
        if (response.data.includes('username already exists')) {
          this.errorMessage = response.data
        }
        else {
          this.$router.push('/login');
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}

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
  width: 80%;
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
  background-color: #007BFF;
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