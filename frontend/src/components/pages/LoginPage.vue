<!-- App.vue -->
<template>
    <div class="login-container">
      <div class="login-box">
        <h1>Login</h1>
        <form @submit.prevent="login()" class="login-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" v-model="form.username" required>
          
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" v-model="form.password" required>
          
            <p v-if="!getLoggedInStatus" class="error">{{ getErrorMessage }}</p>
          <button type="submit" class="login-button">Login</button>
        
        </form>
      </div>
    </div>
  </template> 
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
  
    data() {
      return {
        form:{
          username: '',
          password: ''
        }
      };
    },
    computed:{
      ...mapGetters('user',['getLoggedInStatus','getErrorMessage'])
    },

    methods: {
      ...mapActions('user',['LoggedIn','checkAuth']),

      async login(){
        await this.checkAuth({...this.form});
        if(this.getLoggedInStatus) {
          this.$router.push('/home');
        }
        localStorage.setItem('auth', this.getLoggedInStatus) ;   //setting login status in local storage after navigating 
      },
    },

    //setting up login status in local storage
    created(){
      localStorage.setItem('auth', this.getLoggedInStatus);
    }
  };

  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
  
  .login-box {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }

  h1{
    font-weight: bolder;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-group {
    margin-bottom: 15px;
    width: 100%;
  }
  
  label {
    margin-top: 20px;
    font-weight: bold;
    font-size: 16px;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .login-button {
    background-color: #007BFF;
    color: #fff;
    margin-top: 20px;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .login-button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
  </style> 