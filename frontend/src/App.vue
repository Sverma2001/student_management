<template>
  <v-app>
    <the-header></the-header>
    <v-main class="v-main">
      <router-view></router-view>
    </v-main>
    <the-footer></the-footer>
  </v-app>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
} */
.v-main{
  margin-top:-80vh;
}

::-webkit-scrollbar{
  display: none;
}
</style>
