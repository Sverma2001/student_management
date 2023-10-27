<template>
    <div class="not-found">
        <h1>This Page is Not Found</h1>
        <router-link :to="getLoggedInStatus ? '/login' : '/home'" class="button">Return to Home</router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('user', ['getLoggedInStatus'])
    }
}
</script>

<style scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
}

h1{
    margin-bottom: 50px;
    font-size: 90px;
    color: red;
    font-weight: bolder;
}

.button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 40px;
    background-color: green;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
}
</style>