<template>
  <v-flex xs12 sm8 md6>
    <v-layout class="not-found">
      <v-card-title class="headline">This Page is Not Found</v-card-title>
      <v-card-text class="redirecting"
        >Redirecting to the main page in {{ countdown }} seconds...</v-card-text
      >
    </v-layout>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      countdown: 115,
    };
  },
  computed: {
    ...mapGetters("user", ["getLoggedInStatus"]),
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
        this.$router.push("/home");
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30vh;
}

.headline {
  font-size: 40px;
  color: red;
  font-weight: bolder;
}

.redirecting {
  font-size: 20px;
  font-weight: bold;
}
</style>
