<template>
    <div class="not-found">
        <h1>This Page is Not Found</h1>
        <p>Redirecting to the main page in {{ countdown }} seconds...</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            countdown: 5,
        };
    },
    computed: {
        ...mapGetters('user', ['getLoggedInStatus'])
    },
    mounted() {
        this.redirectTimer = setInterval(() => {
            if (this.countdown > 0) {
                this.countdown--;
            } else {
                clearInterval(this.redirectTimer);
                this.redirectToHome();
            }
        }, 1000);
    },
    methods: {
        redirectToHome() {
            if (!this.getLoggedInStatus) {
                this.$router.push('/home');
            }
            else {
                this.$router.push('/login');
            }
        },
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

h1 {
    margin-bottom: 20px;
    font-size: 40px;
    color: red;
    font-weight: bolder;
}

p {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    transition: background-color 0.2s;
}
</style>
