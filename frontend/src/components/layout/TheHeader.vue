<template>
    <header>
        <div class="navbar">
            <div class="navbar-title">College Student Management</div>

            <div style="display: flex; align-items: center;">
                <button @click="changeFormStatus" v-if="getLoggedInStatus">Add Student</button>
                <div class="dropdown" v-if="getLoggedInStatus">
                    <img id="profile" src="@/assets/user.png">
                    <div class="dropdown-content">
                        <p @click="logout()">Logout</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('user', ['getLoggedInStatus'])
    },
    methods: {
        ...mapActions(['changeFormStatus']),
        ...mapActions('user', ['LoggedIn', 'disableLogin']),

        //redirecting the user to login Page after logging out
        logout() {
            this.disableLogin();
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
header {
    background-color: black;
    color: #fff;
    padding: 10px;
    font-family: sans-serif;
    top: 0;
    width: 100%;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 10px */
}

.navbar-title {
    color: yellow;
    font-size: 35px;
    font-weight: bold;
    margin-left: 20px;
}

.navbar button {
    font-weight: bold;
    background-color: white;
    font-size: 20px;
    margin-right: 20px;
    padding: 10px;
    cursor: pointer;
    right: 0;
}

.navbar button:hover {
    background-color: rgb(206, 206, 206);
    color: black;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width:100px;
  right: 0;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding-top:12px ;
}

.dropdown:hover .dropdown-content {
  display: block;
}

p{
    color: black;
    cursor: pointer;
    font-size: large;
    font-weight: bold;
}

#profile {
    width: 50px;
    height: 50px;
    background-color: aquamarine;
    border-radius: 50%;
}
</style>
  